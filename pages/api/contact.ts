import type { NextApiRequest, NextApiResponse } from 'next'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message }: ContactFormData = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // In a real application, you would send the email here
    // For now, we'll just log the data and return success
    console.log('Contact form submission:', { name, email, subject, message })

    // Simulate email sending (replace with actual email service)
    /*
    const transporter = nodemailer.createTransporter({
      // Configure your email service
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    })
    */

    return res.status(200).json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Contact form error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
} 