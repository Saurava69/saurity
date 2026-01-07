# Saurity Website - SEO-Optimized Next.js Site

> Marketing website for Saurity WordPress security plugin built with Next.js App Router, JavaScript, and Tailwind CSS v4.

## 🎯 Project Goals

- **SEO-First**: Rank competitively for WordPress security keywords
- **Performance**: Lighthouse 95+ scores, LCP < 2.5s
- **Trust**: Technical accuracy over marketing hype
- **Conversion**: Clear value proposition and CTAs

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
website/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with SEO metadata
│   ├── page.js                   # Homepage
│   ├── globals.css               # Global styles (Tailwind v4)
│   ├── robots.js                 # robots.txt generator
│   ├── sitemap.js                # sitemap.xml generator
│   └── login-security/           # Product pages
│       └── page.js
├── components/                   # Reusable React components
│   ├── Header.js                 # Site header
│   ├── Footer.js                 # Site footer
│   └── JsonLd.js                 # Schema.org helpers
├── public/                       # Static assets
├── package.json                  # Dependencies
├── next.config.mjs               # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
├── IMPLEMENTATION.md             # Technical documentation
└── README.md                     # This file
```

## ✅ Completed Pages

### Core Pages
- ✅ **Homepage** (`/`) - WordPress Login Security Without Admin Lockouts
- ✅ **Login Security** (`/login-security`) - Deep dive into login protection

### SEO Infrastructure
- ✅ Root layout with comprehensive metadata
- ✅ robots.txt generation
- ✅ sitemap.xml generation
- ✅ JSON-LD schema (Software, Organization, Breadcrumb, FAQ)
- ✅ Open Graph and Twitter Cards

### Components
- ✅ Header with navigation
- ✅ Footer with sitemap links
- ✅ JsonLd schema helpers

## 🚧 To Be Built

### Product Pages
- [ ] `/wordpress-security` - Main security plugin page
- [ ] `/rate-limiting` - Rate limiting explanation
- [ ] `/firewall` - Firewall features
- [ ] `/zero-lockout-guarantee` - USP page
- [ ] `/emergency-recovery` - Recovery guide
- [ ] `/shared-hosting-compatible` - Shared hosting benefits

### Comparison Pages
- [ ] `/comparison/wordfence` - Saurity vs Wordfence
- [ ] `/comparison/wp-cerber` - Saurity vs WP Cerber
- [ ] `/comparison/ithemes` - Saurity vs iThemes Security

### Documentation
- [ ] `/docs` - Documentation hub
- [ ] `/docs/installation` - Installation guide
- [ ] `/docs/configuration` - Configuration guide
- [ ] `/docs/troubleshooting` - Troubleshooting guide

### Blog
- [ ] `/blog` - Blog index
- [ ] `/blog/[slug]` - Dynamic blog posts
- [ ] MDX support for rich content

### Supporting Pages
- [ ] `/about` - About Saurity
- [ ] `/philosophy` - Security philosophy
- [ ] `/pricing` - Pricing page
- [ ] `/contact` - Contact form
- [ ] `/privacy` - Privacy policy
- [ ] `/terms` - Terms of service

## 🎨 Design System

### Colors

```javascript
primary: {
  50: '#f0f9ff',
  600: '#0284c7',  // Primary CTA
  700: '#0369a1',  // Hover
}

security: {
  green: '#10b981',  // Success
  yellow: '#f59e0b', // Warning
  red: '#ef4444',    // Danger
}
```

### Typography

- **Font**: Inter (Google Fonts)
- **Base Size**: 16px
- **Headings**: Semibold, tight tracking

### Utility Classes

- `.container-custom` - Max-width container
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.section-heading` - Section H2
- `.section-subheading` - Section subtitle
- `.feature-card` - Feature card with hover

## 📊 SEO Strategy

### Primary Keywords

1. **WordPress login security** (2,400/mo) - Homepage + `/login-security`
2. **WordPress security plugin** (8,100/mo) - `/wordpress-security`
3. **WordPress brute force protection** (720/mo) - `/login-security`
4. **WordPress rate limiting** (320/mo) - `/rate-limiting`
5. **WordPress firewall plugin** (880/mo) - `/firewall`

### Content Approach

- Technical accuracy over marketing hype
- Honest about limitations
- Clear trade-off explanations
- No buzzwords (AI-powered, military-grade)
- Risk-based language (fail-safe, predictable)

