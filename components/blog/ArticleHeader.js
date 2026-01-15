import Link from 'next/link'
import Image from 'next/image'

/**
 * Article header component - Server component
 * Displays title, excerpt, author info, and featured image
 */
export default function ArticleHeader({ post }) {
  const publishDate = new Date(post.publishedAt || post.createdAt)
  
  // Format date like Medium (e.g., "Jan 15, 2026")
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <header className="bg-white">
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-[680px] mx-auto">
          {/* Title - Medium style: Large, bold, sans-serif */}
          <h1 className="text-[2.5rem] md:text-[2.75rem] lg:text-[3rem] font-bold text-[rgb(41,41,41)] mb-3 leading-[1.08] tracking-[-0.022em]" 
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif' }}>
            {post.title}
          </h1>

          {/* Subtitle/Excerpt - Medium style: Lighter gray, serif */}
          <h2 className="text-[1.25rem] md:text-[1.375rem] text-[rgb(107,107,107)] mb-8 leading-[1.4] font-normal"
              style={{ fontFamily: 'Charter, Georgia, Cambria, "Times New Roman", serif' }}>
            {post.excerpt}
          </h2>

          {/* Author Info - Medium style: Minimalist */}
          <div className="flex items-center gap-3 py-6 border-t border-b border-gray-200">
            <Link 
              href={`/blog/author/${encodeURIComponent(post.author)}`}
              className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-300 transition-colors overflow-hidden"
            >
              {post.authorPhotoURL ? (
                <Image
                  src={post.authorPhotoURL}
                  alt={post.author}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-700 font-medium text-base">
                  {post.author.charAt(0).toUpperCase()}
                </span>
              )}
            </Link>
            <div className="flex-1 min-w-0">
              <Link 
                href={`/blog/author/${encodeURIComponent(post.author)}`}
                className="font-normal text-[rgb(41,41,41)] text-sm mb-0.5 hover:text-gray-700 transition-colors inline-block"
              >
                {post.author}
              </Link>
              <div className="flex items-center gap-2 text-sm text-[rgb(107,107,107)] flex-wrap">
                <time dateTime={publishDate.toISOString()}>
                  {formatDate(publishDate)}
                </time>
                <span>·</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image - Medium style: Max 680px width, centered */}
      {post.featuredImage && (
        <div className="container-custom pb-8 md:pb-12">
          <div className="max-w-[680px] mx-auto">
            <figure className="mb-0">
              <Image 
                src={post.featuredImage} 
                alt={post.title}
                width={680}
                height={383}
                priority
                fetchPriority="high"
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 680px"
              />
            </figure>
          </div>
        </div>
      )}
    </header>
  )
}
