// Реальные интеграции с email сервисами
// Поддерживает бесплатные планы популярных сервисов

export class EmailServices {
  
  // 🆓 ConvertKit - до 1,000 подписчиков бесплатно
  static async addToConvertKit(email: string, options?: {
    formId?: string
    apiKey?: string
    firstName?: string
    tags?: string[]
  }) {
    const apiKey = options?.apiKey || process.env.CONVERTKIT_API_KEY
    const formId = options?.formId || process.env.CONVERTKIT_FORM_ID
    
    if (!apiKey || !formId) {
      console.log('ConvertKit: API ключ или Form ID не настроены')
      return false
    }

    try {
      const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          api_key: apiKey,
          email: email,
          first_name: options?.firstName || '',
          tags: options?.tags || []
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`✅ ConvertKit: ${email} добавлен успешно`)
        return data
      } else {
        console.error('ConvertKit ошибка:', await response.text())
        return false
      }
    } catch (error) {
      console.error('ConvertKit ошибка:', error)
      return false
    }
  }

  // 🆓 MailerLite - до 1,000 подписчиков бесплатно
  static async addToMailerLite(email: string, options?: {
    apiKey?: string
    groupId?: string
    firstName?: string
  }) {
    const apiKey = options?.apiKey || process.env.MAILERLITE_API_KEY
    const groupId = options?.groupId || process.env.MAILERLITE_GROUP_ID
    
    if (!apiKey) {
      console.log('MailerLite: API ключ не настроен')
      return false
    }

    try {
      const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': apiKey
        },
        body: JSON.stringify({
          email: email,
          name: options?.firstName || '',
          groups: groupId ? [groupId] : []
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`✅ MailerLite: ${email} добавлен успешно`)
        return data
      } else {
        console.error('MailerLite ошибка:', await response.text())
        return false
      }
    } catch (error) {
      console.error('MailerLite ошибка:', error)
      return false
    }
  }

  // 🆓 Brevo (ex-Sendinblue) - 300 писем в день бесплатно
  static async addToBrevo(email: string, options?: {
    apiKey?: string
    listId?: number
    firstName?: string
    attributes?: Record<string, string | number | boolean>
  }) {
    const apiKey = options?.apiKey || process.env.BREVO_API_KEY
    const listId = options?.listId || parseInt(process.env.BREVO_LIST_ID || '0')
    
    if (!apiKey) {
      console.log('Brevo: API ключ не настроен')
      return false
    }

    try {
      const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey
        },
        body: JSON.stringify({
          email: email,
          attributes: {
            FIRSTNAME: options?.firstName || '',
            ...options?.attributes
          },
          listIds: listId ? [listId] : [],
          updateEnabled: true
        })
      })

      if (response.ok || response.status === 204) {
        console.log(`✅ Brevo: ${email} добавлен успешно`)
        return true
      } else {
        console.error('Brevo ошибка:', await response.text())
        return false
      }
    } catch (error) {
      console.error('Brevo ошибка:', error)
      return false
    }
  }

  // 💰 Mailchimp - до 500 контактов бесплатно
  static async addToMailchimp(email: string, options?: {
    apiKey?: string
    listId?: string
    firstName?: string
    lastName?: string
    tags?: string[]
  }) {
    const apiKey = options?.apiKey || process.env.MAILCHIMP_API_KEY
    const listId = options?.listId || process.env.MAILCHIMP_LIST_ID
    
    if (!apiKey || !listId) {
      console.log('Mailchimp: API ключ или List ID не настроены')
      return false
    }

    // Определяем дата-центр из API ключа
    const datacenter = apiKey.split('-')[1]
    
    try {
      const response = await fetch(`https://${datacenter}.api.mailchimp.com/3.0/lists/${listId}/members`, {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: options?.firstName || '',
            LNAME: options?.lastName || ''
          },
          tags: options?.tags || []
        })
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`✅ Mailchimp: ${email} добавлен успешно`)
        return data
      } else {
        console.error('Mailchimp ошибка:', await response.text())
        return false
      }
    } catch (error) {
      console.error('Mailchimp ошибка:', error)
      return false
    }
  }

  // 🚀 Универсальная функция - пробует все доступные сервисы
  static async addToAnyService(email: string, options?: {
    firstName?: string
    source?: string
    preferredService?: 'convertkit' | 'mailerlite' | 'brevo' | 'mailchimp'
  }) {
    const services = [
      options?.preferredService || 'convertkit',
      'mailerlite',
      'brevo',
      'mailchimp'
    ].filter((service, index, arr) => arr.indexOf(service) === index) // убираем дубликаты

    for (const service of services) {
      let result = false
      
      switch (service) {
        case 'convertkit':
          result = await this.addToConvertKit(email, options)
          break
        case 'mailerlite':
          result = await this.addToMailerLite(email, options)
          break
        case 'brevo':
          result = await this.addToBrevo(email, options)
          break
        case 'mailchimp':
          result = await this.addToMailchimp(email, options)
          break
      }

      if (result) {
        console.log(`✅ Успешно добавлен в ${service}:`, email)
        return { service, success: true, data: result }
      }
    }

    console.log(`❌ Не удалось добавить в ни один сервис:`, email)
    return { service: null, success: false, data: null }
  }
}

// Настройки для быстрого старта
export const EMAIL_SERVICE_CONFIG = {
  // Рекомендуемые бесплатные сервисы
  recommended: {
    convertkit: {
      name: 'ConvertKit',
      freeLimit: '1,000 подписчиков',
      features: ['Неограниченные письма', 'Автоматизация', 'Формы']
    },
    mailerlite: {
      name: 'MailerLite', 
      freeLimit: '1,000 подписчиков',
      features: ['12,000 писем/месяц', 'Красивые шаблоны', 'Без брендинга']
    },
    brevo: {
      name: 'Brevo',
      freeLimit: '300 писем/день',
      features: ['Неограниченные контакты', 'SMS', 'CRM']
    }
  },
  
  // Переменные окружения которые нужно настроить
  envVars: {
    convertkit: ['CONVERTKIT_API_KEY', 'CONVERTKIT_FORM_ID'],
    mailerlite: ['MAILERLITE_API_KEY', 'MAILERLITE_GROUP_ID'],
    brevo: ['BREVO_API_KEY', 'BREVO_LIST_ID'],
    mailchimp: ['MAILCHIMP_API_KEY', 'MAILCHIMP_LIST_ID']
  }
} 