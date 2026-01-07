# SAURITY WEBSITE - IMPLEMENTATION DOCUMENTATION

## Project Overview

This is the SEO-optimized marketing website for Saurity, a WordPress security plugin. Built with Next.js 14+ App Router and JavaScript (no TypeScript), focusing on performance, SEO, and technical accuracy.

## Tech Stack

- **Framework**: Next.js 14.1+ with App Router
- **Language**: JavaScript (ES2022+)
- **Styling**: Tailwind CSS v4
- **Fonts**: Inter (Google Fonts via next/font)
- **Build**: Turbopack (Next.js built-in)
- **Rendering**: Server Components (default) with Static Generation

## Project Structure

```
website/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with SEO metadata
│   ├── page.js                   # Homepage
│   ├── globals.css               # Global styles (Tailwind v4)
│   ├── robots.js                 # robots.txt generator
│   └── sitemap.js                # sitemap.xml generator
├── components/                   # React components
│   ├── Header.js                 # Site header with navigation
│   ├── Footer.js                 # Site footer with links
│   └── JsonLd.js                 # JSON-LD schema helpers
├── public/                       # Static assets
├── package.json                  # Dependencies
├── next.config.mjs               # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
└── postcss.config.mjs            # PostCSS configuration
```

## Current Implementation Status

### ✅ Completed

1. **Project Setup**
   - Next.js 14.1+ with App Router
   - Tailwind CSS v4 configuration
   - Custom color scheme and typography
   - Font optimization with Inter

2. **SEO Foundation**
   - Comprehensive metadata in root layout
   - Dynamic sitemap.xml generation
   - robots.txt configuration
   - Open Graph and Twitter Card support
   - JSON-LD structured data (Software, Organization, Breadcrumb, FAQ)

3. **Core Components**
   - Header with navigation
   - Footer with sitemap links
   - JsonLd component with schema generators
   - Reusable utility classes

4. **Homepage**
   - SEO-optimized with H1 and proper heading hierarchy
   - 8 major sections covering all key messaging
   - Schema markup (SoftwareApplication + Organization)
   - Internal linking to product pages
   - Clear CTAs throughout
   - "What we DON'T do" honesty section

5. **Technical SEO**
   - Canonical URLs
   - Meta descriptions (≤155 chars)
   - Title tags (≤60 chars)
   - Semantic HTML
   - Accessibility attributes
   - Mobile-first responsive design

### 🚧 To Be Implemented

1. **Product Pages**
   - `/wordpress-security` - Main security plugin page
   - `/login-security` - Login security deep dive
   - `/rate-limiting` - Rate limiting explanation
   - `/firewall` - Firewall features
   - `/zero-lockout-guarantee` - USP page
   - `/emergency-recovery` - Recovery guide
   - `/shared-hosting-compatible` - Shared hosting benefits

2. **Comparison Pages**
   - `/comparison/wordfence` - Saurity vs Wordfence
   - `/comparison/wp-cerber` - Saurity vs WP Cerber
   - `/comparison/ithemes` - Saurity vs iThemes Security

3. **Documentation**
   - `/docs` - Documentation hub
   - `/docs/installation` - Installation guide
   - `/docs/configuration` - Configuration guide
   - `/docs/troubleshooting` - Troubleshooting guide

4. **Blog System**
   - `/blog` - Blog index
   - `/blog/[slug]` - Dynamic blog posts
   - Pillar + cluster content model
   - MDX support for rich content

5. **Supporting Pages**
   - `/about` - About Saurity
   - `/philosophy` - Security philosophy
   - `/pricing` - Pricing page (free + future plans)
   - `/contact` - Contact form
   - `/privacy` - Privacy policy
   - `/terms` - Terms of service

## SEO Strategy

### Primary Keywords

1. **WordPress login security** (2,400/mo) - Homepage + `/login-security`
2. **WordPress security plugin** (8,100/mo) - `/wordpress-security`
3. **WordPress brute force protection** (720/mo) - `/login-security`
4. **WordPress rate limiting** (320/mo) - `/rate-limiting`
5. **WordPress firewall plugin** (880/mo) - `/firewall`

### Content Approach

- **Technical accuracy over marketing hype**
- **Honest about limitations**
- **Clear explanation of trade-offs**
- **No buzzwords** (AI-powered, military-grade, etc.)
- **Risk-based language** (fail-safe, predictable, reliable)

### Internal Linking Strategy

