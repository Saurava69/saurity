import { getPublishedPosts } from '@/lib/firebase/posts'

export default async function sitemap() {
  const baseUrl = 'https://www.saurity.com'
  
  // Static pages
  const staticPages = [
    '',
    '/features',
    '/blog',
    '/use-cases',
    '/faq',
    '/about',
    '/contact',
    '/download',
    '/changelog',
    '/firewall',
    '/login-security',
    '/rate-limiting',
    '/vs/wordfence',
    '/vs/sucuri',
    '/vs/ithemes',
    '/vs/all-in-one',
    '/privacy',
    '/terms',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/blog' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : route === '/blog' ? 0.9 : 0.8,
  }))

  // Get all published blog posts using server-side Admin SDK
  const posts = await getPublishedPosts()
  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt || post.createdAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Also add author pages for better discoverability
  const uniqueAuthors = [...new Set(posts.map(post => post.author).filter(Boolean))]
  const authorPages = uniqueAuthors.map(author => ({
    url: `${baseUrl}/blog/author/${encodeURIComponent(author)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages, ...authorPages]
}
