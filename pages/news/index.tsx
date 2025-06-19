import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'

interface NewsArticle {
  slug: string
  title: string
  excerpt: string
  author: string
  publishedAt: string
  category: string
  readTime: number
}

interface NewsProps {
  articles: NewsArticle[]
}

export default function News({ articles }: NewsProps) {
  return (
    <>
      <Head>
        <title>Latest News - AI Regulation Association</title>
        <meta
          name="description"
          content="Stay updated with the latest news and insights on AI regulation, policy developments, and governance trends from the AI Regulation Association."
        />
        <meta property="og:title" content="Latest News - AI Regulation Association" />
        <meta
          property="og:description"
          content="Latest news and insights on AI regulation, policy developments, and governance trends."
        />
        <link rel="canonical" href="https://ai-regulation-association.org/news" />
      </Head>

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-secondary-900">Latest News & Insights</h1>
            <p className="mt-6 text-xl leading-8 text-secondary-600">
              Stay informed with the latest developments in AI regulation, policy updates, 
              and governance best practices from our expert team.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.slug} className="flex flex-col items-start">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={article.publishedAt} className="text-secondary-500">
                    {new Date(article.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className="relative z-10 rounded-full bg-secondary-50 px-3 py-1.5 font-medium text-secondary-600 hover:bg-secondary-100">
                    {article.category}
                  </span>
                </div>
                <div className="group relative">
                  <h2 className="mt-3 text-lg font-semibold leading-6 text-secondary-900 group-hover:text-secondary-600">
                    <Link href={`/news/${article.slug}`}>
                      <span className="absolute inset-0" />
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-secondary-600">
                    {article.excerpt}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-secondary-900">
                      {article.author}
                    </p>
                    <p className="text-secondary-600">{article.readTime} min read</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  // In a real app, this would fetch from a CMS or database
  const articles: NewsArticle[] = [
    {
      slug: 'eu-ai-act-implementation-guide',
      title: 'EU AI Act Implementation: A Comprehensive Guide for Organizations',
      excerpt: 'The European Union AI Act is now in effect. Learn what organizations need to know about compliance requirements, timelines, and implementation strategies.',
      author: 'Dr. Sarah Chen',
      publishedAt: '2024-01-15',
      category: 'Policy',
      readTime: 8,
    },
    {
      slug: 'ai-risk-assessment-best-practices',
      title: 'AI Risk Assessment: Best Practices for 2024',
      excerpt: 'Updated frameworks and methodologies for conducting comprehensive AI risk assessments in various industries and use cases.',
      author: 'Prof. Michael Rodriguez',
      publishedAt: '2024-01-10',
      category: 'Best Practices',
      readTime: 6,
    },
    {
      slug: 'global-ai-governance-trends',
      title: 'Global AI Governance Trends: What to Expect in 2024',
      excerpt: 'An analysis of emerging AI governance trends worldwide, including regulatory developments in the US, EU, and Asia-Pacific regions.',
      author: 'Dr. Aisha Patel',
      publishedAt: '2024-01-05',
      category: 'Analysis',
      readTime: 12,
    },
  ]

  return {
    props: {
      articles,
    },
    revalidate: 60, // ISR: Revalidate every 60 seconds
  }
} 