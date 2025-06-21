// Система управления базой данных для email подписок
import { sql } from '@vercel/postgres'

export interface EmailSubscription {
  id: number
  email: string
  timestamp: string
  source: string
  ip: string
  userAgent: string
  status: 'active' | 'unsubscribed'
  firstName?: string
  lastName?: string
  tags?: string[]
  convertKitId?: string
  createdAt: Date
  updatedAt: Date
}

export class EmailDatabase {
  
  // Создание таблицы (выполняется автоматически при первом запуске)
  static async createTable() {
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS email_subscriptions (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          timestamp TIMESTAMP NOT NULL,
          source VARCHAR(100) NOT NULL,
          ip VARCHAR(45),
          user_agent TEXT,
          status VARCHAR(20) DEFAULT 'active',
          first_name VARCHAR(100),
          last_name VARCHAR(100),
          tags TEXT[], -- PostgreSQL array
          convertkit_id VARCHAR(50),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `
      
      // Создаем индексы для быстрого поиска
      await sql`CREATE INDEX IF NOT EXISTS idx_email ON email_subscriptions(email)`
      await sql`CREATE INDEX IF NOT EXISTS idx_status ON email_subscriptions(status)`
      await sql`CREATE INDEX IF NOT EXISTS idx_source ON email_subscriptions(source)`
      await sql`CREATE INDEX IF NOT EXISTS idx_created_at ON email_subscriptions(created_at)`
      
      console.log('✅ База данных email_subscriptions готова')
      return true
    } catch (error) {
      console.error('❌ Ошибка создания таблицы:', error)
      return false
    }
  }

  // Добавить новую подписку
  static async addSubscription(subscription: {
    email: string
    timestamp: string
    source: string
    ip: string
    userAgent: string
    firstName?: string
    lastName?: string
    tags?: string[]
    convertKitId?: string
  }) {
    try {
      // Проверяем, не существует ли уже такой email
      const existing = await sql`
        SELECT id, status FROM email_subscriptions 
        WHERE email = ${subscription.email}
      `

      if (existing.rows.length > 0) {
        // Если email существует и активен - возвращаем false
        if (existing.rows[0].status === 'active') {
          console.log(`Email ${subscription.email} уже подписан`)
          return { success: false, reason: 'already_subscribed', id: existing.rows[0].id }
        }
        
        // Если был отписан - реактивируем
        const updated = await sql`
          UPDATE email_subscriptions 
          SET status = 'active', 
              timestamp = ${subscription.timestamp},
              source = ${subscription.source},
              ip = ${subscription.ip},
              user_agent = ${subscription.userAgent},
              first_name = ${subscription.firstName || null},
              last_name = ${subscription.lastName || null},
              tags = ${JSON.stringify(subscription.tags || [])},
              convertkit_id = ${subscription.convertKitId || null},
              updated_at = CURRENT_TIMESTAMP
          WHERE email = ${subscription.email}
          RETURNING id
        `
        
        console.log(`✅ Email ${subscription.email} реактивирован`)
        return { success: true, reason: 'reactivated', id: updated.rows[0].id }
      }

      // Добавляем новую подписку
      const result = await sql`
        INSERT INTO email_subscriptions (
          email, timestamp, source, ip, user_agent, 
          first_name, last_name, tags, convertkit_id
        ) VALUES (
          ${subscription.email},
          ${subscription.timestamp},
          ${subscription.source},
          ${subscription.ip},
          ${subscription.userAgent},
          ${subscription.firstName || null},
          ${subscription.lastName || null},
          ${JSON.stringify(subscription.tags || [])},
          ${subscription.convertKitId || null}
        ) RETURNING id
      `

      console.log(`✅ Новая подписка добавлена: ${subscription.email}`)
      return { success: true, reason: 'new_subscription', id: result.rows[0].id }

    } catch (error) {
      console.error('❌ Ошибка добавления подписки:', error)
      return { success: false, reason: 'database_error', error }
    }
  }

  // Получить все активные подписки
  static async getActiveSubscriptions(limit: number = 100, offset: number = 0) {
    try {
      const result = await sql`
        SELECT * FROM email_subscriptions 
        WHERE status = 'active' 
        ORDER BY created_at DESC 
        LIMIT ${limit} OFFSET ${offset}
      `
      return result.rows
    } catch (error) {
      console.error('❌ Ошибка получения подписок:', error)
      return []
    }
  }

  // Получить статистику
  static async getStats() {
    try {
      const totalResult = await sql`SELECT COUNT(*) as count FROM email_subscriptions`
      const activeResult = await sql`SELECT COUNT(*) as count FROM email_subscriptions WHERE status = 'active'`
      const unsubscribedResult = await sql`SELECT COUNT(*) as count FROM email_subscriptions WHERE status = 'unsubscribed'`
      
      // Статистика по источникам
      const sourceStats = await sql`
        SELECT source, COUNT(*) as count 
        FROM email_subscriptions 
        WHERE status = 'active' 
        GROUP BY source 
        ORDER BY count DESC
      `

      // Статистика по дням (последние 30 дней)
      const dailyStats = await sql`
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as count
        FROM email_subscriptions 
        WHERE created_at >= NOW() - INTERVAL '30 days'
        GROUP BY DATE(created_at)
        ORDER BY date DESC
      `

      return {
        total: parseInt(totalResult.rows[0].count),
        active: parseInt(activeResult.rows[0].count),
        unsubscribed: parseInt(unsubscribedResult.rows[0].count),
        bySource: sourceStats.rows.reduce((acc: Record<string, number>, row) => {
          acc[row.source as string] = parseInt(row.count as string)
          return acc
        }, {} as Record<string, number>),
        dailyStats: dailyStats.rows
      }
    } catch (error) {
      console.error('❌ Ошибка получения статистики:', error)
      return {
        total: 0,
        active: 0,
        unsubscribed: 0,
        bySource: {},
        dailyStats: []
      }
    }
  }

  // Получить последние подписки
  static async getRecentSubscriptions(limit: number = 10) {
    try {
      const result = await sql`
        SELECT email, timestamp, source, created_at
        FROM email_subscriptions 
        WHERE status = 'active' 
        ORDER BY created_at DESC 
        LIMIT ${limit}
      `
      return result.rows
    } catch (error) {
      console.error('❌ Ошибка получения последних подписок:', error)
      return []
    }
  }

  // Экспорт всех email адресов
  static async exportEmails() {
    try {
      const result = await sql`
        SELECT email FROM email_subscriptions 
        WHERE status = 'active' 
        ORDER BY created_at DESC
      `
      return result.rows.map(row => row.email)
    } catch (error) {
      console.error('❌ Ошибка экспорта email:', error)
      return []
    }
  }

  // Отписать email
  static async unsubscribe(email: string) {
    try {
      const result = await sql`
        UPDATE email_subscriptions 
        SET status = 'unsubscribed', updated_at = CURRENT_TIMESTAMP
        WHERE email = ${email}
        RETURNING id
      `
      
      if (result.rows.length > 0) {
        console.log(`Email ${email} отписан`)
        return true
      }
      return false
    } catch (error) {
      console.error('❌ Ошибка отписки:', error)
      return false
    }
  }

  // Поиск подписчиков
  static async searchSubscribers(query: string, limit: number = 50) {
    try {
      const result = await sql`
        SELECT * FROM email_subscriptions 
        WHERE (
          email ILIKE ${'%' + query + '%'} OR
          first_name ILIKE ${'%' + query + '%'} OR
          last_name ILIKE ${'%' + query + '%'} OR
          source ILIKE ${'%' + query + '%'}
        )
        AND status = 'active'
        ORDER BY created_at DESC 
        LIMIT ${limit}
      `
      return result.rows
    } catch (error) {
      console.error('❌ Ошибка поиска:', error)
      return []
    }
  }

  // Обновить ConvertKit ID для подписчика
  static async updateConvertKitId(email: string, convertKitId: string) {
    try {
      await sql`
        UPDATE email_subscriptions 
        SET convertkit_id = ${convertKitId}, updated_at = CURRENT_TIMESTAMP
        WHERE email = ${email}
      `
      return true
    } catch (error) {
      console.error('❌ Ошибка обновления ConvertKit ID:', error)
      return false
    }
  }

  // Получить подписчиков без ConvertKit ID (для синхронизации)
  static async getSubscribersWithoutConvertKitId(limit: number = 100) {
    try {
      const result = await sql`
        SELECT * FROM email_subscriptions 
        WHERE status = 'active' AND (convertkit_id IS NULL OR convertkit_id = '')
        ORDER BY created_at ASC 
        LIMIT ${limit}
      `
      return result.rows
    } catch (error) {
      console.error('❌ Ошибка получения подписчиков без ConvertKit ID:', error)
      return []
    }
  }
}

// Функция инициализации базы данных
export async function initializeDatabase() {
  return await EmailDatabase.createTable()
} 