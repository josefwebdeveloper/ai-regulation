# 📧 Настройка Email Сервисов

Ваш сайт готов к интеграции с популярными email сервисами. Вот пошаговые инструкции для бесплатных планов:

## 🆓 **Рекомендуемые бесплатные сервисы**

### **1. ConvertKit (Лучший выбор)**
- ✅ **1,000 подписчиков бесплатно**
- ✅ **Неограниченные письма**
- ✅ **Отличная автоматизация**
- ✅ **Простая интеграция**

### **2. MailerLite**
- ✅ **1,000 подписчиков бесплатно**
- ✅ **12,000 писем в месяц**
- ✅ **Красивые шаблоны**
- ✅ **Без брендинга сервиса**

### **3. Brevo (ex-Sendinblue)**
- ✅ **300 писем в день бесплатно**
- ✅ **Неограниченные контакты**
- ✅ **SMS + Email**

---

## 🚀 **Быстрая настройка ConvertKit (Рекомендуется)**

### **Шаг 1: Регистрация**
1. Идите на https://convertkit.com
2. Нажмите "Start free trial"
3. Создайте аккаунт (бесплатно до 1,000 подписчиков)

### **Шаг 2: Получение API ключа**
1. В ConvertKit перейдите в **Settings** → **Advanced**
2. Найдите **API Key** и скопируйте его
3. Пример: `your_api_key_here`

### **Шаг 3: Создание формы**
1. Перейдите в **Forms** → **Create Form**
2. Выберите любой шаблон
3. После создания найдите **Form ID** в URL или настройках
4. Пример: `1234567`

### **Шаг 4: Настройка переменных окружения**
Добавьте в Vercel (или в `.env.local` для разработки):

```bash
CONVERTKIT_API_KEY=your_api_key_here
CONVERTKIT_FORM_ID=1234567
```

### **Шаг 5: Настройка в Vercel**
1. Откройте https://vercel.com/dashboard
2. Выберите ваш проект `ai-regulation`
3. Перейдите в **Settings** → **Environment Variables**
4. Добавьте:
   - `CONVERTKIT_API_KEY` = `your_api_key_here`
   - `CONVERTKIT_FORM_ID` = `1234567`
5. Нажмите **Save**
6. Перейдите в **Deployments** и нажмите **Redeploy**

---

## 📧 **Альтернативная настройка MailerLite**

### **Шаг 1: Регистрация**
1. Идите на https://mailerlite.com
2. Создайте бесплатный аккаунт

### **Шаг 2: API ключ**
1. Перейдите в **Integrations** → **MailerLite API**
2. Скопируйте **API Key**

### **Шаг 3: Создание группы**
1. **Subscribers** → **Groups** → **Create Group**
2. Запомните **Group ID** (число в URL)

### **Шаг 4: Переменные окружения**
```bash
MAILERLITE_API_KEY=your_api_key_here
MAILERLITE_GROUP_ID=123456
```

---

## 🔧 **Проверка работы**

После настройки переменных окружения:

### **1. Тест через админ панель**
1. Откройте https://ai-regulation.vercel.app/admin/emails
2. Проверьте что появились новые подписки

### **2. Тест через форму**
1. Откройте https://ai-regulation.vercel.app
2. Прокрутите до секции Newsletter
3. Введите тестовый email
4. Проверьте что email появился в ConvertKit/MailerLite

### **3. Проверка логов**
1. В Vercel перейдите в **Functions** → **View Function Logs**
2. Найдите логи API `/api/newsletter`
3. Должны видеть: `✅ Email добавлен в convertkit`

---

## 💡 **Дополнительные возможности**

### **Автоматические письма**
После настройки в ConvertKit:
1. **Automations** → **Create Automation**
2. Trigger: "Subscribes to a form"
3. Выберите вашу форму
4. Добавьте "Send email" action
5. Создайте приветственное письмо

### **Сегментация подписчиков**
В коде уже есть поддержка тегов:
```javascript
// В ConvertKit можно добавлять теги
tags: ['website-signup', 'ai-regulation']
```

### **Сбор имени подписчика**
Можно расширить форму для сбора имени:
1. Добавить поле "Имя" в форму
2. Передавать в API: `firstName: "Имя пользователя"`

---

## ❓ **Часто задаваемые вопросы**

### **Q: Что если я превышу лимиты бесплатного плана?**
A: ConvertKit автоматически предложит перейти на платный план. MailerLite просто остановит отправку до следующего месяца.

### **Q: Можно ли использовать несколько сервисов одновременно?**
A: Да! Система автоматически попробует все настроенные сервисы.

### **Q: Как экспортировать email адреса?**
A: Используйте админ панель: https://ai-regulation.vercel.app/admin/emails

### **Q: Безопасно ли хранить API ключи в Vercel?**
A: Да, переменные окружения в Vercel зашифрованы и безопасны.

---

## 🎯 **Рекомендуемый план действий**

1. **Начните с ConvertKit** (лучший бесплатный план)
2. **Настройте переменные окружения** в Vercel
3. **Протестируйте** подписку через сайт
4. **Создайте приветственное письмо** в ConvertKit
5. **Мониторьте статистику** через админ панель

---

## 📞 **Поддержка**

Если что-то не работает:
1. Проверьте логи в Vercel Functions
2. Убедитесь что переменные окружения настроены
3. Проверьте что API ключи правильные
4. Перезапустите деплой в Vercel

**Готово!** Ваша система сбора email адресов полностью настроена! 🎉 