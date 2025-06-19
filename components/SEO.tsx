import Head from 'next/head'
import { generateSeoData, SITE_CONFIG } from '../lib/seo'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'profile'
  twitterCard?: 'summary' | 'summary_large_image'
  structuredData?: Record<string, unknown>
  noIndex?: boolean
  children?: React.ReactNode
}

export default function SEO({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
  noIndex = false,
  children
}: SEOProps) {
  const seoData = generateSeoData({
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    ogType,
    twitterCard,
    structuredData,
    noIndex
  })

  const robots = noIndex ? 'noindex,nofollow' : 'index,follow'

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords?.join(', ')} />
      <meta name="author" content={SITE_CONFIG.author} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content={SITE_CONFIG.themeColor} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      {seoData.canonicalUrl && (
        <link rel="canonical" href={seoData.canonicalUrl} />
      )}
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:type" content={seoData.ogType} />
      <meta property="og:image" content={seoData.ogImage} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:locale" content={SITE_CONFIG.language} />
      {seoData.canonicalUrl && (
        <meta property="og:url" content={seoData.canonicalUrl} />
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={seoData.twitterCard} />
      <meta name="twitter:site" content={SITE_CONFIG.twitter} />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.ogImage} />
      
      {/* Structured Data */}
      {seoData.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoData.structuredData)
          }}
        />
      )}
      
      {/* Additional head elements */}
      {children}
    </Head>
  )
} 