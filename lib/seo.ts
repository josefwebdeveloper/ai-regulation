// SEO utilities for dynamic meta tags, sitemaps, and structured data

import { SeoData } from '../types'

// Base site configuration
export const SITE_CONFIG = {
  name: 'AI Regulation Association',
  description: 'Leading AI governance, policy development, and ethical AI practices. Building a safer, more transparent future for artificial intelligence.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-regulation.vercel.app',
  logo: '/logo.png',
  twitter: '@airegulation',
  author: 'AI Regulation Association',
  keywords: [
    'AI regulation',
    'artificial intelligence governance',
    'AI policy development',
    'AI ethics',
    'AI compliance',
    'AI risk assessment',
    'technology policy',
    'AI safety',
    'responsible AI',
    'AI standards'
  ],
  ogImage: '/og-image.jpg',
  language: 'en-US',
  themeColor: '#3b82f6'
}

// Generate structured data for Organization
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': SITE_CONFIG.name,
    'description': SITE_CONFIG.description,
    'url': SITE_CONFIG.url,
    'logo': `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    'sameAs': [
      'https://twitter.com/airegulation',
      'https://linkedin.com/company/ai-regulation-association',
      'https://github.com/ai-regulation-association'
    ],
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+1-555-123-4567',
      'contactType': 'customer service',
      'areaServed': 'Worldwide',
      'availableLanguage': 'English'
    },
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '123 Innovation Drive',
      'addressLocality': 'Tech Valley',
      'addressRegion': 'CA',
      'postalCode': '94000',
      'addressCountry': 'US'
    }
  }
}

// Generate structured data for Articles/Blog Posts
export function generateArticleStructuredData(article: {
  title: string
  description: string
  author: string
  publishedAt: string
  updatedAt?: string
  imageUrl?: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.description,
    'image': article.imageUrl ? `${SITE_CONFIG.url}${article.imageUrl}` : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    'url': `${SITE_CONFIG.url}/news/${article.slug}`,
    'datePublished': article.publishedAt,
    'dateModified': article.updatedAt || article.publishedAt,
    'author': {
      '@type': 'Person',
      'name': article.author
    },
    'publisher': {
      '@type': 'Organization',
      'name': SITE_CONFIG.name,
      'logo': {
        '@type': 'ImageObject',
        'url': `${SITE_CONFIG.url}${SITE_CONFIG.logo}`
      }
    }
  }
}

// Generate structured data for Events
export function generateEventStructuredData(event: {
  title: string
  description: string
  startDate: string
  endDate?: string
  location: string
  venue?: string
  registrationUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': event.title,
    'description': event.description,
    'startDate': event.startDate,
    'endDate': event.endDate || event.startDate,
    'location': {
      '@type': 'Place',
      'name': event.venue || event.location,
      'address': event.location
    },
    'organizer': {
      '@type': 'Organization',
      'name': SITE_CONFIG.name,
      'url': SITE_CONFIG.url
    },
    'offers': event.registrationUrl ? {
      '@type': 'Offer',
      'url': `${SITE_CONFIG.url}${event.registrationUrl}`,
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    } : undefined
  }
}

// Generate structured data for Research Reports
export function generateReportStructuredData(report: {
  title: string
  description: string
  authors: string[]
  publishedAt: string
  downloadUrl: string
  fileSize?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Report',
    'name': report.title,
    'description': report.description,
    'datePublished': report.publishedAt,
    'author': report.authors.map(author => ({
      '@type': 'Person',
      'name': author
    })),
    'publisher': {
      '@type': 'Organization',
      'name': SITE_CONFIG.name
    },
    'url': `${SITE_CONFIG.url}${report.downloadUrl}`,
    'fileSize': report.fileSize
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': crumb.name,
      'item': `${SITE_CONFIG.url}${crumb.url}`
    }))
  }
}

// Generate FAQ structured data
export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  }
}

// Generate comprehensive SEO data for pages
export function generateSeoData({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  noIndex = false,
  alternateLanguages = []
}: {
  title: string
  description: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  twitterCard?: 'summary' | 'summary_large_image'
  structuredData?: Record<string, unknown>
  noIndex?: boolean
  alternateLanguages?: Array<{ lang: string; url: string }>
}): SeoData & { 
  robots?: string
  alternateLanguages?: Array<{ lang: string; url: string }>
} {
  const fullTitle = title.includes(SITE_CONFIG.name) ? title : `${title} | ${SITE_CONFIG.name}`
  const allKeywords = [...SITE_CONFIG.keywords, ...keywords]
  const finalOgImage = ogImage ? `${SITE_CONFIG.url}${ogImage}` : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`

  return {
    title: fullTitle,
    description,
    keywords: allKeywords,
    canonicalUrl: canonicalUrl ? `${SITE_CONFIG.url}${canonicalUrl}` : undefined,
    ogImage: finalOgImage,
    ogType,
    twitterCard,
    structuredData,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    alternateLanguages
  }
}

