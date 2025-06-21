import type { NextApiRequest, NextApiResponse } from 'next'
import { EmailCollectionService } from '../../lib/email-collection'
import { EmailServices } from '../../lib/email-services'
import { EmailDatabase, initializeDatabase } from '../../lib/database'

interface NewsletterData {
  email: string
  source?: string // откуда пришла подписка
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Инициализируем базу данных при первом запуске
  await initializeDatabase()

  try {
    const { email, source = 'newsletter-form' }: NewsletterData = req.body

    // Validate email
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Собираем информацию о подписке
    const subscriptionData = {
      email: email.toLowerCase().trim(),
      timestamp: new Date().toISOString(),
      source,
      ip: req.headers['x-forwarded-for'] as string || req.connection.remoteAddress || 'unknown',
      userAgent: req.headers['user-agent'] || 'unknown'
    }

    // Добавляем подписку в базу данных
    const dbResult = await EmailDatabase.addSubscription(subscriptionData)
    
    if (!dbResult.success) {
      if (dbResult.reason === 'already_subscribed') {
        return res.status(409).json({ 
          error: 'Email already subscribed',
          message: 'This email is already subscribed to our newsletter'
        })
      }
      
      // Если ошибка базы данных, используем локальное хранение как fallback
      console.log('⚠️ Ошибка базы данных, используем локальное хранение')
      const isAdded = EmailCollectionService.addSubscription(subscriptionData)
      
      if (!isAdded) {
        return res.status(409).json({ 
          error: 'Email already subscribed',
          message: 'This email is already subscribed to our newsletter'
        })
      }
    }

    // Логируем подписку
    console.log('=== NEW NEWSLETTER SUBSCRIPTION ===')
    console.log('Email:', subscriptionData.email)
    console.log('Date:', subscriptionData.timestamp)
    console.log('Source:', subscriptionData.source)
    console.log('IP:', subscriptionData.ip)
    console.log('User Agent:', subscriptionData.userAgent)
    console.log('=====================================')

    // Интеграция с email сервисами (если настроены)
    try {
      const emailResult = await EmailServices.addToAnyService(subscriptionData.email, {
        firstName: '', // можно добавить поле имени в форму
        source: subscriptionData.source
      })
      
      if (emailResult.success) {
        console.log(`✅ Email добавлен в ${emailResult.service}`)
        
        // Обновляем ConvertKit ID в базе данных, если это ConvertKit
        if (emailResult.service === 'convertkit' && emailResult.data) {
          // ConvertKit возвращает ID подписчика в поле data
          const subscriberId = typeof emailResult.data === 'object' && emailResult.data && 'id' in emailResult.data 
            ? (emailResult.data as any).id 
            : emailResult.data
          
          if (subscriberId) {
            await EmailDatabase.updateConvertKitId(subscriptionData.email, subscriberId.toString())
          }
        }
      } else {
        console.log('⚠️ Email сервисы не настроены, только сохранение в базе данных')
      }
    } catch (error) {
      console.log('⚠️ Ошибка интеграции с email сервисами:', error)
    }

    return res.status(200).json({ 
      message: 'Successfully subscribed to newsletter',
      email: subscriptionData.email,
      timestamp: subscriptionData.timestamp
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
} 