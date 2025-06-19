import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'
import { NewsArticle } from '../../types'
import { getAllNewsArticles } from '../../lib/api'
import { generateOrganizationStructuredData } from '../../lib/seo'

interface NewsPageProps {
  articles: NewsArticle[]
}

export default function NewsPage({ articles }: NewsPageProps) {
  const featuredArticles = articles.filter(article => article.featured)
  const regularArticles = articles.filter(article => !article.featured)

  return (
    <Layout>
      <SEO
        title="News & Insights"
        description="Latest news, insights, and updates on AI regulation, policy developments, and industry trends from the AI Regulation Association."
        keywords={['AI news', 'regulation updates', 'policy insights', 'AI governance news']}
        canonicalUrl="/news"
        structuredData={generateOrganizationStructuredData()}
      />
      
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              News & Insights
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Stay informed with the latest developments in AI regulation, policy updates, and industry insights.
            </p>
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Featured Articles
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
                {featuredArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} featured />
                ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              All Articles
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {regularArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>

          {/* No Articles Message */}
          {articles.length === 0 && (
            <div className="mx-auto mt-16 max-w-2xl text-center">
              <div className="rounded-lg bg-gray-50 px-6 py-8">
                <h3 className="text-lg font-semibold text-gray-900">No Articles Available</h3>
                <p className="mt-2 text-gray-600">
                  Stay tuned for the latest news and insights on AI regulation and governance.
                </p>
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <div className="rounded-lg bg-blue-50 px-6 py-8">
              <h3 className="text-lg font-semibold text-blue-900">Stay Updated</h3>
              <p className="mt-2 text-blue-700">
                Subscribe to our newsletter to receive the latest AI regulation news and insights directly in your inbox.
              </p>
              <Link
                href="/#newsletter"
                className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

function ArticleCard({ article, featured = false }: { article: NewsArticle; featured?: boolean }) {
  const publishedDate = new Date(article.publishedAt)
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="flex flex-col items-start">
      <div className="relative w-full">
        <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]">
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
              fill
              className="rounded-2xl object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-blue-200 flex items-center justify-center">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-blue-600">{article.category}</p>
              </div>
            </div>
          )}
        </div>
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={article.publishedAt} className="text-gray-500">
            {formatDate(publishedDate)}
          </time>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {article.category}
          </span>
          {article.readTime && (
            <span className="text-gray-500">{article.readTime} min read</span>
          )}
          {featured && (
            <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10">
              Featured
            </span>
          )}
        </div>
        
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={`/news/${article.slug}`}>
              <span className="absolute inset-0" />
              {article.title}
            </Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {article.excerpt}
          </p>
        </div>
        
        <div className="relative mt-8 flex items-center gap-x-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-800">
              {article.author.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <span className="absolute inset-0" />
              {article.author}
            </p>
          </div>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const articles = await getAllNewsArticles()
    
    return {
      props: {
        articles: articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      },
      revalidate: 60 // ISR: Revalidate every 60 seconds
    }
  } catch (error) {
    console.error('Error fetching news articles:', error)
    
    return {
      props: {
        articles: []
      },
      revalidate: 60
    }
  }
} 