// Generate sitemap entries
export interface SitemapEntry {
  url: string
  lastModified?: string
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

export function generateSitemapEntries(): SitemapEntry[] {
  const baseEntries: SitemapEntry[] = [
    {
      url: '/',
      changeFrequency: 'weekly',
      priority: 1.0,
      lastModified: new Date().toISOString()
    },
    {
      url: '/about',
      changeFrequency: 'monthly',
      priority: 0.8,
      lastModified: new Date().toISOString()
    },
    {
      url: '/services',
      changeFrequency: 'monthly',
      priority: 0.8,
      lastModified: new Date().toISOString()
    },
    {
      url: '/research',
      changeFrequency: 'weekly',
      priority: 0.9,
      lastModified: new Date().toISOString()
    },
    {
      url: '/news',
      changeFrequency: 'daily',
      priority: 0.9,
      lastModified: new Date().toISOString()
    },
    {
      url: '/events',
      changeFrequency: 'weekly',
      priority: 0.8,
      lastModified: new Date().toISOString()
    },
    {
      url: '/contact',
      changeFrequency: 'monthly',
      priority: 0.6,
      lastModified: new Date().toISOString()
    }
  ]

  return baseEntries
}

// Generate robots.txt content
export function generateRobotsTxt(): string {
  const siteUrl = SITE_CONFIG.url
  
  return `User-agent: *
Allow: /

# Block crawling of API endpoints
Disallow: /api/

# Block crawling of admin areas (if any)
Disallow: /admin/

# Block crawling of private files
Disallow: /private/

# Allow crawling of public assets
Allow: /public/
Allow: /_next/static/

# Sitemap location
Sitemap: ${siteUrl}/sitemap.xml

# Crawl delay for polite crawling (optional)
Crawl-delay: 1`
}

// Helper function to format meta tags for HTML head
export function formatMetaTags(seoData: SeoData & { robots?: string }): string {
  const tags = [
    `<title>${seoData.title}</title>`,
    `<meta name="description" content="${seoData.description}" />`,
    `<meta name="keywords" content="${seoData.keywords?.join(', ')}" />`,
    `<meta name="author" content="${SITE_CONFIG.author}" />`,
    `<meta name="robots" content="${seoData.robots || 'index,follow'}" />`,
    `<meta name="theme-color" content="${SITE_CONFIG.themeColor}" />`,
    `<meta name="viewport" content="width=device-width, initial-scale=1" />`,
    
    // Open Graph tags
    `<meta property="og:title" content="${seoData.title}" />`,
    `<meta property="og:description" content="${seoData.description}" />`,
    `<meta property="og:type" content="${seoData.ogType}" />`,
    `<meta property="og:image" content="${seoData.ogImage}" />`,
    `<meta property="og:site_name" content="${SITE_CONFIG.name}" />`,
    `<meta property="og:locale" content="${SITE_CONFIG.language}" />`,
    
    // Twitter Card tags
    `<meta name="twitter:card" content="${seoData.twitterCard}" />`,
    `<meta name="twitter:site" content="${SITE_CONFIG.twitter}" />`,
    `<meta name="twitter:title" content="${seoData.title}" />`,
    `<meta name="twitter:description" content="${seoData.description}" />`,
    `<meta name="twitter:image" content="${seoData.ogImage}" />`,
    
    // Canonical URL
    seoData.canonicalUrl ? `<link rel="canonical" href="${seoData.canonicalUrl}" />` : '',
    
    // Structured data
    seoData.structuredData ? `<script type="application/ld+json">${JSON.stringify(seoData.structuredData)}</script>` : ''
  ]

  return tags.filter(Boolean).join('\n  ')
}

export default {
  SITE_CONFIG,
  generateOrganizationStructuredData,
  generateArticleStructuredData,
  generateEventStructuredData,
  generateReportStructuredData,
  generateBreadcrumbStructuredData,
  generateFAQStructuredData,
  generateSeoData,
  generateSitemapEntries,
  generateRobotsTxt,
  formatMetaTags
} 