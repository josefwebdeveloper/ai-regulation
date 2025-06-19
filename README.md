# AI Regulation Association

A comprehensive Next.js 15+ TypeScript website for the AI Regulation Association, featuring modern design, SEO optimization, and advanced functionality for AI governance and policy development.

## 🌟 Features

### Architecture & Performance
- **Next.js 15.3.4** with TypeScript
- **Static Site Generation (SSG)** for core pages (Home, About, Services, Research)
- **Incremental Static Regeneration (ISR)** for News and Events (60-second revalidation)
- **Edge Functions** for form submissions and API routes
- **Tailwind CSS** for responsive, mobile-first design
- **SEO optimized** with meta tags, structured data, and canonical URLs

### Pages & Functionality
- **Home** (`/`) - Hero banner, three-column overview, impact stats, newsletter signup
- **About** (`/about`) - Mission, vision & values, founders gallery, legal structure
- **Services** (`/services`) - Risk Assessment, Policy Development, Consulting, Education
- **Research** (`/research`) - Featured reports grid and comprehensive archive table
- **News** (`/news`) - Article listings with ISR updates
- **Contact** (`/contact`) - Reactive form with validation using React Hook Form
- **API Routes** - Contact form handler (`/api/contact`) and newsletter subscription (`/api/newsletter`)

### Design & Accessibility
- **WCAG AA compliant** accessibility features
- **Mobile-first responsive design**
- **Beautiful, modern UI** with consistent branding
- **Loading states and error handling**
- **Smooth animations and transitions**
- **Professional color scheme** with primary and secondary palettes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-regulation-association
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
ai-regulation-association/
├── components/           # Reusable React components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   ├── HeroSection.tsx  # Hero banner component
│   ├── StatsSection.tsx # Impact statistics
│   ├── OverviewSection.tsx # Three-column overview
│   └── NewsletterSection.tsx # Newsletter signup
├── pages/               # Next.js pages (Pages Router)
│   ├── _app.tsx        # App wrapper
│   ├── _document.tsx   # HTML document structure
│   ├── index.tsx       # Home page
│   ├── about.tsx       # About page
│   ├── services.tsx    # Services page
│   ├── research.tsx    # Research page
│   ├── contact.tsx     # Contact page
│   ├── news/
│   │   └── index.tsx   # News listing page
│   └── api/            # API routes
│       ├── contact.ts  # Contact form handler (Edge Function)
│       └── newsletter.ts # Newsletter subscription
├── styles/
│   └── globals.css     # Global styles with Tailwind
├── public/             # Static assets
└── config files        # Next.js, TypeScript, Tailwind configs
```

## 🛠 Technologies Used

### Core Framework
- **Next.js 15.3.4** - React framework with SSG/ISR
- **TypeScript** - Type-safe development
- **React 19** - Latest React features

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Custom Design System** - Consistent components and utilities

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Built-in Validation** - Email, required fields, custom rules

### Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env.local` file for email configuration:

```env
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@ai-regulation-association.org
EMAIL_TO=contact@ai-regulation-association.org
```

### Tailwind Configuration
The project includes a custom Tailwind configuration with:
- Primary and secondary color palettes
- Custom fonts (Inter, JetBrains Mono)
- Animation utilities
- Component classes

## 📄 API Documentation

### Contact Form API (`/api/contact`)
- **Method**: POST
- **Runtime**: Edge Function
- **Body**: `{ name, email, subject, message }`
- **Validation**: Required fields, email format
- **Response**: Success/error messages

### Newsletter API (`/api/newsletter`)
- **Method**: POST
- **Body**: `{ email }`
- **Validation**: Email format
- **Response**: Subscription confirmation

## 🎨 Design System

### Colors
- **Primary**: Blue palette (#3b82f6 to #1e3a8a)
- **Secondary**: Gray palette (#f8fafc to #0f172a)
- **Success**: Green accents
- **Error**: Red accents

### Typography
- **Headings**: Inter font family
- **Body**: Inter font family
- **Code**: JetBrains Mono

### Components
- **Buttons**: Primary, secondary, outline variants
- **Cards**: Consistent shadow and border radius
- **Forms**: Styled inputs, textareas, validation states

## 🔒 Security Features

- **CSRF Protection** - Built into Next.js API routes
- **Input Validation** - Server-side validation for all forms
- **Security Headers** - X-Frame-Options, X-Content-Type-Options
- **Type Safety** - Full TypeScript coverage

## 📱 Responsive Design

- **Mobile-first approach**
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible grid system**
- **Touch-friendly interactions**

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Deploy automatically on push to main branch
3. Environment variables configured in Vercel dashboard

### Other Platforms
- **Netlify**: Supports Next.js SSG/ISR
- **AWS Amplify**: Full Next.js support
- **Self-hosted**: Use `npm run build && npm start`

## 🧪 Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow ESLint rules
- Use functional components with hooks
- Implement proper error boundaries

### Performance
- Use Next.js Image component for images
- Implement lazy loading where appropriate
- Optimize bundle size with dynamic imports
- Monitor Core Web Vitals

### SEO
- Include meta descriptions for all pages
- Use semantic HTML structure
- Implement JSON-LD structured data
- Optimize for Core Web Vitals

## 📞 Support

For questions about this implementation:
- Check the Next.js documentation
- Review Tailwind CSS docs
- Consult TypeScript handbook

## 📄 License

This project is created for demonstration purposes. Please ensure you have proper licensing for any production use.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
