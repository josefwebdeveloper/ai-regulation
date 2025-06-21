import type { NextApiRequest, NextApiResponse } from 'next'
import { EmailCollectionService } from '../../lib/email-collection'
import { EmailDatabase, initializeDatabase } from '../../lib/database'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Инициализируем базу данных
  await initializeDatabase()

  try {
    // Пробуем получить статистику из базы данных
    const dbStats = await EmailDatabase.getStats()
    const dbRecentSubscriptions = await EmailDatabase.getRecentSubscriptions(5)
    const dbEmails = await EmailDatabase.exportEmails()

    // Если база данных работает, используем её данные
    if (dbStats.total > 0 || dbEmails.length > 0) {
      return res.status(200).json({
        stats: dbStats,
        recentSubscriptions: dbRecentSubscriptions,
        emailList: dbEmails,
        totalEmails: dbEmails.length,
        source: 'database'
      })
    }

    // Fallback на локальное хранение
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
      totalEmails: allEmails.length,
      source: 'local'
    })
  } catch (error) {
    console.error('Error fetching email stats:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
} 