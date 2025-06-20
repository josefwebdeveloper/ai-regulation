import type { NextApiRequest, NextApiResponse } from 'next'
import { EmailCollectionService } from '../../lib/email-collection'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Получаем статистику подписок
    const stats = EmailCollectionService.getSubscriptionStats()
    const recentSubscriptions = EmailCollectionService.getRecentSubscriptions(5)
    const allEmails = EmailCollectionService.exportEmails()

    return res.status(200).json({
      stats,
      recentSubscriptions: recentSubscriptions.map(sub => ({
        email: sub.email,
        timestamp: sub.timestamp,
        source: sub.source
      })),
      emailList: allEmails,
      totalEmails: allEmails.length
    })
  } catch (error) {
    console.error('Error fetching email stats:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
} 