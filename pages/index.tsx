import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

// Components
import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import OverviewSection from '@/components/OverviewSection'
import NewsletterSection from '@/components/NewsletterSection'

interface HomeProps {
  stats: {
    policies: number
    organizations: number
    reports: number
    members: number
  }
}

export default function Home({ stats }: HomeProps) {
  return (
    <>
      <Head>
        <title>AI Regulation Association - Leading AI Governance & Policy</title>
        <meta
          name="description"
          content="The AI Regulation Association leads in AI governance, policy development, and ethical AI practices. Building a safer, more transparent future for artificial intelligence."
        />
        <meta name="keywords" content="AI regulation, AI governance, AI policy, artificial intelligence ethics, AI compliance" />
        <meta property="og:title" content="AI Regulation Association - Leading AI Governance & Policy" />
        <meta
          property="og:description"
          content="The AI Regulation Association leads in AI governance, policy development, and ethical AI practices."
        />
        <meta property="og:image" content="/api/og-image" />
        <meta property="og:url" content="https://ai-regulation-association.org" />
        <meta name="twitter:title" content="AI Regulation Association - Leading AI Governance & Policy" />
        <meta
          name="twitter:description"
          content="The AI Regulation Association leads in AI governance, policy development, and ethical AI practices."
        />
        <meta name="twitter:image" content="/api/og-image" />
        <link rel="canonical" href="https://ai-regulation-association.org" />
      </Head>

      <HeroSection />
      <OverviewSection />
      <StatsSection stats={stats} />
      <NewsletterSection />
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // In a real app, this would fetch from a database or API
  const stats = {
    policies: 150,
    organizations: 500,
    reports: 75,
    members: 2500,
  }

  return {
    props: {
      stats,
    },
    revalidate: 3600, // Revalidate every hour
  }
} 