import Link from 'next/link'
import Image from 'next/image'
import { getPostsByAuthor } from '@/lib/firebase/posts'
import { notFound } from 'next/navigation'

/**
 * Generate metadata for SEO (Server-side)
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const author = decodeURIComponent(resolvedParams?.author || '')
  
  if (!author) {
    return {
      title: 'Author Not Found',
    }
  }

  const posts = await getPostsByAuthor(author)
  const postCount = posts.length

  const title = `${author} - WordPress Security Blog | Saurity`
  const description = `Read all ${postCount} article${postCount !== 1 ? 's' : ''} by ${author} on WordPress security, best practices, and industry insights.`

  return {
    title,
    description,
    keywords: `${author}, WordPress security, author posts, security articles, cybersecurity`,
    alternates: {
      canonical: `https://www.saurity.com/blog/author/${encodeURIComponent(author)}`,
    },
    openGraph: {
      type: 'profile',
      url: `https://www.saurity.com/blog/author/${encodeURIComponent(author)}`,
      title,
      description,
      images: [
        {
          url: 'https://www.saurity.com/HomePage1200_600.webp',
          width: 1200,
          height: 600,
          alt: `${author} - Saurity Author`,
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
 * Author page - Shows all posts by a specific author
 */
export default async function AuthorPage({ params }) {
  const resolvedParams = await params
  const author = decodeURIComponent(resolvedParams?.author || '')
  
  if (!author) {
    notFound()
  }

  // Fetch posts by this author
  const posts = await getPostsByAuthor(author)
  
  // Generate JSON-LD structured data for author page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: author,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.saurity.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://www.saurity.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: author,
          item: `https://www.saurity.com/blog/author/${encodeURIComponent(author)}`,
        },
      ],
    },
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Author Header */}
      <section className="bg-white border-b border-gray-200 py-12 md:py-16">
        <div className="max-w-[1192px] mx-auto px-6">
          <div className="max-w-[728px] mx-auto">
            {/* Back to blog link */}
            <Link 
              href="/blog" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>

            {/* Author Avatar */}
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6 overflow-hidden">
              {posts.length > 0 && posts[0].authorPhotoURL ? (
                <Image 
                  src={posts[0].authorPhotoURL} 
                  alt={author}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-700 font-medium text-2xl">
                  {author.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Author Name */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3" style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
              letterSpacing: '-0.022em',
              lineHeight: '1.08'
            }}>
              {author}
            </h1>

            {/* Post Count */}
            <p className="text-lg text-gray-600" style={{
              fontFamily: 'Charter, Georgia, Cambria, "Times New Roman", serif',
              lineHeight: '1.4'
            }}>
              {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
            </p>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1192px] mx-auto px-6">
          {posts.length === 0 ? (
            <div className="max-w-[728px] mx-auto text-center py-20">
              <h3 className="text-3xl font-bold text-gray-900 mb-3" style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
                letterSpacing: '-0.022em'
              }}>
                No posts yet
              </h3>
              <p className="text-lg text-gray-600 mb-8" style={{
                fontFamily: 'Charter, Georgia, Cambria, "Times New Roman", serif',
                lineHeight: '1.4'
              }}>
                This author hasn&apos;t published any articles yet.
              </p>
              <Link 
                href="/blog" 
                className="inline-block px-6 py-2.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Explore All Posts
              </Link>
            </div>
          ) : (
            <div className="space-y-12 md:space-y-16">
              {posts.map((post, index) => {
                const publishDate = new Date(post.publishedAt || post.createdAt)
                
                return (
                  <article 
                    key={post.id}
                    className="group"
                  >
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="block"
                    >
                      <div className="flex gap-6 md:gap-12 flex-col sm:flex-row">
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Date */}
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <time dateTime={post.publishedAt || post.createdAt}>
                              {publishDate.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </time>
                          </div>

                          {/* Title */}
                          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors" style={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
                            letterSpacing: '-0.022em',
                            lineHeight: '1.2'
                          }}>
                            {post.title}
                          </h2>

                          {/* Excerpt */}
                          <p className="text-base text-gray-600 mb-4 line-clamp-2" style={{
                            fontFamily: 'Charter, Georgia, Cambria, "Times New Roman", serif',
                            lineHeight: '1.4'
                          }}>
                            {post.excerpt}
                          </p>

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
                          <div className="w-full sm:w-[112px] md:w-[160px] sm:h-[112px] md:h-[160px] bg-gray-100 rounded overflow-hidden flex-shrink-0 relative">
                            <Image 
                              src={post.featuredImage} 
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 640px) 100vw, 160px"
                              priority={index < 3}
                            />
                          </div>
                        )}
                      </div>
                    </Link>

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
    </>
  )
}
