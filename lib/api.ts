// API service layer for headless CMS integration
// This file contains service functions to fetch data from various headless CMS providers
// Currently using placeholder data, but can be easily replaced with real API calls

import { NewsArticle, ResearchReport, Event, Service, Founder } from '../types'

// Generic API client with caching
class ApiClient {
  private cache = new Map<string, { data: unknown; timestamp: number }>()
  private cacheTimeout = 5 * 60 * 1000 // 5 minutes

  async fetch<T>(key: string, fetcher: () => Promise<T>, useCache = true): Promise<T> {
    if (useCache && this.cache.has(key)) {
      const cached = this.cache.get(key)!
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data as T
      }
    }

    try {
      const data = await fetcher()
      if (useCache) {
        this.cache.set(key, { data, timestamp: Date.now() })
      }
      return data
    } catch (error) {
      console.error(`API fetch error for ${key}:`, error)
      // Return fallback data on error
      return this.getFallbackData(key) as T
    }
  }

  private getFallbackData(key: string): unknown {
    // Return appropriate fallback data based on the key
    if (key.includes('news')) return []
    if (key.includes('events')) return []
    if (key.includes('reports')) return []
    return null
  }
}

const apiClient = new ApiClient()

// =============================================================================
// NEWS ARTICLES
// =============================================================================

export async function getAllNewsArticles(limit?: number): Promise<NewsArticle[]> {
  return apiClient.fetch('news-all', async () => {
    // TODO: Replace with actual CMS API call
    // Example Contentful call:
    // const client = contentful.createClient({
    //   space: CMS_CONFIG.contentful.spaceId!,
    //   accessToken: CMS_CONFIG.contentful.accessToken!,
    // })
    // const entries = await client.getEntries({ content_type: 'newsArticle', limit })
    // return entries.items.map(transformContentfulNewsArticle)

    // Example Strapi call:
    // const response = await fetch(`${CMS_CONFIG.strapi.apiUrl}/news-articles?populate=*&sort=publishedAt:desc${limit ? `&pagination[limit]=${limit}` : ''}`)
    // const data = await response.json()
    // return data.data.map(transformStrapiNewsArticle)

    // Placeholder data
    const articles: NewsArticle[] = [
      {
        slug: 'eu-ai-act-implementation-guide',
        title: 'EU AI Act Implementation: A Comprehensive Guide for Organizations',
        excerpt: 'The European Union AI Act is now in effect. Learn what organizations need to know about compliance requirements, timelines, and implementation strategies.',
        content: `<h2>Overview</h2><p>The EU AI Act represents a landmark piece of legislation...</p>`,
        author: 'Dr. Sarah Chen',
        publishedAt: '2024-01-15',
        updatedAt: '2024-01-15',
        category: 'Policy',
        readTime: 8,
        featured: true,
        tags: ['EU AI Act', 'Compliance', 'Regulation'],
        seoTitle: 'EU AI Act Implementation Guide | AI Regulation Association',
        seoDescription: 'Complete guide to EU AI Act compliance requirements and implementation strategies for organizations.',
      },
      {
        slug: 'ai-risk-assessment-best-practices',
        title: 'AI Risk Assessment: Best Practices for 2024',
        excerpt: 'Updated frameworks and methodologies for conducting comprehensive AI risk assessments in various industries and use cases.',
        content: `<h2>Introduction</h2><p>AI risk assessment has evolved significantly...</p>`,
        author: 'Prof. Michael Rodriguez',
        publishedAt: '2024-01-10',
        updatedAt: '2024-01-10',
        category: 'Best Practices',
        readTime: 6,
        featured: true,
        tags: ['Risk Assessment', 'AI Safety', 'Best Practices'],
        seoTitle: 'AI Risk Assessment Best Practices 2024 | AI Regulation Association',
        seoDescription: 'Learn the latest frameworks and methodologies for comprehensive AI risk assessments.',
      },
      {
        slug: 'global-ai-governance-trends',
        title: 'Global AI Governance Trends: What to Expect in 2024',
        excerpt: 'An analysis of emerging AI governance trends worldwide, including regulatory developments in the US, EU, and Asia-Pacific regions.',
        content: `<h2>Global Overview</h2><p>AI governance is rapidly evolving across different regions...</p>`,
        author: 'Dr. Aisha Patel',
        publishedAt: '2024-01-05',
        updatedAt: '2024-01-05',
        category: 'Analysis',
        readTime: 12,
        featured: false,
        tags: ['Global Governance', 'Trends', 'Policy Analysis'],
        seoTitle: 'Global AI Governance Trends 2024 | AI Regulation Association',
        seoDescription: 'Analysis of emerging AI governance trends in the US, EU, and Asia-Pacific regions.',
      },
    ]

    return limit ? articles.slice(0, limit) : articles
  })
}

