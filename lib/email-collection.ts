// Утилиты для сбора и управления email адресами
// В продакшене используйте реальную базу данных

export interface EmailSubscription {
  email: string
  timestamp: string
  source: string
  ip: string
  userAgent: string
  status: 'active' | 'unsubscribed'
}

// Простое хранилище в памяти (в продакшене используйте базу данных)
const emailSubscriptions: EmailSubscription[] = []

export class EmailCollectionService {
  // Добавить новую подписку
  static addSubscription(subscription: Omit<EmailSubscription, 'status'>): boolean {
    try {
      // Проверяем, не подписан ли уже этот email
      const existingSubscription = emailSubscriptions.find(
        sub => sub.email === subscription.email && sub.status === 'active'
      )

      if (existingSubscription) {
        console.log(`Email ${subscription.email} уже подписан`)
        return false
      }

      // Добавляем новую подписку
      const newSubscription: EmailSubscription = {
        ...subscription,
        status: 'active'
      }

      emailSubscriptions.push(newSubscription)
      
      console.log(`✅ Новая подписка добавлена: ${subscription.email}`)
      return true
    } catch (error) {
      console.error('Ошибка при добавлении подписки:', error)
      return false
    }
  }

  // Получить все активные подписки
  static getActiveSubscriptions(): EmailSubscription[] {
    return emailSubscriptions.filter(sub => sub.status === 'active')
  }

  // Получить статистику подписок
  static getSubscriptionStats() {
    const total = emailSubscriptions.length
    const active = emailSubscriptions.filter(sub => sub.status === 'active').length
    const unsubscribed = emailSubscriptions.filter(sub => sub.status === 'unsubscribed').length
    
    // Группировка по источникам
    const bySource = emailSubscriptions.reduce((acc, sub) => {
      acc[sub.source] = (acc[sub.source] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      total,
      active,
      unsubscribed,
      bySource
    }
  }

  // Отписать email
  static unsubscribe(email: string): boolean {
    const subscription = emailSubscriptions.find(sub => sub.email === email)
    if (subscription) {
      subscription.status = 'unsubscribed'
      console.log(`Email ${email} отписан`)
      return true
    }
    return false
  }

  // Экспорт всех email адресов
  static exportEmails(): string[] {
    return this.getActiveSubscriptions().map(sub => sub.email)
  }

  // Получить последние подписки
  static getRecentSubscriptions(limit: number = 10): EmailSubscription[] {
    return emailSubscriptions
      .filter(sub => sub.status === 'active')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  }
}

// Интеграция с популярными email сервисами
export class EmailServiceIntegration {
  // Пример интеграции с Mailchimp
  static async addToMailchimp(email: string, listId: string) {
    // Это пример - замените на реальные данные API
    console.log(`Добавление ${email} в Mailchimp список ${listId}`)
    
    // Реальная интеграция с API ключом:
    // const apiKey = process.env.MAILCHIMP_API_KEY
    // const response = await fetch(`https://us1.api.mailchimp.com/3.0/lists/${listId}/members`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `apikey ${apiKey}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     email_address: email,
    //     status: 'subscribed'
    //   })
    // })
    
    return true
  }

  // Пример интеграции с ConvertKit
  static async addToConvertKit(email: string, formId: string) {
    console.log(`Добавление ${email} в ConvertKit форму ${formId}`)
    
    // Реальная интеграция с API ключом:
    // const apiKey = process.env.CONVERTKIT_API_KEY
    // const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     api_key: apiKey,
    //     email: email
    //   })
    // })
    
    return true
  }

  // Отправка приветственного письма
  static async sendWelcomeEmail(email: string) {
    console.log(`Отправка приветственного письма на ${email}`)
    
    // Здесь можно интегрировать с SendGrid, Nodemailer, или другим сервисом
    // const welcomeEmail = {
    //   to: email,
    //   subject: 'Добро пожаловать в AI Regulation Association!',
    //   html: `
    //     <h1>Спасибо за подписку!</h1>
    //     <p>Теперь вы будете получать последние новости об AI регулировании.</p>
    //   `
    // }
    // await sendEmail(welcomeEmail)
    
    return true
  }
} 