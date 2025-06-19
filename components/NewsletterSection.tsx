import React, { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Successfully subscribed to our newsletter!')
        setEmail('')
      } else {
        throw new Error('Failed to subscribe')
      }
         } catch {
       setStatus('error')
       setMessage('Failed to subscribe. Please try again.')
     }
  }

  return (
    <section className="section bg-primary-600">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-white">
            Stay Updated on AI Governance
          </h2>
          <p className="mt-6 text-lg leading-8 text-primary-100">
            Get the latest insights on AI regulation, policy updates, and best practices delivered to your inbox.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-md gap-x-4">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6 placeholder:text-white/75"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {message && (
          <div className={`mx-auto mt-4 max-w-md text-center text-sm ${
            status === 'success' ? 'text-green-200' : 'text-red-200'
          }`}>
            {message}
          </div>
        )}
      </div>
    </section>
  )
} 