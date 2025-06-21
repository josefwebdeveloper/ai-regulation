import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from '@vercel/postgres'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Проверяем наличие переменных окружения
    const hasPostgresUrl = !!process.env.POSTGRES_URL
    const hasPostgresPrismaUrl = !!process.env.POSTGRES_PRISMA_URL
    
    if (!hasPostgresUrl && !hasPostgresPrismaUrl) {
      return res.status(500).json({
        status: 'error',
        message: 'Database not configured',
        details: 'Please create a Postgres database in Vercel Storage',
        instructions: [
          '1. Go to Vercel Dashboard',
          '2. Navigate to Storage → Create Database',
          '3. Select Neon (Serverless Postgres)',
          '4. Name it: ai-regulation-emails',
          '5. Click Create'
        ],
        environment: process.env.NODE_ENV
      })
    }

    // Тестируем подключение к базе данных
    const result = await sql`SELECT NOW() as current_time, version() as postgres_version`
    
    // Проверяем, существует ли таблица email_subscriptions
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'email_subscriptions'
      ) as table_exists
    `

    return res.status(200).json({
      status: 'success',
      message: 'Database connection successful',
      data: {
        currentTime: result.rows[0].current_time,
        postgresVersion: result.rows[0].postgres_version,
        emailTableExists: tableCheck.rows[0].table_exists,
        environment: process.env.NODE_ENV,
        hasPostgresUrl,
        hasPostgresPrismaUrl
      }
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return res.status(500).json({ 
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.NODE_ENV
    })
  }
} 