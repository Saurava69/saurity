'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * Blog Left Sidebar Component
 * Contains: Author card, social share, post stats, related topics
 */
export default function BlogSidebar({ post, relatedPosts = [] }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  // Calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = (scrolled / documentHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Control sidebar visibility - show only during article content (like ToC)
  useEffect(() => {
    const handleScroll = () => {
      // Target the article-content div specifically
      const articleContentDiv = document.querySelector('.article-content')
      const articleFooter = document.querySelector('article footer')
      
      if (!articleContentDiv) return

      const scrollY = window.scrollY + window.innerHeight / 2 // Middle of viewport
      
      // Get article content boundaries
      const contentRect = articleContentDiv.getBoundingClientRect()
      const contentTop = window.scrollY + contentRect.top
      const contentBottom = window.scrollY + contentRect.bottom
      
      // Start showing sidebar when article content enters viewport middle
      const showWhen = scrollY >= contentTop
      
      // Hide sidebar when article content exits viewport middle
      let hideWhen = scrollY >= contentBottom
      
      // Also hide if footer is visible
      if (articleFooter) {
        const footerRect = articleFooter.getBoundingClientRect()
        const footerTop = window.scrollY + footerRect.top
        hideWhen = hideWhen || (scrollY >= footerTop - 100)
      }
      
      // Show sidebar only when in the main content area
      setIsVisible(showWhen && !hideWhen)
    }

    // Initial check
    setTimeout(handleScroll, 200) // Small delay to ensure content is rendered
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Generate the full URL for the post
  const postUrl = `https://www.saurity.com/blog/${post.slug}`
  const encodedUrl = encodeURIComponent(postUrl)
  const encodedTitle = encodeURIComponent(post.title)

  // Share URLs for each platform
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  }

  // Handle share button clicks
  const handleShare = (platform) => {
    const width = 600
    const height = 400
    const left = (window.innerWidth - width) / 2
    const top = (window.innerHeight - height) / 2
    
    window.open(
      shareUrls[platform],
      'share',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes`
    )
  }

  const publishDate = new Date(post.publishedAt || post.createdAt)
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <aside 
      className={`hidden lg:block sticky top-20 w-64 space-y-6 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
        {/* Newsletter CTA (Optional) */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-slate-800">
            <h3 className="text-sm font-semibold mb-2">Stay Updated</h3>
             <p className="text-xs text-slate-600 mb-4">
                 Get the latest security insights and updates delivered to your inbox.
            </p>
            <Link
                href="/blog"
                className="inline-block text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
                Explore more articles →
            </Link>
        </div>
    
      {/* Quick Stats
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Stats
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Read Time</span>
            <span className="text-sm font-semibold text-gray-900">{post.readTime} min</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Category</span>
            <Link 
              href={`/blog?category=${encodeURIComponent(post.category)}`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              {post.category}
            </Link>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="pt-2 border-t border-blue-100">
              <span className="text-xs text-gray-600 block mb-2">Tags</span>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-white text-gray-700 rounded-full border border-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div> */}

      {/* Social Share - Vertical */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share Article
        </h3>
        <div className="flex flex-col gap-2">
          {/* Facebook */}
          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-[#1877F2] text-gray-700 hover:text-white transition-all duration-200 group"
            aria-label="Share on Facebook"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="text-sm font-medium">Facebook</span>
          </button>

          {/* Twitter/X */}
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-black text-gray-700 hover:text-white transition-all duration-200 group"
            aria-label="Share on X"
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-sm font-medium">X (Twitter)</span>
          </button>

          {/* LinkedIn */}
          <button
            onClick={() => handleShare('linkedin')}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-[#0A66C2] text-gray-700 hover:text-white transition-all duration-200 group"
            aria-label="Share on LinkedIn"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span className="text-sm font-medium">LinkedIn</span>
          </button>
          
          {/* WhatsApp */}
          <button
            onClick={() => handleShare('whatsapp')}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg bg-gray-50 hover:bg-[#25D366] text-gray-700 hover:text-white transition-all duration-200"
            aria-label="Share on WhatsApp"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.52 3.48A11.91 11.91 0 0012.04 0C5.4 0 .04 5.36.04 12c0 2.12.56 4.19 1.62 6.01L0 24l6.19-1.62A11.94 11.94 0 0012.04 24C18.68 24 24 18.64 24 12a11.9 11.9 0 00-3.48-8.52zM12.04 21.9c-1.95 0-3.86-.53-5.53-1.53l-.4-.24-3.68.96.98-3.58-.26-.41A9.87 9.87 0 012.1 12c0-5.45 4.48-9.9 9.94-9.9a9.88 9.88 0 016.99 2.9A9.82 9.82 0 0121.94 12c0 5.45-4.45 9.9-9.9 9.9zm5.44-7.41c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.2-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
            </svg>
            <span className="text-sm font-medium">WhatsApp</span>
          </button>

        </div>
      </div>

      {/* Related Posts Preview */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Related Reading
          </h3>
          <div className="space-y-3">
            {relatedPosts.slice(0, 2).map((relatedPost, index) => (
              <Link 
                key={index}
                href={`/blog/${relatedPost.slug}`}
                className="block group"
              >
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                  {relatedPost.title}
                </h4>
                <p className="text-xs text-gray-500">{relatedPost.readTime} min read</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
