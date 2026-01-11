'use client'

import { useState, useEffect } from 'react'

/**
 * Reading progress bar - appears at top of page
 * Shows how far through the article the user has scrolled
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / height) * 100
      setProgress(Math.min(100, Math.max(0, progress)))
    }

    // Initial calculation
    updateProgress()

    // Update on scroll
    window.addEventListener('scroll', updateProgress, { passive: true })
    
    // Update on resize (content height might change)
    window.addEventListener('resize', updateProgress, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Reading progress"
    >
      <div 
        className="h-full bg-gray-900 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
