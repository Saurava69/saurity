import { db } from '@/lib/firebase/config'
import { collection, query, where, getDocs } from 'firebase/firestore'

async function getPublishedPosts() {
  try {
    const q = query(
      collection(db, 'blogPosts'),
      where('status', '==', 'published')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        slug: data.slug,
        updatedAt: data.updatedAt?.toDate() || data.createdAt?.toDate() || new Date(),
      }
    })
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error)
    return []
  }
}

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

  // Get all published blog posts
  const posts = await getPublishedPosts()
  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
