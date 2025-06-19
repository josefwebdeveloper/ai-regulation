import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  serviceType?: string
}

// Email configuration based on provider
function createEmailTransporter() {
  // Support multiple email providers
  const emailProvider = process.env.EMAIL_PROVIDER || 'gmail'
  
  switch (emailProvider) {
    case 'gmail':
      return nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASSWORD, // Use App Password for Gmail
        },
      })
    
    case 'smtp':
      return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      })
    
    case 'sendgrid':
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: 'apikey',
          pass: process.env.SENDGRID_API_KEY,
        },
      })
    
    case 'mailgun':
      return nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: process.env.MAILGUN_USERNAME,
          pass: process.env.MAILGUN_PASSWORD,
        },
      })
    
    default:
      throw new Error(`Unsupported email provider: ${emailProvider}`)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, subject, message, serviceType }: ContactFormData = req.body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Check if email is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_TO) {
      console.log('📧 Email not configured. Contact form submission:', { name, email, subject, message })
      return res.status(200).json({ 
        message: 'Message received successfully. We will get back to you soon!',
        note: 'Email service is being configured. Your message has been logged.'
      })
    }

    // Create email transporter
    const transporter = createEmailTransporter()

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `🔔 Contact Form: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">AI Regulation Association</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #1f2937;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Subject:</td>
                <td style="padding: 8px 0; color: #1f2937;">${subject}</td>
              </tr>
              ${serviceType ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Service:</td>
                <td style="padding: 8px 0; color: #1f2937;">${serviceType}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; vertical-align: top;">Message:</td>
                <td style="padding: 8px 0; color: #1f2937; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #ffffff; padding: 15px 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="margin: 0; font-size: 12px; color: #6b7280;">
              📅 Received: ${new Date().toLocaleString()}<br>
              🌐 Source: AI Regulation Association Website
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}
${serviceType ? `Service: ${serviceType}\n` : ''}
Message: ${message}

Received: ${new Date().toLocaleString()}
Source: AI Regulation Association Website
      `.trim()
    }

    // Auto-reply email to user
    const userMailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: `Thank you for contacting AI Regulation Association`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0;">Thank You for Your Interest</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">AI Regulation Association</p>
          </div>
          
          <div style="background: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-top: none;">
            <p>Dear ${name},</p>
            
            <p>Thank you for reaching out to the AI Regulation Association. We have received your message regarding "<strong>${subject}</strong>" and appreciate your interest in AI governance and regulation.</p>
            
            <div style="background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-style: italic; color: #1e40af;">
                "Building a safer, more transparent future for artificial intelligence through thoughtful governance and collaboration."
              </p>
            </div>
            
            <p>Our team will review your inquiry and respond within 1-2 business days. In the meantime, you might find these resources helpful:</p>
            
            <ul style="color: #374151;">
              <li><a href="https://ai-regulation.vercel.app/research" style="color: #3b82f6; text-decoration: none;">Latest Research Reports</a></li>
              <li><a href="https://ai-regulation.vercel.app/news" style="color: #3b82f6; text-decoration: none;">News & Insights</a></li>
              <li><a href="https://ai-regulation.vercel.app/events" style="color: #3b82f6; text-decoration: none;">Upcoming Events</a></li>
              <li><a href="https://ai-regulation.vercel.app/services" style="color: #3b82f6; text-decoration: none;">Our Services</a></li>
            </ul>
            
            <p>Best regards,<br>
            <strong>The AI Regulation Association Team</strong></p>
          </div>
          
          <div style="background: #f8fafc; padding: 15px 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #6b7280;">
              🌐 <a href="https://ai-regulation.vercel.app" style="color: #3b82f6; text-decoration: none;">AI Regulation Association</a> |
              📧 <a href="mailto:contact@ai-regulation-association.org" style="color: #3b82f6; text-decoration: none;">contact@ai-regulation-association.org</a>
            </p>
          </div>
        </div>
      `,
      text: `
Dear ${name},

Thank you for reaching out to the AI Regulation Association. We have received your message regarding "${subject}" and appreciate your interest in AI governance and regulation.

Our team will review your inquiry and respond within 1-2 business days.

In the meantime, you might find these resources helpful:
- Latest Research Reports: https://ai-regulation.vercel.app/research
- News & Insights: https://ai-regulation.vercel.app/news
- Upcoming Events: https://ai-regulation.vercel.app/events
- Our Services: https://ai-regulation.vercel.app/services

Best regards,
The AI Regulation Association Team

---
AI Regulation Association
Website: https://ai-regulation.vercel.app
Email: contact@ai-regulation-association.org
      `.trim()
    }

    // Send emails
    try {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions)
      ])

      console.log('✅ Emails sent successfully:', { name, email, subject })
      
      return res.status(200).json({ 
        message: 'Message sent successfully! We will get back to you within 1-2 business days.' 
      })
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError)
      
      // Log the submission even if email fails
      console.log('📧 Contact form submission (email failed):', { name, email, subject, message })
      
      return res.status(200).json({ 
        message: 'Message received successfully. We will get back to you soon!',
        note: 'There was an issue sending the confirmation email, but your message was received.'
      })
    }

  } catch (error) {
    console.error('❌ Contact form error:', error)
    return res.status(500).json({ error: 'Internal server error. Please try again later.' })
  }
} 