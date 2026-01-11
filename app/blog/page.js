import Link from 'next/link'
import { getPublishedPosts } from '@/lib/firebase/posts'
import CategoryFilter from '@/components/blog/CategoryFilter'
import BlogSearch from '@/components/blog/BlogSearch'
import { Suspense } from 'react'

/**
 * Generate metadata for SEO (Server-side)
 */
export async function generateMetadata({ searchParams }) {
  const params = await searchParams
  const category = params?.category || 'all'
  
  const title = category === 'all' 
    ? 'WordPress Security Blog | Saurity'
    : `${category} | WordPress Security Blog | Saurity`
  
  const description = category === 'all'
    ? 'Latest WordPress security insights, best practices, and industry updates. Learn how to keep your WordPress site secure with expert guides and tutorials.'
    : `Read the latest ${category} articles about WordPress security. Expert insights and practical guides to protect your WordPress site.`

  return {
    title,
    description,
    keywords: 'WordPress security, website security, security tips, vulnerabilities, WordPress plugins, web security, cybersecurity, security best practices',
    alternates: {
      canonical: 'https://saurity.com/blog',
    },
    openGraph: {
      type: 'website',
      url: 'https://saurity.com/blog',
      title,
      description,
      images: [
        {
          url: 'https://saurity.com/HomePage1200_600.webp',
          width: 1200,
          height: 600,
          alt: 'Saurity WordPress Security Blog',
        }
      ],
      siteName: 'Saurity',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://saurity.com/HomePage1200_600.webp'],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

/**
 * Enable ISR (Incremental Static Regeneration)
 * Regenerate page every 30 minutes
 */
export const revalidate = 1800

/**
 * Blog listing page - Server Component with ISR
 */
export default async function BlogPage({ searchParams }) {
  // Await searchParams in Next.js 15+
  const params = await searchParams
  const category = params?.category || 'all'
  
  // Fetch posts server-side
  const posts = await getPublishedPosts(category === 'all' ? null : category)
  
  // Generate JSON-LD structured data for blog listing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Saurity WordPress Security Blog',
    description: 'Latest WordPress security insights, best practices, and industry updates',
    url: 'https://saurity.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Saurity',
      logo: {
        '@type': 'ImageObject',
        url: 'https://saurity.com/logo.svg',
      },
    },
    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      '@id': `https://saurity.com/blog/${post.slug}`,
      headline: post.title,
      description: post.excerpt,
      url: `https://saurity.com/blog/${post.slug}`,
      datePublished: post.publishedAt || post.createdAt,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      image: post.featuredImage || 'https://saurity.com/logo.svg',
    })),
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              WordPress Security Blog
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Latest insights, best practices, and industry updates to keep your WordPress site secure.
            </p>
            <Link 
              href="/blog/write" 
              className="btn-primary inline-block"
            >
              Write a Post
            </Link>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-custom">
          <BlogSearch posts={posts} />
        </div>
      </section>

      {/* Category Filter - Client Component for interactivity */}
      <Suspense fallback={<div className="py-8 bg-white border-b border-gray-200" />}>
        <CategoryFilter />
      </Suspense>

      {/* Blog Posts Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {category === 'all' ? 'No posts yet' : `No posts in ${category}`}
                </h3>
                <p className="text-gray-600 mb-6">
                  {category === 'all' 
                    ? 'Be the first to contribute to our security blog!' 
                    : 'Try selecting a different category or write a new post.'}
                </p>
                <Link href="/blog/write" className="btn-primary inline-block">
                  Write a Post
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => {
                  const publishDate = new Date(post.publishedAt || post.createdAt)
                  return (
                    <Link 
                      key={post.id} 
                      href={`/blog/${post.slug}`}
                      className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {post.featuredImage && (
                        <div className="aspect-video bg-gray-100 overflow-hidden">
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {publishDate.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                              <span className="text-primary-600 font-medium">
                                {post.author?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <span>{post.author}</span>
                          </div>
                          <span>•</span>
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Contribute?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Share your WordPress security knowledge with our community. 
              All submissions are reviewed before publication.
            </p>
            <Link 
              href="/blog/write" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors"
            >
              Write a Post
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