export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  return apiClient.fetch(`news-${slug}`, async () => {
    // TODO: Replace with actual CMS API call
    const articles = await getAllNewsArticles()
    return articles.find(article => article.slug === slug) || null
  })
}

export async function getFeaturedNewsArticles(limit = 3): Promise<NewsArticle[]> {
  return apiClient.fetch(`news-featured-${limit}`, async () => {
    const articles = await getAllNewsArticles()
    return articles.filter(article => article.featured).slice(0, limit)
  })
}

// =============================================================================
// RESEARCH REPORTS
// =============================================================================

export async function getAllResearchReports(): Promise<ResearchReport[]> {
  return apiClient.fetch('reports-all', async () => {
    // TODO: Replace with actual CMS API call
    
    const reports: ResearchReport[] = [
      {
        id: '1',
        title: 'AI Governance Framework for Healthcare Organizations',
        description: 'Comprehensive guide for implementing AI governance in healthcare settings, covering regulatory compliance, ethical considerations, and risk management.',
        summary: 'This report provides healthcare organizations with a practical framework for implementing comprehensive AI governance.',
        authors: ['Dr. Sarah Chen', 'Dr. James Wilson'],
        publishedAt: '2024-01-15',
        updatedAt: '2024-01-15',
        category: 'Healthcare',
        downloadUrl: '/reports/ai-governance-healthcare-2024.pdf',
        featured: true,
        tags: ['Healthcare', 'Governance', 'Implementation'],
        fileSize: '2.4 MB',
        pageCount: 45,
        seoTitle: 'AI Governance Framework for Healthcare | AI Regulation Association',
        seoDescription: 'Comprehensive guide for implementing AI governance in healthcare settings with regulatory compliance strategies.',
      },
      {
        id: '2',
        title: 'Global AI Regulation Landscape 2024',
        description: 'Analysis of AI regulatory developments worldwide, including comparative analysis of different approaches and emerging trends.',
        summary: 'A comprehensive analysis of AI regulatory developments across major jurisdictions worldwide.',
        authors: ['Prof. Michael Rodriguez', 'Dr. Aisha Patel'],
        publishedAt: '2024-01-10',
        updatedAt: '2024-01-10',
        category: 'Policy Analysis',
        downloadUrl: '/reports/global-ai-regulation-2024.pdf',
        featured: true,
        tags: ['Global Policy', 'Comparative Analysis', 'Regulatory Trends'],
        fileSize: '3.1 MB',
        pageCount: 62,
        seoTitle: 'Global AI Regulation Landscape 2024 | AI Regulation Association',
        seoDescription: 'Comprehensive analysis of AI regulatory developments worldwide with comparative insights.',
      },
      {
        id: '3',
        title: 'Bias Detection and Mitigation in AI Systems',
        description: 'Technical report on methods and tools for identifying and addressing bias in AI systems across different domains and applications.',
        summary: 'Technical guide covering advanced methods for detecting and mitigating bias in AI systems.',
        authors: ['Dr. Aisha Patel', 'Dr. Alex Kim'],
        publishedAt: '2024-01-05',
        updatedAt: '2024-01-05',
        category: 'Technical',
        downloadUrl: '/reports/bias-detection-ai-2024.pdf',
        featured: true,
        tags: ['AI Bias', 'Technical Methods', 'Fairness'],
        fileSize: '1.8 MB',
        pageCount: 38,
        seoTitle: 'AI Bias Detection and Mitigation Guide | AI Regulation Association',
        seoDescription: 'Technical report on methods and tools for identifying and addressing bias in AI systems.',
      },
    ]

    return reports
  })
}

