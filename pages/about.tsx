import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

interface Founder {
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
}

interface AboutProps {
  founders: Founder[]
}

export default function About({ founders }: AboutProps) {
  return (
    <>
      <Head>
        <title>About Us - AI Regulation Association</title>
        <meta
          name="description"
          content="Learn about the AI Regulation Association's mission, vision, values, and founding team dedicated to responsible AI governance."
        />
        <meta property="og:title" content="About Us - AI Regulation Association" />
        <meta
          property="og:description"
          content="Learn about the AI Regulation Association's mission, vision, values, and founding team dedicated to responsible AI governance."
        />
        <link rel="canonical" href="https://ai-regulation-association.org/about" />
      </Head>

      {/* Hero Section */}
      <section className="section bg-secondary-50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-secondary-900">About Our Organization</h1>
            <p className="mt-6 text-xl leading-8 text-secondary-600">
              We are dedicated to shaping the future of artificial intelligence through thoughtful regulation, 
              comprehensive policy development, and collaborative governance frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                <MissionIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Our Mission</h3>
              <p className="text-secondary-600 leading-relaxed">
                To establish comprehensive, ethical, and practical frameworks for AI governance that protect 
                humanity while fostering innovation and technological advancement.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                <VisionIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Our Vision</h3>
              <p className="text-secondary-600 leading-relaxed">
                A world where artificial intelligence is developed and deployed responsibly, with clear 
                regulatory frameworks that ensure AI serves the greater good of humanity.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center mb-6">
                <ValuesIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Our Values</h3>
              <p className="text-secondary-600 leading-relaxed">
                Transparency, accountability, inclusivity, and scientific rigor guide our approach to 
                AI regulation and policy development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Gallery */}
      <section className="section bg-secondary-50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-secondary-900">Our Founding Team</h2>
            <p className="mt-6 text-lg leading-8 text-secondary-600">
              Meet the visionaries who established the AI Regulation Association to guide the responsible 
              development of artificial intelligence.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {founders.map((founder) => (
              <div key={founder.name} className="card p-8 text-center">
                <div className="mx-auto h-32 w-32 rounded-full bg-secondary-200 mb-6">
                  {/* Placeholder for founder image */}
                  <div className="h-full w-full rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">{founder.name}</h3>
                <p className="text-primary-600 font-medium mb-4">{founder.role}</p>
                <p className="text-secondary-600 text-sm leading-relaxed">{founder.bio}</p>
                {founder.linkedin && (
                  <a
                    href={founder.linkedin}
                    className="inline-flex items-center mt-4 text-primary-600 hover:text-primary-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn Profile
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Structure */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-secondary-900">Legal Structure & Governance</h2>
            </div>
            <div className="prose prose-lg mx-auto text-secondary-600">
              <p>
                The AI Regulation Association is established as a 501(c)(3) non-profit organization, 
                ensuring our independence and commitment to the public interest. Our governance structure 
                includes:
              </p>
              <ul>
                <li>A Board of Directors composed of experts from technology, law, ethics, and policy</li>
                <li>An Advisory Council featuring representatives from academia, industry, and civil society</li>
                <li>Working Groups focused on specific aspects of AI governance and regulation</li>
                <li>Transparent financial reporting and accountability measures</li>
              </ul>
              <p>
                We maintain strict ethical guidelines and conflict-of-interest policies to ensure our 
                recommendations and policies serve the broader public interest rather than any specific 
                commercial or political agenda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Simple icon components
function MissionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}

function VisionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function ValuesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  )
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  // In a real app, this would fetch from a database or CMS
  const founders: Founder[] = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Executive Director & Co-Founder',
      bio: 'Former AI Ethics researcher at Stanford with 15+ years in technology policy and governance.',
      image: '/founders/sarah-chen.jpg',
      linkedin: 'https://linkedin.com/in/sarah-chen',
    },
    {
      name: 'Prof. Michael Rodriguez',
      role: 'Chief Policy Officer & Co-Founder',
      bio: 'Harvard Law professor specializing in technology regulation and artificial intelligence law.',
      image: '/founders/michael-rodriguez.jpg',
      linkedin: 'https://linkedin.com/in/michael-rodriguez',
    },
    {
      name: 'Dr. Aisha Patel',
      role: 'Head of Research & Co-Founder',
      bio: 'AI safety researcher and former Google DeepMind team member with expertise in algorithmic fairness.',
      image: '/founders/aisha-patel.jpg',
      linkedin: 'https://linkedin.com/in/aisha-patel',
    },
  ]

  return {
    props: {
      founders,
    },
    revalidate: 86400, // Revalidate once per day
  }
} 