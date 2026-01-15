import Link from 'next/link'
import Image from 'next/image'
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
      canonical: 'https://www.saurity.com/blog',
    },
    openGraph: {
      type: 'website',
      url: 'https://www.saurity.com/blog',
      title,
      description,
      images: [
        {
          url: 'https://www.saurity.com/HomePage1200_600.webp',
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
      images: ['https://www.saurity.com/HomePage1200_600.webp'],
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
 * Medium-inspired design with clean typography and minimal layout
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
    url: 'https://www.saurity.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Saurity',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.saurity.com/logo.png',
      },
    },
    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      '@id': `https://www.saurity.com/blog/${post.slug}`,
      headline: post.title,
      description: post.excerpt,
      url: `https://www.saurity.com/blog/${post.slug}`,
      datePublished: post.publishedAt || post.createdAt,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      image: post.featuredImage || 'https://www.saurity.com/logo.png',
    })),
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section - Medium-style minimal header */}
      <section className="bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-[1192px] mx-auto px-6">
          <div className="max-w-[728px] mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4" style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
              letterSpacing: '-0.022em',
              lineHeight: '1.08'
            }}>
              WordPress Security
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8" style={{
              fontFamily: 'Charter, Georgia, Cambria, "Times New Roman", serif',
              lineHeight: '1.4'
            }}>
              Expert insights, best practices, and industry updates to keep your WordPress site secure.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section - Minimal design */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-[1192px] mx-auto px-6">
          <BlogSearch posts={posts} />
        </div>
      </section>

      {/* Category Filter - Medium-style tabs */}
      <Suspense fallback={<div className="py-4 bg-white border-b border-gray-100" />}>
        <CategoryFilter />
      </Suspense>

      {/* Blog Posts Section - Medium-style card layout */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1192px] mx-auto px-6">
          {posts.length === 0 ? (
            <div className="max-w-[728px] mx-auto text-center py-20">
              <h3 className="text-3xl font-bold text-gray-900 mb-3" style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
                letterSpacing: '-0.022em'
              }}>
                {category === 'all' ? 'No posts yet' : `No posts in ${category}`}
              </h3>
              <p className="text-lg text-gray-600 mb-8" style={{
                fontFamily: 'Charter, Georgia, Cambria, "Times New Roman", serif'
              }}>
                {category === 'all' 
                  ? 'Be the first to contribute to our security blog.' 
                  : 'Try selecting a different category or write a new post.'}
              </p>
              <Link 
                href="/blog/write" 
                className="inline-block px-6 py-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Write a Post
              </Link>
            </div>
          ) : (
            <div className="space-y-12 md:space-y-16">
              {posts.map((post, index) => {
                const publishDate = new Date(post.publishedAt || post.createdAt)
                const isLarge = index === 0 // First post is featured larger
                
                return (
                  <article 
                    key={post.id}
                    className="group"
                  >
                    <div className={`flex gap-6 md:gap-12 ${isLarge ? 'flex-col md:flex-row' : 'flex-col sm:flex-row'}`}>
                      {/* Content */}
                      <div className={`flex-1 min-w-0 ${isLarge ? '' : ''}`}>
                        {/* Author & Date */}
                        <div className="flex items-center gap-3 mb-3">
                          <Link 
                            href={`/blog/author/${encodeURIComponent(post.author)}`}
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0"
                          >
                            {post.authorPhotoURL ? (
                              <Image 
                                src={post.authorPhotoURL} 
                                alt={post.author}
                                width={24}
                                height={24}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-medium text-gray-600">
                                {post.author?.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </Link>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Link 
                              href={`/blog/author/${encodeURIComponent(post.author)}`}
                              className="font-medium hover:text-gray-900 transition-colors"
                            >
                              {post.author}
                            </Link>
                            <span>·</span>
                            <time dateTime={post.publishedAt || post.createdAt}>
                              {publishDate.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </time>
                          </div>
                        </div>

                        {/* Title */}
                        <Link href={`/blog/${post.slug}`}>
                          <h2 className={`font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors cursor-pointer ${
                            isLarge 
                              ? 'text-2xl md:text-3xl lg:text-4xl' 
                              : 'text-xl md:text-2xl'
                          }`} style={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
                            letterSpacing: '-0.022em',
                            lineHeight: '1.2'
                          }}>
                            {post.title}
                          </h2>
                        </Link>

                        {/* Excerpt */}
                        <Link href={`/blog/${post.slug}`}>
                          <p className={`text-gray-600 mb-4 cursor-pointer ${
                            isLarge ? 'text-base md:text-lg line-clamp-3' : 'text-base line-clamp-2'
                          }`} style={{
                            fontFamily: 'Charter, Georgia, Cambria, "Times New Roman", serif',
                            lineHeight: '1.4'
                          }}>
                            {post.excerpt}
                          </p>
                        </Link>

                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                            {post.category}
                          </span>
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>

                      {/* Featured Image */}
                      {post.featuredImage && (
                        <Link href={`/blog/${post.slug}`}>
                          <div className={`${
                            isLarge 
                              ? 'w-full md:w-[280px] lg:w-[360px] md:h-[200px] lg:h-[240px]' 
                              : 'w-full sm:w-[112px] md:w-[160px] sm:h-[112px] md:h-[160px]'
                          } bg-gray-100 rounded overflow-hidden flex-shrink-0 cursor-pointer relative`}>
                            <Image 
                              src={post.featuredImage} 
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes={isLarge ? "(max-width: 768px) 100vw, 360px" : "(max-width: 640px) 100vw, 160px"}
                              priority={index < 3}
                            />
                          </div>
                        </Link>
                      )}
                    </div>

                    {/* Divider */}
                    {index < posts.length - 1 && (
                      <hr className="mt-12 md:mt-16 border-gray-200" />
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Medium-style minimal */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-[728px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
            letterSpacing: '-0.022em'
          }}>
            Share Your Knowledge
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8" style={{
            fontFamily: 'Charter, Georgia, Cambria, "Times New Roman", serif',
            lineHeight: '1.4'
          }}>
            Contribute to our WordPress security community. All submissions are reviewed before publication.
          </p>
          <Link 
            href="/blog/write" 
            className="inline-block px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-base font-medium"
          >
            Write a Post
          </Link>
        </div>
      </section>
    </>
  )
}
