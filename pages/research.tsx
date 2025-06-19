import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'

interface ResearchReport {
  id: string
  title: string
  description: string
  authors: string[]
  publishedAt: string
  category: string
  downloadUrl: string
  featured: boolean
}

interface ResearchProps {
  featuredReports: ResearchReport[]
  archiveReports: ResearchReport[]
}

export default function Research({ featuredReports, archiveReports }: ResearchProps) {
  return (
    <>
      <Head>
        <title>Research & Reports - AI Regulation Association</title>
        <meta
          name="description"
          content="Access comprehensive research reports, policy analyses, and regulatory insights on AI governance and regulation from the AI Regulation Association."
        />
        <meta property="og:title" content="Research & Reports - AI Regulation Association" />
        <meta
          property="og:description"
          content="Comprehensive research reports and policy analyses on AI governance and regulation."
        />
        <link rel="canonical" href="https://ai-regulation-association.org/research" />
      </Head>

      {/* Hero Section */}
      <section className="section bg-secondary-50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-secondary-900">Research & Reports</h1>
            <p className="mt-6 text-xl leading-8 text-secondary-600">
              Comprehensive research and analysis on AI governance, policy frameworks, 
              and regulatory trends to inform decision-making and advance responsible AI practices.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Reports */}
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-secondary-900">Latest Reports</h2>
            <p className="mt-6 text-lg leading-8 text-secondary-600">
              Our most recent research and policy analysis reports.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredReports.map((report) => (
              <div key={report.id} className="card p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center rounded-full bg-primary-100 px-3 py-0.5 text-sm font-medium text-primary-800">
                    {report.category}
                  </span>
                  <time className="text-sm text-secondary-500">
                    {new Date(report.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })}
                  </time>
                </div>
                
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {report.title}
                </h3>
                
                <p className="text-secondary-600 mb-4 line-clamp-3">
                  {report.description}
                </p>
                
                <div className="mb-6">
                  <p className="text-sm font-medium text-secondary-700 mb-1">Authors:</p>
                  <p className="text-sm text-secondary-600">{report.authors.join(', ')}</p>
                </div>
                
                <a
                  href={report.downloadUrl}
                  className="btn-primary w-full text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Report
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Archive Table */}
      <section className="section bg-secondary-50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-secondary-900">Research Archive</h2>
            <p className="mt-6 text-lg leading-8 text-secondary-600">
              Complete collection of our research reports and policy analyses.
            </p>
          </div>

          <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-secondary-200">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Authors
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                        Download
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-secondary-200">
                    {archiveReports.map((report) => (
                      <tr key={report.id} className="hover:bg-secondary-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-secondary-900">
                            {report.title}
                          </div>
                          <div className="text-sm text-secondary-500 line-clamp-2">
                            {report.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                            {report.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                          {report.authors.join(', ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                          {new Date(report.publishedAt).toLocaleDateString('en-US')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a
                            href={report.downloadUrl}
                            className="text-primary-600 hover:text-primary-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps<ResearchProps> = async () => {
  // In a real app, this would fetch from a CMS or database
  const allReports: ResearchReport[] = [
    {
      id: '1',
      title: 'AI Governance Framework for Healthcare Organizations',
      description: 'Comprehensive guide for implementing AI governance in healthcare settings, covering regulatory compliance, ethical considerations, and risk management.',
      authors: ['Dr. Sarah Chen', 'Dr. James Wilson'],
      publishedAt: '2024-01-15',
      category: 'Healthcare',
      downloadUrl: '/reports/ai-governance-healthcare-2024.pdf',
      featured: true,
    },
    {
      id: '2',
      title: 'Global AI Regulation Landscape 2024',
      description: 'Analysis of AI regulatory developments worldwide, including comparative analysis of different approaches and emerging trends.',
      authors: ['Prof. Michael Rodriguez', 'Dr. Aisha Patel'],
      publishedAt: '2024-01-10',
      category: 'Policy Analysis',
      downloadUrl: '/reports/global-ai-regulation-2024.pdf',
      featured: true,
    },
    {
      id: '3',
      title: 'Bias Detection and Mitigation in AI Systems',
      description: 'Technical report on methods and tools for identifying and addressing bias in AI systems across different domains and applications.',
      authors: ['Dr. Aisha Patel', 'Dr. Alex Kim'],
      publishedAt: '2024-01-05',
      category: 'Technical',
      downloadUrl: '/reports/bias-detection-ai-2024.pdf',
      featured: true,
    },
    {
      id: '4',
      title: 'Financial Services AI Risk Assessment Framework',
      description: 'Industry-specific framework for assessing AI risks in financial services, including regulatory requirements and best practices.',
      authors: ['Prof. Michael Rodriguez'],
      publishedAt: '2023-12-15',
      category: 'Financial Services',
      downloadUrl: '/reports/fintech-ai-risk-2023.pdf',
      featured: false,
    },
    {
      id: '5',
      title: 'AI Ethics in Autonomous Vehicles',
      description: 'Ethical considerations and governance frameworks for AI systems in autonomous vehicle development and deployment.',
      authors: ['Dr. Sarah Chen', 'Dr. Maria Gonzalez'],
      publishedAt: '2023-11-20',
      category: 'Automotive',
      downloadUrl: '/reports/ai-ethics-autonomous-vehicles-2023.pdf',
      featured: false,
    },
  ]

  const featuredReports = allReports.filter(report => report.featured)
  const archiveReports = allReports

  return {
    props: {
      featuredReports,
      archiveReports,
    },
    revalidate: 3600, // Revalidate every hour
  }
} 