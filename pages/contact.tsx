import React, { useState } from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('loading')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setSubmitMessage('Thank you for your message! We will get back to you soon.')
        reset()
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to send message')
      }
    } catch (error) {
      setSubmitStatus('error')
      setSubmitMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again.')
    }
  }

  return (
    <>
      <Head>
        <title>Contact Us - AI Regulation Association</title>
        <meta
          name="description"
          content="Get in touch with the AI Regulation Association. Contact us for inquiries about AI governance, policy consultation, or partnership opportunities."
        />
        <meta property="og:title" content="Contact Us - AI Regulation Association" />
        <meta
          property="og:description"
          content="Get in touch with the AI Regulation Association for AI governance inquiries and partnership opportunities."
        />
        <link rel="canonical" href="https://ai-regulation-association.org/contact" />
      </Head>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-secondary-900">Contact Us</h1>
            <p className="mt-6 text-xl leading-8 text-secondary-600">
              Have questions about AI regulation or interested in partnering with us? 
              We&apos;d love to hear from you.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  className={`form-input ${errors.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  className={`form-input ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="form-label">
                  Subject *
                </label>
                <select
                  id="subject"
                  className={`form-input ${errors.subject ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  {...register('subject', { required: 'Please select a subject' })}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="consultation">Policy Consultation</option>
                  <option value="research">Research Collaboration</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="media">Media Inquiry</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className={`form-textarea ${errors.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
                  placeholder="Tell us about your inquiry or how we can help..."
                  {...register('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters long',
                    },
                  })}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="btn-primary w-full"
                >
                  {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </div>

              {submitMessage && (
                <div className={`p-4 rounded-lg ${
                  submitStatus === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-secondary-900 mb-8">Other Ways to Reach Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-secondary-900 mb-2">Email</h3>
                <p className="text-secondary-600">info@ai-regulation-association.org</p>
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900 mb-2">Phone</h3>
                <p className="text-secondary-600">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold text-secondary-900 mb-2">Office</h3>
                <p className="text-secondary-600">
                  123 Innovation Drive<br />
                  Tech Valley, CA 94000
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
} 