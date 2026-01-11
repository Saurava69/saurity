'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * Extract headings from Tiptap JSON content
 * @param {string|object} content - Tiptap JSON content (string or object)
 * @returns {Array} Array of heading objects
 */
function extractHeadingsFromJSON(content) {
  try {
    const json = typeof content === 'string' ? JSON.parse(content) : content
    const headings = []

    function traverseNodes(nodes) {
      if (!nodes || !Array.isArray(nodes)) return

      nodes.forEach(node => {
        // Check if it's a heading node
        if (node.type === 'heading' && node.attrs?.level) {
          const level = node.attrs.level
          // Extract text from heading's content
          const text = extractTextFromNode(node)
          
          if (text) {
            const id = text
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, '')
              .replace(/[\s_-]+/g, '-')
              .replace(/^-+|-+$/g, '')
            
            headings.push({ level, text, id })
          }
        }

        // Recursively traverse child nodes
        if (node.content) {
          traverseNodes(node.content)
        }
      })
    }

    function extractTextFromNode(node) {
      let text = ''
      
      if (node.type === 'text') {
        text += node.text || ''
      }
      
      if (node.content && Array.isArray(node.content)) {
        node.content.forEach(child => {
          text += extractTextFromNode(child)
        })
      }
      
      return text
    }

    if (json && json.content) {
      traverseNodes(json.content)
    }

    return headings
  } catch (error) {
    console.error('Error extracting headings from JSON:', error)
    return []
  }
}

export default function TableOfContents({ content }) {
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const tocRef = useRef(null)
  const activeItemRef = useRef(null)

  useEffect(() => {
    // Extract headings from Tiptap JSON content
    const timer = setTimeout(() => {
      const extractedHeadings = extractHeadingsFromJSON(content)
      setHeadings(extractedHeadings)
    }, 100)

    return () => clearTimeout(timer)
  }, [content])

  useEffect(() => {
    // Track active heading based on scroll position
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%' }
    )

    const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean)
    headingElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [headings])

  // Control ToC visibility - show only during article content
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
      
      // Start showing ToC when article content enters viewport middle
      const showWhen = scrollY >= contentTop
      
      // Hide ToC when article content exits viewport middle
      let hideWhen = scrollY >= contentBottom
      
      // Also hide if footer is visible
      if (articleFooter) {
        const footerRect = articleFooter.getBoundingClientRect()
        const footerTop = window.scrollY + footerRect.top
        hideWhen = hideWhen || (scrollY >= footerTop - 100)
      }
      
      // Show ToC only when in the main content area
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

  // Auto-scroll the ToC to keep active item visible
  useEffect(() => {
    if (!activeId || !isVisible || !activeItemRef.current || !tocRef.current) {
      return
    }

    const tocContainer = tocRef.current
    const activeItem = activeItemRef.current
    
    const tocRect = tocContainer.getBoundingClientRect()
    const itemRect = activeItem.getBoundingClientRect()
    
    // Check if the active item is outside the visible area
    const isAbove = itemRect.top < tocRect.top
    const isBelow = itemRect.bottom > tocRect.bottom
    
    if (isAbove || isBelow) {
      // Scroll the active item into view with some padding
      const scrollOffset = activeItem.offsetTop - tocContainer.offsetTop - (tocContainer.clientHeight / 2) + (activeItem.clientHeight / 2)
      
      tocContainer.scrollTo({
        top: scrollOffset,
        behavior: 'smooth'
      })
    }
  }, [activeId, isVisible])

  if (headings.length === 0) return null

  const scrollToHeading = (id) => {
    const element = document.getElementById(id)
    if (element) {
      // Update URL hash
      window.history.pushState(null, '', `#${id}`)
      
      // Scroll to element with offset for fixed header
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav 
      className={`sticky top-24 bg-white border border-gray-200 rounded-lg p-6 shadow-sm transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h3>
      <div 
        ref={tocRef}
        className="space-y-2 max-h-[60vh] overflow-y-auto overflow-x-hidden"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#d1d5db #f3f4f6'
        }}
      >
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id
          return (
            <div
              key={index}
              ref={isActive ? activeItemRef : null}
              style={{ marginLeft: `${(heading.level - 2) * 16}px` }}
            >
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={`text-left text-sm hover:text-primary-600 transition-colors block w-full py-1 px-2 rounded ${
                  isActive
                    ? 'text-primary-600 font-semibold bg-primary-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {heading.text}
              </button>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