### Internal Linking

1. Homepage → Top 3-5 product pages
2. Product pages → Comparison pages, docs
3. Comparison pages → Product pages, pricing
4. Blog posts → Relevant product pages
5. Footer → All major sections

## 🏗️ Technical Stack

- **Framework**: Next.js 14.1+ (App Router)
- **Language**: JavaScript (no TypeScript)
- **Styling**: Tailwind CSS v4
- **Fonts**: Inter via next/font
- **Build**: Turbopack
- **Rendering**: Server Components + Static Generation

## ⚡ Performance

### Targets

- Lighthouse Performance: ≥95
- Lighthouse SEO: 100
- LCP: <2.5s
- CLS: <0.1
- FID: <100ms

### Optimizations

- ✅ Server Components by default
- ✅ Static Generation for all pages
- ✅ Optimized fonts (display: swap)
- ✅ Minimal JavaScript
- ✅ Tailwind CSS with purge
- ✅ Next.js Image optimization

## 📝 Content Guidelines

### Voice & Tone

- Technical but accessible
- Honest and transparent
- No marketing exaggeration
- Security-engineer perspective

### Writing Rules

✅ **Do**:
- Explain trade-offs clearly
- Use technical terms appropriately
- Reference real security principles
- Acknowledge limitations
- Provide context

❌ **Don't**:
- Use buzzwords (AI-powered, military-grade)
- Make absolute claims (100% secure)
- Use fear tactics
- Exaggerate capabilities
- Hide limitations

## 🔍 SEO Checklist (Per Page)

- [ ] Unique title tag (≤60 chars)
- [ ] Unique meta description (≤155 chars)
- [ ] One H1 with primary keyword
- [ ] Semantic heading hierarchy (H2, H3)
- [ ] Alt text on all images
- [ ] Internal links (3-5 per page)
- [ ] External authority links (1-2)
- [ ] Canonical URL
- [ ] Open Graph metadata
- [ ] Twitter Card metadata
- [ ] JSON-LD schema
- [ ] Mobile responsive
- [ ] Fast load time (<2.5s LCP)

## 🛠️ Development

### Adding a New Page

1. Create directory in `/app`
2. Add `page.js` with metadata export
3. Include JSON-LD schema
4. Add to sitemap.js
5. Link from relevant pages
6. Update IMPLEMENTATION.md

### Example Page Structure

```javascript
import JsonLd, { generateBreadcrumbSchema } from '@/components/JsonLd'

export const metadata = {
  title: 'Page Title (≤60 chars)',
  description: 'Page description (≤155 chars)',
  alternates: {
    canonical: 'https://saurity.com/page-url',
  },
}

export default function PageName() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      {/* Page content */}
    </>
  )
}
```

## 📦 Dependencies

```json
{
  "next": "^14.1.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "tailwindcss": "^3.4.1"
}
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
vercel
```

### Self-Hosted

```bash
npm run build
npm run start
```

### Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://saurity.com
NEXT_PUBLIC_GITHUB_URL=https://github.com/saurity/saurity
```

## 📈 Analytics Setup

1. Add privacy-friendly analytics (Plausible, Fathom)
2. Track Core Web Vitals
3. Monitor keyword rankings
4. Set up Google Search Console
5. Submit sitemap to Google

## 🐛 Known Issues

1. **ESLint warnings** - Apostrophes in JSX (low priority)
2. **Mobile menu** - Header has placeholder, needs implementation
3. **Images** - Using placeholders, need actual screenshots
4. **OG images** - Need to generate social share images

## 📚 Resources

- [SEO Strategy](../SEO_STRATEGY.md)
- [Implementation Docs](./IMPLEMENTATION.md)
- [Plugin README](../README.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind v4 Docs](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Follow the content guidelines
2. Maintain SEO best practices
3. Test all links
4. Verify build before committing
5. Update documentation

## 📄 License

GPL v2 or later (same as the Saurity plugin)

## 🎯 Next Steps (Priority Order)

1. Create `/rate-limiting` page
2. Create `/firewall` page  
3. Create `/wordpress-security` page
4. Create `/comparison/wordfence` page
5. Set up blog system with MDX
6. Add actual images and optimize
7. Create first 3 blog posts
8. Submit to Google Search Console

---

**Version**: 0.1.0  
**Status**: Foundation complete, ready for expansion  
**Last Updated**: January 7, 2026