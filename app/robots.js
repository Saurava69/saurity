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
    sitemap: 'https://saurity.com/sitemap.xml',
  }
}
