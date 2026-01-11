'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function BlogSearch({ posts }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef(null)
  const router = useRouter()

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Perform search
  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([])
        setShowResults(false)
        return
      }

      setIsSearching(true)
      setShowResults(true)

      const query = searchQuery.toLowerCase()
      const results = posts.filter(post => {
        const titleMatch = post.title.toLowerCase().includes(query)
        const excerptMatch = post.excerpt?.toLowerCase().includes(query)
        const categoryMatch = post.category.toLowerCase().includes(query)
        const tagsMatch = post.tags?.some(tag => tag.toLowerCase().includes(query))
        const authorMatch = post.author.toLowerCase().includes(query)
        
        return titleMatch || excerptMatch || categoryMatch || tagsMatch || authorMatch
      }).slice(0, 8) // Limit to 8 results

      setSearchResults(results)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery, posts])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results page or filter
      router.push(`/blog?search=${encodeURIComponent(searchQuery)}`)
      setShowResults(false)
    }
  }

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text
    
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={index} className="bg-yellow-200 text-gray-900">{part}</mark> : 
        part
    )
  }

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, categories, tags..."
            className="w-full px-5 py-3 pl-12 pr-12 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
          />
          
          {/* Search Icon */}
          <svg 
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setShowResults(false)
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && searchQuery.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
          {isSearching ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-3 text-gray-600 text-sm">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2">
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </div>
              {searchResults.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  onClick={() => setShowResults(false)}
                  className="block px-4 py-3 hover:bg-gray-50 border-b last:border-b-0 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {post.featuredImage && (
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                        {highlightMatch(post.title, searchQuery)}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {highlightMatch(post.excerpt || '', searchQuery)}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded-full font-medium">
                          {post.category}
                        </span>
                        <span>•</span>
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              
              {searchResults.length === 8 && (
                <div className="px-4 py-3 bg-gray-50 text-center border-t">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View all results for &ldquo;{searchQuery}&rdquo;
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600 font-medium mb-1">No results found</p>
              <p className="text-sm text-gray-500">
                Try different keywords or check spelling
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
