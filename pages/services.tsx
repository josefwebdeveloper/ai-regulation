import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Link from 'next/link'

interface Service {
  id: string
  title: string
  description: string
  features: string[]
  benefits: string[]
  cta: {
    text: string
    href: string
  }
}

interface ServicesProps {
  services: Service[]
}

export default function Services({ services }: ServicesProps) {
  return (
    <>
      <Head>
        <title>Our Services - AI Regulation Association</title>
        <meta
          name="description"
          content="Comprehensive AI governance services including risk assessment, policy development, consulting, and education programs for organizations worldwide."
        />
        <meta property="og:title" content="Our Services - AI Regulation Association" />
        <meta
          property="og:description"
          content="Comprehensive AI governance services including risk assessment, policy development, consulting, and education programs."
        />
        <link rel="canonical" href="https://ai-regulation-association.org/services" />
      </Head>

      {/* Hero Section */}
      <section className="section bg-secondary-50">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-secondary-900">Our Services</h1>
            <p className="mt-6 text-xl leading-8 text-secondary-600">
              Comprehensive AI governance solutions tailored to your organization&apos;s needs. 
              From risk assessment to policy implementation, we guide you through every step 
              of responsible AI development.
            </p>
          </div>
        </div>
      </section>

      {/* Services Sections */}
      <div className="bg-white">
        {services.map((service, index) => (
          <section key={service.id} id={service.id} className="section">
            <div className="container">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h2 className="text-secondary-900">{service.title}</h2>
                  <p className="mt-6 text-lg leading-8 text-secondary-600">
                    {service.description}
                  </p>
                  
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-secondary-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-secondary-900 mb-4">Benefits</h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <StarIcon className="h-5 w-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-secondary-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link href={service.cta.href} className="btn-primary">
                      {service.cta.text}
                    </Link>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative bg-secondary-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ServiceIcon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-secondary-900">{service.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* CTA Section */}
      <section className="section bg-primary-600">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-white">Ready to Get Started?</h2>
            <p className="mt-6 text-lg leading-8 text-primary-100">
              Contact us to discuss how our AI governance services can help your organization 
              implement responsible AI practices.
            </p>
            <div className="mt-8">
              <Link href="/contact" className="btn-secondary">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Icon components
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  )
}

function ServiceIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export const getStaticProps: GetStaticProps<ServicesProps> = async () => {
  const services: Service[] = [
    {
      id: 'assessment',
      title: 'AI Risk Assessment',
      description: 'Comprehensive evaluation of AI systems to identify potential risks, biases, and compliance issues before deployment. Our expert team conducts thorough assessments using industry-standard frameworks and methodologies.',
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
      }
    },
    {
      id: 'policy',
      title: 'Policy Development',
      description: 'Collaborate with our policy experts to develop comprehensive AI governance frameworks tailored to your industry and organizational needs. We work with governments, enterprises, and institutions worldwide.',
      features: [
        'Custom policy framework development',
        'Industry-specific regulatory guidance',
        'Stakeholder consultation and engagement',
        'Implementation roadmap creation',
        'Ongoing policy maintenance and updates',
        'Cross-jurisdictional compliance support'
      ],
      benefits: [
        'Clear governance structure for AI initiatives',
        'Reduced legal and reputational risks',
        'Alignment with emerging regulations',
        'Stakeholder buy-in and support',
        'Competitive advantage through proactive compliance'
      ],
      cta: {
        text: 'Start Policy Development',
        href: '/contact?service=policy'
      }
    },
    {
      id: 'consulting',
      title: 'AI Governance Consulting',
      description: 'Strategic consulting services to help organizations navigate the complex landscape of AI regulation and implement best practices for responsible AI development and deployment.',
      features: [
        'Strategic AI governance planning',
        'Organizational readiness assessment',
        'Change management support',
        'Stakeholder training and education',
        'Compliance monitoring and reporting',
        'Crisis management and response planning'
      ],
      benefits: [
        'Expert guidance from industry leaders',
        'Accelerated compliance implementation',
        'Reduced operational risks',
        'Enhanced organizational capabilities',
        'Long-term strategic advantage'
      ],
      cta: {
        text: 'Schedule Consultation',
        href: '/contact?service=consulting'
      }
    },
    {
      id: 'education',
      title: 'Education & Training',
      description: 'Comprehensive education programs designed to build AI literacy and governance capabilities across your organization. From executive briefings to technical training, we cover all levels.',
      features: [
        'Executive AI governance workshops',
        'Technical team training programs',
        'Custom curriculum development',
        'Certification programs',
        'Online learning platforms',
        'Ongoing education support'
      ],
      benefits: [
        'Improved organizational AI literacy',
        'Better risk management capabilities',
        'Enhanced decision-making processes',
        'Stronger compliance culture',
        'Competitive talent development'
      ],
      cta: {
        text: 'Explore Training Programs',
        href: '/contact?service=education'
      }
    }
  ]

  return {
    props: {
      services,
    },
    revalidate: 86400, // Revalidate once per day
  }
} 