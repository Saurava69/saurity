export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Schema generators for different page types
export function generateSoftwareSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Saurity',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'WordPress',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '250',
    },
    description: 'Enterprise WordPress security plugin with smart rate limiting, advanced firewall, honeypot detection, and zero false positives. Production-ready with 3-tier emergency recovery.',
    softwareVersion: '1.0.0',
    author: {
      '@type': 'Organization',
      name: 'Saurity',
      url: 'https://www.saurity.com',
    },
    downloadUrl: 'https://github.com/saurity/saurity/releases',
    screenshot: 'https://www.saurity.com/HomePage1200_600.webp',
    softwareRequirements: 'WordPress 6.0+, PHP 8.0+, MySQL 5.7+',
    featureList: [
      'Smart Rate Limiting',
      'Advanced Firewall (SQL injection, XSS protection)',
      'IP Management with CIDR support',
      'Honeypot Bot Detection',
      'Tarpitting Attack Slowdown',
      'Subnet Blocking',
      'Activity Logging',
      'Email Notifications',
      '3-Tier Emergency Recovery'
    ],
  }
}

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateArticleSchema({ title, description, datePublished, dateModified, author, image }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author || 'Saurity Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Saurity',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.saurity.com/logo.png',
      },
    },
    image: image || 'https://www.saurity.com/og-image.jpg',
  }
}

export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Saurity',
    url: 'https://www.saurity.com',
    logo: 'https://www.saurity.com/logo.png',
    description: 'WordPress security plugin with zero admin lockout guarantee',
    sameAs: [
      'https://github.com/saurity/saurity',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'support@saurity.com',
    },
  }
}
