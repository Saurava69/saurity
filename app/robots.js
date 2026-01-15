export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/_next/', '/api/'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://www.saurity.com/sitemap.xml',
  }
}
