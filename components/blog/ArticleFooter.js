import Link from 'next/link'
import Image from 'next/image'
import SocialShare from './SocialShare'

/**
 * Article footer component - Server component
 * Displays tags, social sharing, author card, and related posts
 */
export default function ArticleFooter({ post, relatedPosts = [] }) {
  return (
    <footer className="bg-white">
      <div className="container-custom">
        <div className="max-w-[680px] mx-auto">
          {/* Tags - Clean design */}
          {post.tags && post.tags.length > 0 && (
            <div className="py-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Social Share Buttons */}
          <SocialShare post={post} />

          {/* Author Card - Editorial style (no gradients) */}
          <div className="py-8 border-t border-gray-200">
            <div className="flex items-start gap-4">
              <Link 
                href={`/blog/author/${encodeURIComponent(post.author)}`}
                className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-800 transition-colors overflow-hidden"
              >
                {post.authorPhotoURL ? (
                  <Image 
                    src={post.authorPhotoURL} 
                    alt={post.author}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold text-2xl">
                    {post.author.charAt(0).toUpperCase()}
                  </span>
                )}
              </Link>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  Written by
                </p>
                <Link 
                  href={`/blog/author/${encodeURIComponent(post.author)}`}
                  className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors inline-block mb-2"
                >
                  {post.author}
                </Link>
                <p className="text-gray-600 leading-relaxed">
                  {post.authorBio || 'Security expert and WordPress enthusiast sharing insights about web security best practices.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts - Editorial layout */}
      {relatedPosts.length > 0 && (
        <section className="py-12 md:py-16 border-t border-gray-200">
          <div className="container-custom">
            <div className="max-w-[1200px] mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                More on {post.category}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group"
                  >
                    {relatedPost.featuredImage && (
                      <div className="aspect-[3/2] bg-gray-100 mb-4 overflow-hidden">
                        <Image 
                          src={relatedPost.featuredImage} 
                          alt={relatedPost.title}
                          width={400}
                          height={267}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div>
                      <span className="inline-block text-xs text-gray-500 mb-2">
                        {relatedPost.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </footer>
  )
}
