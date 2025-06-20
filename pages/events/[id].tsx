import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SEO from '../../components/SEO'
import { Event } from '../../types'
import { getAllEvents, getEventById } from '../../lib/api'
import { generateEventStructuredData } from '../../lib/seo'

interface EventPageProps {
  event: Event
}

export default function EventPage({ event }: EventPageProps) {
  const startDate = new Date(event.startDate)
  const endDate = event.endDate ? new Date(event.endDate) : null
  const isMultiDay = endDate && endDate.getTime() !== startDate.getTime()
  const isPast = startDate < new Date()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <>
      <SEO
        title={event.seoTitle || event.title}
        description={event.seoDescription || event.description}
        keywords={event.tags}
        canonicalUrl={`/events/${event.id}`}
        ogType="article"
        structuredData={generateEventStructuredData(event)}
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
                  <Link href="/events" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                    Events
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-gray-500" aria-current="page">
                    {event.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-x-4 text-xs mb-4">
              <time dateTime={event.startDate} className="text-gray-500">
                {formatDate(startDate)}
                {isMultiDay && endDate && ` - ${formatDate(endDate)}`}
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
            
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {event.title}
            </h1>
            
            <p className="mt-6 text-xl leading-8 text-gray-600">
              {event.description}
            </p>
          </div>

          {/* Event Image */}
          {event.imageUrl && (
            <div className="mb-8">
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mb-12">
            <div className="lg:col-span-2">
              {/* Event Content */}
              {event.content && (
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />
              )}

              {/* Agenda */}
              {event.agenda && event.agenda.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Agenda</h2>
                  <div className="space-y-4">
                    {event.agenda.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center justify-center h-8 w-16 rounded-md bg-blue-100 text-sm font-medium text-blue-800">
                            {item.time}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.speaker}</p>
                          {item.description && (
                            <p className="mt-1 text-sm text-gray-700">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Speakers */}
              {event.speakers && event.speakers.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Speakers</h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {event.speakers.map((speaker, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-800">
                            {speaker.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{speaker}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
                  
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatDate(startDate)}
                        {isMultiDay && endDate && (
                          <>
                            <br />
                            to {formatDate(endDate)}
                          </>
                        )}
                      </dd>
                    </div>
                    
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Time</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatTime(startDate)}
                        {endDate && !isMultiDay && ` - ${formatTime(endDate)}`}
                      </dd>
                    </div>
                    
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Location</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {event.venue && <div className="font-medium">{event.venue}</div>}
                        {event.location}
                      </dd>
                    </div>
                    
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Event Type</dt>
                      <dd className="mt-1 text-sm text-gray-900">{event.eventType}</dd>
                    </div>
                    
                    {event.capacity && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Capacity</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {event.currentAttendees || 0} / {event.capacity} registered
                        </dd>
                      </div>
                    )}

                    {event.pricing && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Registration</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {event.pricing.free ? 'Free' : (
                            <>
                              {event.pricing.standardPrice && `$${event.pricing.standardPrice}`}
                              {event.pricing.memberPrice && event.pricing.standardPrice && ' / '}
                              {event.pricing.memberPrice && `$${event.pricing.memberPrice} (Members)`}
                            </>
                          )}
                        </dd>
                      </div>
                    )}
                  </dl>

                  {/* Registration Button */}
                  {!isPast && event.registrationUrl && (
                    <div className="mt-6">
                      <Link
                        href={event.registrationUrl}
                        className="w-full flex justify-center items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        Register Now
                      </Link>
                    </div>
                  )}

                  {/* Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="mt-6">
                      <dt className="text-sm font-medium text-gray-500 mb-2">Tags</dt>
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Back to Events */}
          <div className="mt-12">
            <Link
              href="/events"
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const events = await getAllEvents()
    
    const paths = events.map((event) => ({
      params: { id: event.id }
    }))

    return {
      paths,
      fallback: 'blocking' // Enable ISR for new events
    }
  } catch (error) {
    console.error('Error generating event paths:', error)
    
    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const eventId = params?.id as string
    const event = await getEventById(eventId)

    if (!event) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        event
      },
      revalidate: 60 // ISR: Revalidate every 60 seconds
    }
  } catch (error) {
    console.error('Error fetching event:', error)
    
    return {
      notFound: true
    }
  }
} 