1. **Homepage** → Top 3-5 product pages
2. **Product pages** → Comparison pages, docs, blog posts
3. **Comparison pages** → Product pages, pricing
4. **Blog posts** → Relevant product pages (2-3 per post)
5. **Footer** → All major sections

## Performance Optimizations

### Implemented

- ✅ Server Components (default)
- ✅ Static Generation for all pages
- ✅ Optimized fonts (Inter with display: swap)
- ✅ Minimal JavaScript
- ✅ Tailwind CSS with purge
- ✅ Next.js Image optimization ready

### Targets

- **Lighthouse Performance**: ≥95
- **Lighthouse SEO**: 100
- **LCP**: <2.5s
- **CLS**: <0.1
- **FID**: <100ms

## Build & Deployment

### Development

```bash
cd website
npm run dev
```

Runs on `http://localhost:3000`

### Production Build

```bash
cd website
npm run build
npm run start
```

### Environment Variables (Future)

```env
NEXT_PUBLIC_SITE_URL=https://saurity.com
NEXT_PUBLIC_GITHUB_URL=https://github.com/saurity/saurity
```

## Component Documentation

### Header.js

Navigation header with:
- Logo (Saurity brand)
- Desktop navigation (6 links + Download CTA)
- Mobile menu button (placeholder)
- Sticky positioning

### Footer.js

Site footer with:
- 4 columns: Product, Comparisons, Resources, Company
- Copyright and legal links
- Consistent link structure for SEO

### JsonLd.js

Schema.org structured data helpers:
- `generateSoftwareSchema()` - For SoftwareApplication
- `generateBreadcrumbSchema(items)` - For breadcrumbs
- `generateArticleSchema(data)` - For blog posts
- `generateFAQSchema(faqs)` - For FAQ pages
- `generateOrganizationSchema()` - For Organization

## Styling Guidelines

### Color Palette

```javascript
primary: {
  600: '#0284c7', // Primary CTA color
  700: '#0369a1', // Hover state
}
security: {
  green: '#10b981', // Success/safe
  yellow: '#f59e0b', // Warning
  red: '#ef4444',   // Danger
}
```

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Semibold, tight tracking
- **Body**: Regular, 16px base

### Utility Classes

- `.container-custom` - Max-width container with padding
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.section-heading` - Section H2 style
- `.section-subheading` - Section subtitle
- `.feature-card` - Feature card with hover effect

## Content Guidelines

### Voice & Tone

- **Technical but accessible**
- **Honest and transparent**
- **No marketing exaggeration**
- **Security-engineer perspective**

### Writing Rules

✅ **Do**:
- Explain trade-offs clearly
- Use technical terms when appropriate
- Reference real security principles
- Acknowledge limitations
- Provide context

❌ **Don't**:
- Use buzzwords (AI-powered, military-grade)
- Make absolute claims (100% secure)
- Use fear tactics
- Exaggerate capabilities
- Hide limitations

## SEO Checklist (Per Page)

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

## Next Steps (Priority Order)

1. **Create `/login-security` page** (highest SEO value)
2. **Create `/wordpress-security` page** (high-volume keyword)
3. **Create `/comparison/wordfence` page** (competitive)
4. **Set up blog system with MDX**
5. **Create first 3 blog posts** (pillar content)
6. **Add actual images and optimize**
7. **Set up analytics** (privacy-friendly)
8. **Submit to Google Search Console**

## Known Issues & Notes

1. **ESLint warnings** - Apostrophes in JSX need escaping (low priority)
2. **Mobile menu** - Header has placeholder, needs implementation
3. **Images** - Using placeholders, need actual screenshots
4. **OG images** - Need to generate social share images
5. **Tailwind v4** - Using new @import syntax, monitor for updates

## Resources

- **SEO Strategy**: `/SEO_STRATEGY.md`
- **Plugin Docs**: `/README.md` and `/TODO.md`
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind v4 Docs**: https://tailwindcss.com/docs

## Maintenance

### Regular Tasks

- **Monthly**: Update sitemap dates for changed pages
- **Quarterly**: Review keyword rankings
- **Quarterly**: Audit Core Web Vitals
- **As needed**: Fix broken links
- **As needed**: Update schema markup

### Performance Monitoring

- Use Google PageSpeed Insights
- Monitor Core Web Vitals in Search Console
- Check Lighthouse scores monthly
- Review build sizes after major changes

---

**Last Updated**: January 7, 2026
**Version**: 0.1.0
**Status**: Foundation complete, ready for page expansion