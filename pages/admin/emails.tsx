import React, { useState, useEffect } from 'react'
import Head from 'next/head'

interface EmailStats {
  stats: {
    total: number
    active: number
    unsubscribed: number
    bySource: Record<string, number>
  }
  recentSubscriptions: Array<{
    email: string
    timestamp: string
    source: string
  }>
  emailList: string[]
  totalEmails: number
}

export default function EmailsAdmin() {
  const [emailStats, setEmailStats] = useState<EmailStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEmailStats()
  }, [])

  const fetchEmailStats = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/email-stats')
      if (response.ok) {
        const data = await response.json()
        setEmailStats(data)
      } else {
        throw new Error('Failed to fetch email stats')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const copyEmailsToClipboard = () => {
    if (emailStats?.emailList) {
      const emailString = emailStats.emailList.join('\n')
      navigator.clipboard.writeText(emailString)
      alert('Email адреса скопированы в буфер обмена!')
    }
  }

  const exportAsCSV = () => {
    if (emailStats?.recentSubscriptions) {
      const csvContent = [
        'Email,Date,Source',
        ...emailStats.recentSubscriptions.map(sub => 
          `${sub.email},${new Date(sub.timestamp).toLocaleDateString()},${sub.source}`
        )
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'email-subscriptions.csv'
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>Email Statistics - Admin</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading email statistics...</p>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Email Statistics - Admin</title>
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-600 text-xl mb-4">❌ Error</div>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={fetchEmailStats}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Email Statistics - Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">📧 Email Subscriptions</h1>
            <p className="mt-2 text-gray-600">Manage and view email subscriptions</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-primary-600">{emailStats?.stats.total || 0}</div>
              <div className="text-gray-600">Total Subscriptions</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">{emailStats?.stats.active || 0}</div>
              <div className="text-gray-600">Active</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-red-600">{emailStats?.stats.unsubscribed || 0}</div>
              <div className="text-gray-600">Unsubscribed</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">{emailStats?.totalEmails || 0}</div>
              <div className="text-gray-600">Unique Emails</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sources Breakdown */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">📊 Sources</h2>
              {emailStats?.stats.bySource && Object.keys(emailStats.stats.bySource).length > 0 ? (
                <div className="space-y-2">
                  {Object.entries(emailStats.stats.bySource).map(([source, count]) => (
                    <div key={source} className="flex justify-between items-center">
                      <span className="text-gray-700 capitalize">{source}</span>
                      <span className="font-semibold text-primary-600">{count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No subscriptions yet</p>
              )}
            </div>

            {/* Actions */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">🛠️ Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={copyEmailsToClipboard}
                  className="w-full px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
                  disabled={!emailStats?.emailList?.length}
                >
                  📋 Copy All Emails
                </button>
                <button
                  onClick={exportAsCSV}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  disabled={!emailStats?.recentSubscriptions?.length}
                >
                  📥 Export as CSV
                </button>
                <button
                  onClick={fetchEmailStats}
                  className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  🔄 Refresh Data
                </button>
              </div>
            </div>
          </div>

          {/* Recent Subscriptions */}
          <div className="mt-8 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">📝 Recent Subscriptions</h2>
            </div>
            <div className="p-6">
              {emailStats?.recentSubscriptions && emailStats.recentSubscriptions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Source
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {emailStats.recentSubscriptions.map((subscription, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {subscription.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(subscription.timestamp).toLocaleDateString('ru-RU', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                            {subscription.source}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No subscriptions yet</p>
              )}
            </div>
          </div>

          {/* All Email List */}
          {emailStats?.emailList && emailStats.emailList.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">📧 All Email Addresses ({emailStats.emailList.length})</h2>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {emailStats.emailList.map((email, index) => (
                      <div key={index} className="text-sm text-gray-700 p-2 bg-white rounded border">
                        {email}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 