'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

// Static pages data for search
const staticPages = [
  {
    id: 'features',
    title: 'Features',
    excerpt: 'Smart Rate Limiting, Advanced Firewall, IP Management, Bot Detection, Email Notifications, Activity Logging',
    url: '/features',
    category: 'Product',
    keywords: ['security', 'firewall', 'rate limiting', 'brute force', 'login protection', 'ip blocking', 'honeypot', 'tarpitting']
  },
  {
    id: 'download',
    title: 'Download Saurity',
    excerpt: 'Download Saurity WordPress Security Plugin for free. Enterprise-grade protection with zero false positives.',
    url: '/download',
    category: 'Product',
    keywords: ['download', 'install', 'plugin', 'wordpress', 'free', 'github']
  },
  {
    id: 'changelog',
    title: 'Changelog',
    excerpt: 'Complete version history and updates for Saurity WordPress Security Plugin. Track new features and bug fixes.',
    url: '/changelog',
    category: 'Product',
    keywords: ['changelog', 'version', 'updates', 'release', 'history', 'bug fixes', '1.0', '1.1', '1.1.0', '1.1.1', '1.1.2', 'v1', 'v1.0', 'v1.1', 'v1.1.0', 'v1.1.1', 'v1.1.2', 'what\'s new', 'new version', 'latest version']
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    excerpt: 'Get answers to common questions about Saurity WordPress security plugin. Installation, configuration, and troubleshooting.',
    url: '/faq',
    category: 'Support',
    keywords: ['faq', 'help', 'questions', 'support', 'troubleshooting', 'lockout', 'recovery']
  },
  {
    id: 'about',
    title: 'About Saurity',
    excerpt: 'Learn about Saurity - the WordPress security plugin built for developers who demand reliability and performance.',
    url: '/about',
    category: 'Company',
    keywords: ['about', 'company', 'team', 'mission', 'story']
  },
  {
    id: 'contact',
    title: 'Contact Us',
    excerpt: 'Get in touch with the Saurity team. Support, feedback, and partnership inquiries.',
    url: '/contact',
    category: 'Support',
    keywords: ['contact', 'support', 'help', 'email', 'feedback']
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    excerpt: 'Saurity privacy policy. Learn how we handle and protect your data with GDPR compliance.',
    url: '/privacy',
    category: 'Legal',
    keywords: ['privacy', 'data', 'gdpr', 'policy', 'compliance']
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    excerpt: 'Terms of service for using Saurity WordPress security plugin and website.',
    url: '/terms',
    category: 'Legal',
    keywords: ['terms', 'service', 'legal', 'agreement', 'conditions']
  },
  {
    id: 'use-cases',
    title: 'Use Cases',
    excerpt: 'Discover how Saurity protects different WordPress sites - blogs, WooCommerce, membership sites, and more.',
    url: '/use-cases',
    category: 'Product',
    keywords: ['use cases', 'examples', 'woocommerce', 'membership', 'blog', 'ecommerce']
  },
  {
    id: 'login-security',
    title: 'Login Security',
    excerpt: 'Protect your WordPress login with progressive rate limiting, honeypot detection, and timing analysis.',
    url: '/login-security',
    category: 'Features',
    keywords: ['login', 'brute force', 'password', 'authentication', 'rate limiting', 'lockout']
  },
  {
    id: 'firewall',
    title: 'WordPress Firewall',
    excerpt: 'Advanced firewall protection against SQL injection, XSS attacks, and malicious bots.',
    url: '/firewall',
    category: 'Features',
    keywords: ['firewall', 'sql injection', 'xss', 'security', 'waf', 'protection']
  },
  {
    id: 'rate-limiting',
    title: 'Rate Limiting',
    excerpt: 'Smart rate limiting for login, comments, XML-RPC, and POST requests with zero false positives.',
    url: '/rate-limiting',
    category: 'Features',
    keywords: ['rate limiting', 'throttle', 'dos', 'ddos', 'flood', 'spam']
  },
  {
    id: 'vs-wordfence',
    title: 'Saurity vs Wordfence',
    excerpt: 'Compare Saurity with Wordfence. See why Saurity offers better performance and zero false positives.',
    url: '/vs/wordfence',
    category: 'Comparison',
    keywords: ['wordfence', 'comparison', 'alternative', 'vs', 'better']
  },
  {
    id: 'vs-sucuri',
    title: 'Saurity vs Sucuri',
    excerpt: 'Compare Saurity with Sucuri. Free vs paid, performance, and feature comparison.',
    url: '/vs/sucuri',
    category: 'Comparison',
    keywords: ['sucuri', 'comparison', 'alternative', 'vs', 'better']
  },
  {
    id: 'vs-ithemes',
    title: 'Saurity vs iThemes Security',
    excerpt: 'Compare Saurity with iThemes Security (Solid Security). Modern approach vs legacy solution.',
    url: '/vs/ithemes',
    category: 'Comparison',
    keywords: ['ithemes', 'solid security', 'comparison', 'alternative', 'vs']
  },
  {
    id: 'vs-all-in-one',
    title: 'Saurity vs All In One WP Security',
    excerpt: 'Compare Saurity with All In One WP Security. Professional protection vs basic security.',
    url: '/vs/all-in-one',
    category: 'Comparison',
    keywords: ['all in one', 'aios', 'comparison', 'alternative', 'vs']
  }
]

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
          const searchLower = searchQuery.toLowerCase()
          
          // Search static pages first
          const staticResults = staticPages.filter(page =>
            page.title.toLowerCase().includes(searchLower) ||
            page.excerpt.toLowerCase().includes(searchLower) ||
            page.category.toLowerCase().includes(searchLower) ||
            page.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
          ).map(page => ({
            ...page,
            isStatic: true
          }))
          
          // Search blog posts from Firebase
          const q = query(
            collection(db, 'blogPosts'),
            where('status', '==', 'published')
          )
          const snapshot = await getDocs(q)
          const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          
          // Filter posts based on search query
          const blogResults = posts.filter(post => 
            post.title?.toLowerCase().includes(searchLower) ||
            post.excerpt?.toLowerCase().includes(searchLower) ||
            post.category?.toLowerCase().includes(searchLower) ||
            post.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
            post.author?.toLowerCase().includes(searchLower)
          ).map(post => ({
            ...post,
            isStatic: false
          }))
          
          // Combine results - static pages first, then blog posts
          const combinedResults = [...staticResults, ...blogResults]
          setResults(combinedResults.slice(0, 10))
        } catch (error) {
          console.error('Search error:', error)
          // Still show static page results even if Firebase fails
          const searchLower = searchQuery.toLowerCase()
          const staticResults = staticPages.filter(page =>
            page.title.toLowerCase().includes(searchLower) ||
            page.excerpt.toLowerCase().includes(searchLower) ||
            page.category.toLowerCase().includes(searchLower) ||
            page.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
          ).map(page => ({
            ...page,
            isStatic: true
          }))
          setResults(staticResults.slice(0, 10))
        } finally {
          setLoading(false)
        }
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const handleResultClick = (result) => {
    if (result.isStatic) {
      router.push(result.url)
    } else {
      router.push(`/blog/${result.slug}`)
    }
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
              placeholder="Search pages and blog posts..."
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
              <p className="text-sm text-gray-500 mt-1">Search pages, features, and blog posts</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="divide-y divide-gray-100">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full p-4 hover:bg-gray-50 transition-colors text-left flex gap-3 group"
                >
                  {result.featuredImage && !result.isStatic && (
                    <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden bg-gray-100 relative">
                      <Image 
                        src={result.featuredImage} 
                        alt={result.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  {result.isStatic && (
                    <div className="flex-shrink-0 w-10 h-10 rounded bg-primary-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        result.isStatic 
                          ? 'text-green-700 bg-green-100' 
                          : 'text-primary-600 bg-primary-50'
                      }`}>
                        {result.category}
                      </span>
                      {!result.isStatic && result.readTime && (
                        <span className="text-xs text-gray-500">
                          {result.readTime} min read
                        </span>
                      )}
                      {result.isStatic && (
                        <span className="text-xs text-gray-500">
                          Page
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-1 line-clamp-1">
                      {highlightText(result.title, searchQuery)}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {highlightText(result.excerpt || '', searchQuery)}
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
