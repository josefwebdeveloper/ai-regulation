import { GetServerSideProps } from 'next'
import { generateSitemapEntries, SitemapEntry, SITE_CONFIG } from '../lib/seo'
import { getAllNewsArticles, getAllEvents, getAllResearchReports } from '../lib/api'

// Generate XML sitemap dynamically
function generateSitemapXML(entries: SitemapEntry[]): string {
  const urlEntries = entries
    .map(entry => {
      const url = `${SITE_CONFIG.url}${entry.url}`
      const lastmod = entry.lastModified ? `<lastmod>${entry.lastModified}</lastmod>` : ''
      const changefreq = entry.changeFrequency ? `<changefreq>${entry.changeFrequency}</changefreq>` : ''
      const priority = entry.priority ? `<priority>${entry.priority}</priority>` : ''

      return `  <url>
    <loc>${url}</loc>
    ${lastmod}
    ${changefreq}
    ${priority}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  try {
    // Get base site pages
    const baseEntries = generateSitemapEntries()

    // Get dynamic content
    const [newsArticles, events, reports] = await Promise.all([
      getAllNewsArticles(),
      getAllEvents(),
      getAllResearchReports()
    ])

    // Add news articles to sitemap
    const newsEntries: SitemapEntry[] = newsArticles.map(article => ({
      url: `/news/${article.slug}`,
      lastModified: article.updatedAt || article.publishedAt,
      changeFrequency: 'weekly',
      priority: 0.7
    }))

    // Add events to sitemap
    const eventEntries: SitemapEntry[] = events.map(event => ({
      url: `/events/${event.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.6
    }))

    // Add research reports to sitemap (if they have individual pages)
    const reportEntries: SitemapEntry[] = reports.map(report => ({
      url: `/research/${report.id}`,
      lastModified: report.updatedAt || report.publishedAt,
      changeFrequency: 'monthly',
      priority: 0.8
    }))

    // Combine all entries
    const allEntries = [
      ...baseEntries,
      ...newsEntries,
      ...eventEntries,
      ...reportEntries
    ]

    // Generate XML
    const sitemap = generateSitemapXML(allEntries)

    // Set cache headers
    res.setHeader('Content-Type', 'text/xml')
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
    res.write(sitemap)
    res.end()

    return {
      props: {}
    }
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Return minimal sitemap on error
    const fallbackSitemap = generateSitemapXML(generateSitemapEntries())
    res.setHeader('Content-Type', 'text/xml')
    res.write(fallbackSitemap)
    res.end()

    return {
      props: {}
    }
  }
}

// This component won't be rendered since we return the XML directly
export default function Sitemap() {
  return null
} 