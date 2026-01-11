import Link from 'next/link'
import Image from 'next/image'

/**
 * Article header component - Server component
 * Displays title, excerpt, author info, and featured image
 */
export default function ArticleHeader({ post }) {
  const publishDate = new Date(post.publishedAt || post.createdAt)
  
  // Calculate relative time
  const getRelativeTime = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000)
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    }
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit)
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`
      }
    }
    return 'Just now'
  }

  return (
    <header className="bg-white">
      <div className="container-custom py-12 md:py-16">
        <div className="max-w-[680px] mx-auto">
          {/* Category Badge - Subtle */}
          <Link 
            href={`/blog?category=${encodeURIComponent(post.category)}`}
            className="inline-block mb-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {post.category}
          </Link>

          {/* Title - Editorial sizing */}
          <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt - Larger, more breathable */}
          <p className="text-xl md:text-[1.375rem] text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Info - Clean, no gradients */}
          <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
            <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-lg">
                {post.author.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">{post.author}</p>
              <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                <time dateTime={publishDate.toISOString()}>
                  {getRelativeTime(publishDate)}
                </time>
                <span>·</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image - Editorial treatment */}
      {post.featuredImage && (
        <div className="container-custom">
          <div className="max-w-[1000px] mx-auto mb-12">
            <figure>
              <Image 
                src={post.featuredImage} 
                alt={post.title}
                width={1000}
                height={563}
                priority
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 1000px"
              />
            </figure>
          </div>
        </div>
      )}
    </header>
  )
}
