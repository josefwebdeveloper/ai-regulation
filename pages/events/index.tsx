import { GetStaticProps } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SEO from '../../components/SEO'
import { Event } from '../../types'
import { getAllEvents } from '../../lib/api'
import { generateOrganizationStructuredData } from '../../lib/seo'

interface EventsPageProps {
  events: Event[]
}

export default function EventsPage({ events }: EventsPageProps) {
  const upcomingEvents = events.filter(event => new Date(event.startDate) > new Date())
  const pastEvents = events.filter(event => new Date(event.startDate) <= new Date())

  return (
    <>
      <SEO
        title="Events"
        description="Join our upcoming events, workshops, and conferences on AI governance, policy development, and ethical AI practices."
        keywords={['AI events', 'conferences', 'workshops', 'AI governance', 'policy events']}
        canonicalUrl="/events"
        structuredData={generateOrganizationStructuredData()}
      />
      
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Events & Conferences
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Join our community of AI governance experts, policymakers, and industry leaders at our upcoming events.
            </p>
          </div>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Upcoming Events
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Past Events
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} isPast />
                ))}
              </div>
            </div>
          )}

          {/* No Events Message */}
          {events.length === 0 && (
            <div className="mx-auto mt-16 max-w-2xl text-center">
              <div className="rounded-lg bg-gray-50 px-6 py-8">
                <h3 className="text-lg font-semibold text-gray-900">No Events Scheduled</h3>
                <p className="mt-2 text-gray-600">
                  Stay tuned for upcoming events and conferences. Subscribe to our newsletter to be notified when new events are announced.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function EventCard({ event, isPast = false }: { event: Event; isPast?: boolean }) {
  const startDate = new Date(event.startDate)
  const endDate = event.endDate ? new Date(event.endDate) : null
  const isMultiDay = endDate && endDate.getTime() !== startDate.getTime()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <article className="flex flex-col items-start">
      <div className="relative w-full">
        <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              className="rounded-2xl object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-blue-200 flex items-center justify-center">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-blue-600">{event.eventType}</p>
              </div>
            </div>
          )}
        </div>
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <time dateTime={event.startDate} className="text-gray-500">
            {isMultiDay && endDate 
              ? `${formatTime(startDate)} - ${formatTime(endDate)}`
              : formatDate(startDate)
            }
          </time>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            {event.eventType}
          </span>
          {isPast && (
            <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              Past Event
            </span>
          )}
        </div>
        
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={`/events/${event.id}`}>
              <span className="absolute inset-0" />
              {event.title}
            </Link>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
            {event.description}
          </p>
        </div>
        
        <div className="mt-6 flex items-center gap-x-4">
          <div className="flex items-center gap-x-2 text-sm text-gray-500">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
          
          {event.capacity && event.currentAttendees && (
            <div className="flex items-center gap-x-2 text-sm text-gray-500">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              {event.currentAttendees}/{event.capacity}
            </div>
          )}
        </div>

        {!isPast && event.registrationUrl && (
          <div className="mt-6">
            <Link
              href={event.registrationUrl}
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Register Now
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const events = await getAllEvents()
    
    return {
      props: {
        events: events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      },
      revalidate: 60 // ISR: Revalidate every 60 seconds
    }
  } catch (error) {
    console.error('Error fetching events:', error)
    
    return {
      props: {
        events: []
      },
      revalidate: 60
    }
  }
} 