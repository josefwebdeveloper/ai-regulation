import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO and Performance */}
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
        
        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AI Regulation Association" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AI Regulation Association",
              "description": "Leading organization in AI governance, policy development, and ethical AI practices",
              "url": "https://ai-regulation-association.org",
              "logo": "https://ai-regulation-association.org/logo.png",
              "foundingDate": "2024",
              "sameAs": [
                "https://twitter.com/airegassoc",
                "https://linkedin.com/company/ai-regulation-association"
              ]
            })
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 