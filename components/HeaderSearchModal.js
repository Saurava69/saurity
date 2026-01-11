'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

export default function HeaderSearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef(null)
  const modalRef = useRef(null)

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  // Handle escape key and click outside
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Search function with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setLoading(true)
        try {
          const q = query(
            collection(db, 'blogPosts'),
            where('status', '==', 'published')
          )
          const snapshot = await getDocs(q)
          const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          
          // Filter posts based on search query
          const searchLower = searchQuery.toLowerCase()
          const filtered = posts.filter(post => 
            post.title?.toLowerCase().includes(searchLower) ||
            post.excerpt?.toLowerCase().includes(searchLower) ||
            post.category?.toLowerCase().includes(searchLower) ||
            post.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
            post.author?.toLowerCase().includes(searchLower)
          )
          
          setResults(filtered.slice(0, 8))
        } catch (error) {
          console.error('Search error:', error)
          setResults([])
        } finally {
          setLoading(false)
        }
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const handleResultClick = (slug) => {
    router.push(`/blog/${slug}`)
    onClose()
    setSearchQuery('')
    setResults([])
  }

  const highlightText = (text, query) => {
    if (!query.trim()) return text
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() 
        ? <mark key={index} className="bg-yellow-200 text-gray-900">{part}</mark>
        : part
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
      <div 
        ref={modalRef}
        className="w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
      >
        {/* Search Input */}
        <div className="relative p-4 border-b border-gray-200">
          <div className="relative">
            <svg 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search blog posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-base"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setResults([])
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600">Searching...</p>
            </div>
          )}

          {!loading && searchQuery.trim().length >= 2 && results.length === 0 && (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600">No results found for &quot;{searchQuery}&quot;</p>
              <p className="text-sm text-gray-500 mt-1">Try different keywords</p>
            </div>
          )}

          {!loading && searchQuery.trim().length < 2 && (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-gray-600">Start typing to search</p>
              <p className="text-sm text-gray-500 mt-1">Search across titles, categories, tags, and more</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="divide-y divide-gray-100">
              {results.map((post) => (
                <button
                  key={post.id}
                  onClick={() => handleResultClick(post.slug)}
                  className="w-full p-4 hover:bg-gray-50 transition-colors text-left flex gap-3 group"
                >
                  {post.featuredImage && (
                    <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden bg-gray-100">
                      <img 
                        src={post.featuredImage} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {post.readTime} min read
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1 line-clamp-1">
                      {highlightText(post.title, searchQuery)}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {highlightText(post.excerpt, searchQuery)}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-gray-400 group-hover:text-primary-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">ESC</kbd>
              to close
            </span>
          </div>
          <span>
            {results.length > 0 && `${results.length} result${results.length === 1 ? '' : 's'}`}
          </span>
        </div>
      </div>
    </div>
  )
}