export async function getResearchReportById(id: string): Promise<ResearchReport | null> {
  return apiClient.fetch(`report-${id}`, async () => {
    const reports = await getAllResearchReports()
    return reports.find(report => report.id === id) || null
  })
}

export async function getFeaturedResearchReports(limit = 3): Promise<ResearchReport[]> {
  return apiClient.fetch(`reports-featured-${limit}`, async () => {
    const reports = await getAllResearchReports()
    return reports.filter(report => report.featured).slice(0, limit)
  })
}

// =============================================================================
// EVENTS
// =============================================================================

export async function getAllEvents(): Promise<Event[]> {
  return apiClient.fetch('events-all', async () => {
    // TODO: Replace with actual CMS API call
    
    const events: Event[] = [
      {
        id: '1',
        title: 'AI Governance Summit 2024',
        description: 'Annual summit bringing together policymakers, technologists, and ethicists to discuss the future of AI governance.',
        content: `<h2>About the Summit</h2><p>Join leading experts in AI governance...</p>`,
        startDate: '2024-06-15',
        endDate: '2024-06-17',
        location: 'San Francisco, CA',
        venue: 'Moscone Center',
        eventType: 'Conference',
        registrationUrl: '/events/ai-governance-summit-2024/register',
        featured: true,
        capacity: 500,
        currentAttendees: 387,
        speakers: ['Dr. Sarah Chen', 'Prof. Michael Rodriguez', 'Dr. Aisha Patel'],
        agenda: [
          { time: '09:00', title: 'Opening Keynote', speaker: 'Dr. Sarah Chen' },
          { time: '10:30', title: 'Panel: Global AI Regulation Trends', speaker: 'Various' },
        ],
        seoTitle: 'AI Governance Summit 2024 | AI Regulation Association',
        seoDescription: 'Join leading experts at the annual AI Governance Summit in San Francisco.',
      },
      {
        id: '2',
        title: 'Workshop: AI Risk Assessment Methodologies',
        description: 'Hands-on workshop covering practical approaches to AI risk assessment and mitigation strategies.',
        content: `<h2>Workshop Overview</h2><p>This intensive workshop covers...</p>`,
        startDate: '2024-05-20',
        endDate: '2024-05-20',
        location: 'Virtual',
        venue: 'Online Platform',
        eventType: 'Workshop',
        registrationUrl: '/events/ai-risk-workshop-2024/register',
        featured: true,
        capacity: 100,
        currentAttendees: 78,
        speakers: ['Prof. Michael Rodriguez'],
        agenda: [
          { time: '14:00', title: 'Introduction to AI Risk Assessment', speaker: 'Prof. Michael Rodriguez' },
          { time: '15:30', title: 'Hands-on Exercises', speaker: 'Prof. Michael Rodriguez' },
        ],
        seoTitle: 'AI Risk Assessment Workshop | AI Regulation Association',
        seoDescription: 'Hands-on workshop covering practical AI risk assessment methodologies.',
      },
    ]

    return events
  })
}

export async function getEventById(id: string): Promise<Event | null> {
  return apiClient.fetch(`event-${id}`, async () => {
    const events = await getAllEvents()
    return events.find(event => event.id === id) || null
  })
}

export async function getUpcomingEvents(limit = 5): Promise<Event[]> {
  return apiClient.fetch(`events-upcoming-${limit}`, async () => {
    const events = await getAllEvents()
    const now = new Date()
    return events
      .filter(event => new Date(event.startDate) > now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, limit)
  })
}

// =============================================================================
// SERVICES
// =============================================================================

