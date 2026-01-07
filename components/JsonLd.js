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
      ratingValue: '4.9',
      ratingCount: '127',
    },
    description: 'WordPress login security and brute force protection with zero admin lockout guarantee.',
    softwareVersion: '0.1',
    author: {
      '@type': 'Organization',
      name: 'Saurity',
      url: 'https://saurity.com',
    },
    downloadUrl: 'https://github.com/saurity/saurity',
    screenshot: 'https://saurity.com/screenshots/dashboard.png',
    softwareRequirements: 'WordPress 6.0+, PHP 8.0+',
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
        url: 'https://saurity.com/logo.png',
      },
    },
    image: image || 'https://saurity.com/og-image.jpg',
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
    url: 'https://saurity.com',
    logo: 'https://saurity.com/logo.png',
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