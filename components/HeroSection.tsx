import React from 'react'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container section">
        <div className="text-center">
          <h1 className="text-gradient animate-fade-in">
            Leading AI Governance
            <br />
            for a Safer Future
          </h1>
          <p className="mt-6 text-xl text-secondary-600 max-w-3xl mx-auto leading-8 animate-slide-up">
            The AI Regulation Association develops comprehensive policies, provides expert guidance, 
            and promotes ethical AI practices to ensure artificial intelligence benefits humanity while 
            minimizing risks.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-slide-up">
            <Link href="/services" className="btn-primary text-lg px-8 py-4">
              Our Services
            </Link>
            <Link href="/about" className="btn-outline text-lg px-8 py-4">
              Learn More
            </Link>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary-200 to-primary-400 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </section>
  )
} 