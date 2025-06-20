import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SEO from '../../components/SEO'
import { NewsArticle } from '../../types'
import { getAllNewsArticles, getNewsArticleBySlug } from '../../lib/api'
import { generateArticleStructuredData } from '../../lib/seo'

interface NewsArticlePageProps {
  article: NewsArticle
}

export default function NewsArticlePage({ article }: NewsArticlePageProps) {
  const publishedDate = new Date(article.publishedAt)
  const updatedDate = article.updatedAt ? new Date(article.updatedAt) : null
  const isUpdated = updatedDate && updatedDate.getTime() !== publishedDate.getTime()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <SEO
        title={article.seoTitle || article.title}
        description={article.seoDescription || article.excerpt}
        keywords={article.tags}
        canonicalUrl={`/news/${article.slug}`}
        ogType="article"
        structuredData={generateArticleStructuredData({
          title: article.title,
          description: article.excerpt,
          author: article.author,
          publishedAt: article.publishedAt,
          updatedAt: article.updatedAt,
          imageUrl: article.imageUrl,
          slug: article.slug
        })}
      />
      
      <div className="bg-white px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
              <li>
                <div>
                  <Link href="/" className="text-gray-400 hover:text-gray-500">
                    Home
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <Link href="/news" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    News
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-gray-500" aria-current="page">
                    {article.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-x-4 text-xs mb-4">
              <time dateTime={article.publishedAt} className="text-gray-500">
                {formatDate(publishedDate)}
              </time>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {article.category}
              </span>
              {article.readTime && (
                <span className="text-gray-500">
                  {article.readTime} min read
                </span>
              )}
              {article.featured && (
                <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-700/10">
                  Featured
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {article.title}
            </h1>
            
            <p className="mt-6 text-xl leading-8 text-gray-600">
              {article.excerpt}
            </p>

            <div className="mt-6 flex items-center gap-x-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-800">
                  {article.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{article.author}</p>
                <div className="flex items-center gap-x-2 text-sm text-gray-500">
                  <span>Published {formatDate(publishedDate)}</span>
                  {isUpdated && updatedDate && (
                    <>
                      <span>•</span>
                      <span>Updated {formatDate(updatedDate)}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Article Image */}
          {article.imageUrl && (
            <div className="mb-8">
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.imageAlt || article.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          {article.content && (
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-semibold prose-p:text-gray-700 prose-a:text-blue-600 prose-a:hover:text-blue-500 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-800 hover:bg-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Share this article</h3>
                <div className="mt-2 flex gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://ai-regulation.vercel.app/news/${article.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://ai-regulation.vercel.app/news/${article.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <Link
                href="/news"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to News
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const articles = await getAllNewsArticles()
    
    const paths = articles.map((article) => ({
      params: { slug: article.slug }
    }))

    return {
      paths,
      fallback: 'blocking' // Enable ISR for new articles
    }
  } catch (error) {
    console.error('Error generating article paths:', error)
    
    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string
    const article = await getNewsArticleBySlug(slug)

    if (!article) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        article
      },
      revalidate: 60 // ISR: Revalidate every 60 seconds
    }
  } catch (error) {
    console.error('Error fetching article:', error)
    
    return {
      notFound: true
    }
  }
} 