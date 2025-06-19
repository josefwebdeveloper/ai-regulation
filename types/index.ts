// Type definitions for the AI Regulation Association CMS

export interface NewsArticle {
  slug: string
  title: string
  excerpt: string
  content?: string
  author: string
  publishedAt: string
  updatedAt: string
  category: string
  readTime: number
  featured?: boolean
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
  imageUrl?: string
  imageAlt?: string
}

export interface ResearchReport {
  id: string
  title: string
  description: string
  summary?: string
  authors: string[]
  publishedAt: string
  updatedAt: string
  category: string
  downloadUrl: string
  featured: boolean
  tags?: string[]
  fileSize?: string
  pageCount?: number
  seoTitle?: string
  seoDescription?: string
  thumbnailUrl?: string
}

export interface Event {
  id: string
  title: string
  description: string
  content?: string
  startDate: string
  endDate: string
  location: string
  venue?: string
  eventType: 'Conference' | 'Workshop' | 'Webinar' | 'Panel' | 'Training'
  registrationUrl?: string
  featured?: boolean
  capacity?: number
  currentAttendees?: number
  speakers?: string[]
  agenda?: Array<{
    time: string
    title: string
    speaker: string
    description?: string
  }>
  pricing?: {
    free?: boolean
    standardPrice?: number
    memberPrice?: number
    currency?: string
  }
  seoTitle?: string
  seoDescription?: string
  imageUrl?: string
  tags?: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  shortDescription?: string
  features: string[]
  benefits: string[]
  cta: {
    text: string
    href: string
  }
  pricing?: {
    startingPrice: number
    currency: string
    billingCycle: 'hourly' | 'daily' | 'project' | 'monthly' | 'annually'
  }
  seoTitle?: string
  seoDescription?: string
  icon?: string
  category?: string
  tags?: string[]
}

export interface Founder {
  id: string
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  twitter?: string
  email?: string
  specialties?: string[]
  education?: string[]
  publications?: number
  seoTitle?: string
  seoDescription?: string
}

export interface Organization {
  name: string
  description: string
  mission: string
  vision: string
  values: string[]
  foundedYear: number
  legalStructure: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  contact: {
    email: string
    phone: string
    website: string
  }
  socialMedia: {
    twitter?: string
    linkedin?: string
    github?: string
    youtube?: string
  }
}

export interface BlogPost extends NewsArticle {
  slug: string
  content: string
  metaKeywords?: string[]
  relatedPosts?: string[]
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  tags?: string[]
}

export interface Testimonial {
  id: string
  name: string
  role: string
  organization: string
  content: string
  rating?: number
  imageUrl?: string
  featured?: boolean
}

export interface Newsletter {
  email: string
  subscribedAt: string
  preferences?: string[]
  confirmed?: boolean
}

export interface ContactSubmission {
  name: string
  email: string
  subject: string
  message: string
  submittedAt: string
  status: 'new' | 'in-progress' | 'resolved' | 'closed'
  serviceType?: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface SearchResults {
  news: NewsArticle[]
  reports: ResearchReport[]
  events: Event[]
  total: number
  query: string
}

// SEO Types
export interface SeoData {
  title: string
  description: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  twitterCard?: 'summary' | 'summary_large_image'
  structuredData?: Record<string, unknown>
} 