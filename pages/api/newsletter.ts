import type { NextApiRequest, NextApiResponse } from 'next'
import { EmailCollectionService } from '../../lib/email-collection'

interface NewsletterData {
  email: string
  source?: string // откуда пришла подписка
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

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

    // Добавляем подписку через наш сервис
    const isAdded = EmailCollectionService.addSubscription(subscriptionData)
    
    if (!isAdded) {
      return res.status(409).json({ 
        error: 'Email already subscribed',
        message: 'This email is already subscribed to our newsletter'
      })
    }

    // Логируем подписку
    console.log('=== NEW NEWSLETTER SUBSCRIPTION ===')
    console.log('Email:', subscriptionData.email)
    console.log('Date:', subscriptionData.timestamp)
    console.log('Source:', subscriptionData.source)
    console.log('IP:', subscriptionData.ip)
    console.log('User Agent:', subscriptionData.userAgent)
    console.log('=====================================')

    // В реальном приложении здесь нужно:
    // 1. Интегрировать с email сервисом (Mailchimp, ConvertKit, etc.)
    // 2. Отправить приветственное письмо
    
    // Пример интеграции:
    // await EmailServiceIntegration.addToMailchimp(subscriptionData.email, 'LIST_ID', 'API_KEY')
    // await EmailServiceIntegration.sendWelcomeEmail(subscriptionData.email)

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