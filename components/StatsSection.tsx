import React from 'react'

interface StatsSectionProps {
  stats: {
    policies: number
    organizations: number
    reports: number
    members: number
  }
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const statsData = [
    { name: 'AI Policies Developed', value: stats.policies.toLocaleString(), suffix: '+' },
    { name: 'Partner Organizations', value: stats.organizations.toLocaleString(), suffix: '+' },
    { name: 'Research Reports', value: stats.reports.toLocaleString(), suffix: '+' },
    { name: 'Community Members', value: stats.members.toLocaleString(), suffix: '+' },
  ]

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-secondary-900">
            Our Impact in Numbers
          </h2>
                     <p className="mt-6 text-lg leading-8 text-secondary-600">
             See how we&apos;re making a difference in the AI governance landscape worldwide.
           </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat) => (
              <div key={stat.name} className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-primary-600 lg:text-5xl">
                  {stat.value}{stat.suffix}
                </div>
                <div className="mt-2 text-base font-medium text-secondary-600 lg:text-lg">
                  {stat.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 