export async function getAllServices(): Promise<Service[]> {
  return apiClient.fetch('services-all', async () => {
    // TODO: Replace with actual CMS API call
    
    const services: Service[] = [
      {
        id: 'assessment',
        title: 'AI Risk Assessment',
        description: 'Comprehensive evaluation of AI systems to identify potential risks, biases, and compliance issues before deployment.',
        shortDescription: 'Thorough AI system evaluation and risk identification',
        features: [
          'Bias detection and mitigation strategies',
          'Security vulnerability assessment',
          'Compliance gap analysis',
          'Performance and accuracy evaluation',
          'Ethical impact assessment',
          'Regulatory compliance review'
        ],
        benefits: [
          'Reduced regulatory compliance risks',
          'Enhanced system reliability and safety',
          'Improved stakeholder confidence',
          'Faster time-to-market with proper validation',
          'Cost savings through early risk identification'
        ],
        cta: {
          text: 'Request Risk Assessment',
          href: '/contact?service=assessment'
        },
        pricing: {
          startingPrice: 5000,
          currency: 'USD',
          billingCycle: 'project'
        },
        seoTitle: 'AI Risk Assessment Services | AI Regulation Association',
        seoDescription: 'Comprehensive AI risk assessment services to identify and mitigate potential risks before deployment.',
      },
      // Add other services...
    ]

    return services
  })
}

// =============================================================================
// ABOUT & TEAM
// =============================================================================

export async function getFounders(): Promise<Founder[]> {
  return apiClient.fetch('founders', async () => {
    // TODO: Replace with actual CMS API call
    
    const founders: Founder[] = [
      {
        id: '1',
        name: 'Dr. Sarah Chen',
        role: 'Executive Director & Co-Founder',
        bio: 'Former AI Ethics researcher at Stanford with 15+ years in technology policy and governance.',
        image: '/team/sarah-chen.jpg',
        linkedin: 'https://linkedin.com/in/sarah-chen',
        twitter: 'https://twitter.com/sarahchen',
        email: 'sarah.chen@ai-regulation-association.org',
        specialties: ['AI Ethics', 'Policy Development', 'Technology Governance'],
        education: ['PhD Computer Science, Stanford University', 'MS Ethics & Technology, MIT'],
        publications: 25,
        seoTitle: 'Dr. Sarah Chen - Executive Director | AI Regulation Association',
        seoDescription: 'Dr. Sarah Chen leads the AI Regulation Association with 15+ years in AI ethics and technology policy.',
      },
      // Add other founders...
    ]

    return founders
  })
}

// =============================================================================
// STATISTICS & ANALYTICS
// =============================================================================

export async function getOrganizationStats(): Promise<{
  policies: number
  organizations: number
  reports: number
  members: number
  lastUpdated: string
}> {
  return apiClient.fetch('org-stats', async () => {
    // TODO: Replace with actual analytics API call
    
    return {
      policies: 150,
      organizations: 500,
      reports: 75,
      members: 2500,
      lastUpdated: new Date().toISOString(),
    }
  })
}

// =============================================================================
// SEARCH & FILTERING
// =============================================================================

export async function searchContent(query: string, type?: 'news' | 'reports' | 'events'): Promise<{
  news: NewsArticle[]
  reports: ResearchReport[]
  events: Event[]
}> {
  return apiClient.fetch(`search-${query}-${type || 'all'}`, async () => {
    const [news, reports, events] = await Promise.all([
      type === 'news' || !type ? getAllNewsArticles() : [],
      type === 'reports' || !type ? getAllResearchReports() : [],
      type === 'events' || !type ? getAllEvents() : [],
    ])

    const searchTerm = query.toLowerCase()

    const filterByQuery = <T extends { title?: string; description?: string; content?: string; tags?: string[] }>(items: T[]): T[] =>
      items.filter(item =>
        item.title?.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm) ||
        item.content?.toLowerCase().includes(searchTerm) ||
        item.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm))
      )

    return {
      news: filterByQuery(news),
      reports: filterByQuery(reports),
      events: filterByQuery(events),
    }
  }, false) // Don't cache search results
}

export default {
  // News
  getAllNewsArticles,
  getNewsArticleBySlug,
  getFeaturedNewsArticles,
  
  // Research
  getAllResearchReports,
  getResearchReportById,
  getFeaturedResearchReports,
  
  // Events
  getAllEvents,
  getEventById,
  getUpcomingEvents,
  
  // Services
  getAllServices,
  
  // About
  getFounders,
  
  // Stats
  getOrganizationStats,
  
  // Search
  searchContent,
} 