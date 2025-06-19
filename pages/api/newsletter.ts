import type { NextApiRequest, NextApiResponse } from 'next'

interface NewsletterData {
  email: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email }: NewsletterData = req.body

    // Validate email
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // In a real application, you would add the email to your newsletter service
    // (Mailchimp, ConvertKit, etc.)
    console.log('Newsletter subscription:', email)

    // Simulate successful subscription
    return res.status(200).json({ message: 'Successfully subscribed to newsletter' })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
} 