'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import TiptapEditor from '@/components/blog/TiptapEditor'
import { checkSEO, generateSlug } from '@/lib/utils/seoChecker'
import { db } from '@/lib/firebase/config'
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'
import readingTime from 'reading-time'
import { handleImageUpload } from '@/lib/utils/imageUpload'

export default function WriteBlogPost() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Security Tips',
    tags: '',
    featuredImage: '',
    featuredImageAlt: '',
  })
  
  const [seoResults, setSeoResults] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [autoSlug, setAutoSlug] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const [uploadingFeaturedImage, setUploadingFeaturedImage] = useState(false)

  const categories = [
    'Security Tips',
    'Vulnerabilities',
    'Tutorials',
    'News & Updates',
    'Best Practices',
    'Case Studies',
    'WordPress Security',
    'Plugin Security',
    'Web Application Security'
  ]

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/blog/write')
    }
  }, [user, authLoading, router])

  const handleTitleChange = (e) => {
    const newTitle = e.target.value
    setFormData({ ...formData, title: newTitle })
    
    if (autoSlug) {
      setFormData(prev => ({ ...prev, title: newTitle, slug: generateSlug(newTitle) }))
    }
  }

  const handleSlugChange = (e) => {
    const newSlug = e.target.value
    setFormData({ ...formData, slug: newSlug })
    setAutoSlug(false)
  }

  // Strip HTML tags for plain text analysis (word count, reading time)
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  // Auto-check SEO when content changes
  useEffect(() => {
    if (formData.title && formData.excerpt && formData.content) {
      const timer = setTimeout(() => {
        // Pass HTML content directly to SEO checker - it now handles HTML
        const results = checkSEO(formData.title, formData.excerpt, formData.content, formData.slug)
        setSeoResults(results)
      }, 1000) // Debounce 1 second
      
      return () => clearTimeout(timer)
    } else {
      setSeoResults(null)
    }
  }, [formData.title, formData.excerpt, formData.content, formData.slug])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Check SEO score
      const plainContent = stripHtml(formData.content)
      const seo = checkSEO(formData.title, formData.excerpt, plainContent, formData.slug)
      const stats = readingTime(plainContent)

      // Parse tags
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      // Ensure unique slug
      let finalSlug = formData.slug || generateSlug(formData.title)
      const slugQuery = query(
        collection(db, 'blogPosts'),
        where('slug', '==', finalSlug)
      )
      const existingSlug = await getDocs(slugQuery)
      
      // If slug exists, add random suffix
      if (!existingSlug.empty) {
        const randomSuffix = Math.random().toString(36).substring(2, 8)
        finalSlug = `${finalSlug}-${randomSuffix}`
        console.log(`Duplicate slug detected! Using unique slug: ${finalSlug}`)
      }

      // Create blog post in Firestore
      const postData = {
        title: formData.title,
        slug: finalSlug,
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: tagsArray,
        featuredImage: formData.featuredImage || '',
        author: user.displayName || user.email,
        authorId: user.uid,
        authorEmail: user.email,
        readTime: Math.ceil(stats.minutes),
        wordCount: stats.words,
        seoScore: seo.score.overall,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      await addDoc(collection(db, 'blogPosts'), postData)

      setSubmitStatus({
        type: 'success',
        message: 'Your blog post has been submitted successfully! It will be reviewed by our team before publication.',
      })

      // Reset form
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'Security Tips',
        tags: '',
        featuredImage: '',
        featuredImageAlt: '',
      })
      setAutoSlug(true)
      setShowPreview(false)

    } catch (error) {
      console.error('Error submitting post:', error)
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred while submitting your post. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-12 border-b">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/blog" className="text-primary-600 hover:text-primary-700 mb-3 inline-flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Blog
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Write a Blog Post
                </h1>
              </div>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="btn-secondary text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {showPreview ? 'Edit' : 'Preview'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Editor/Preview Section */}
      <section className="py-8 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <div className="flex items-start gap-3">
                  <svg 
                    className={`w-6 h-6 flex-shrink-0 ${
                      submitStatus.type === 'success' ? 'text-green-600' : 'text-red-600'
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    {submitStatus.type === 'success' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    )}
                  </svg>
                  <p>{submitStatus.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_350px] gap-6">
              {/* Main Content Area */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {!showPreview ? (
                    <>
                      {/* Title Input - Large and Prominent */}
                      <div className="border-b border-gray-200 px-8 pt-8 pb-4">
                        <input
                          type="text"
                          id="title"
                          required
                          value={formData.title}
                          onChange={handleTitleChange}
                          className="w-full text-3xl md:text-4xl font-bold border-0 focus:ring-0 focus:outline-none placeholder-gray-300 px-0 py-2"
                          placeholder="Give your post a title..."
                        />
                      </div>

                      {/* Tiptap Editor */}
                      <div>
                        <TiptapEditor
                          value={formData.content}
                          onChange={(content) => setFormData({...formData, content})}
                          title={formData.title}
                          excerpt={formData.excerpt}
                        />
                      </div>
                    </>
                  ) : (
                    /* Preview Mode */
                    <div className="p-8 md:p-12">
                      {formData.featuredImage && (
                        <img 
                          src={formData.featuredImage} 
                          alt={formData.title}
                          className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
                        />
                      )}
                      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {formData.title || 'Untitled Post'}
                      </h1>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-8 pb-8 border-b">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {user.displayName || user.email}
                        </span>
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formData.content ? Math.ceil(readingTime(stripHtml(formData.content)).minutes) : 0} min read
                        </span>
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                          {formData.category}
                        </span>
                      </div>
                      {formData.excerpt && (
                        <p className="text-xl text-gray-600 mb-8 italic border-l-4 border-primary-500 pl-6">
                          {formData.excerpt}
                        </p>
                      )}
                      <div 
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-400 italic">Start writing to see your preview...</p>' }}
                      />
                      {formData.tags && (
                        <div className="mt-12 pt-8 border-t">
                          <div className="flex flex-wrap gap-2">
                            {formData.tags.split(',').map((tag, index) => (
                              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                #{tag.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar - Post Settings */}
              <div className="space-y-4">
                {/* Publish Card */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 sticky top-24">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Publish
                  </h3>
                

                  {/* SEO Score Display */}
                  {seoResults && (
                    <div className={`mb-4 p-4 rounded-lg border-2 ${
                      seoResults.score.overall >= 80 
                        ? 'bg-green-50 border-green-300' 
                        : seoResults.score.overall >= 60
                        ? 'bg-yellow-50 border-yellow-300'
                        : 'bg-red-50 border-red-300'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">SEO Score</span>
                        <span className={`text-2xl font-bold ${
                          seoResults.score.overall >= 80 
                            ? 'text-green-600' 
                            : seoResults.score.overall >= 60
                            ? 'text-yellow-600'
                            : 'text-red-600'
                        }`}>
                          {seoResults.score.overall}/100
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Grade: <strong>{seoResults.grade}</strong>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || (seoResults && seoResults.score.overall < 50)}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-center flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Submit for Review
                      </>
                    )}
                  </button>
                  
                  {seoResults && seoResults.score.overall < 50 && (
                    <p className="text-red-600 text-xs mt-2 flex items-start gap-1">
                      <span>⚠️</span>
                      <span>SEO score too low. Improve content before submitting.</span>
                    </p>
                  )}

                  <Link href="/blog" className="w-full btn-secondary text-center mt-3 block">
                    Cancel
                  </Link>
                </div>

                {/* Post Settings */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                        Excerpt *
                      </label>
                      <textarea
                        id="excerpt"
                        required
                        rows={3}
                        value={formData.excerpt}
                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Brief summary for SEO..."
                        maxLength={200}
                      />
                      <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/200</p>
                    </div>

                    <div>
                      <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                        URL Slug
                      </label>
                      <input
                        type="text"
                        id="slug"
                        required
                        value={formData.slug}
                        onChange={handleSlugChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="auto-generated"
                      />
                      <p className="text-xs text-gray-500 mt-1">Auto from title</p>
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                        Tags
                      </label>
                      <input
                        type="text"
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({...formData, tags: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="wordpress, security, tips"
                      />
                      <p className="text-xs text-gray-500 mt-1">Comma-separated</p>
                    </div>

                    <div>
                      <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
                        Featured Image
                      </label>
                      
                      {formData.featuredImage && (
                        <div className="mb-3 relative">
                          <img 
                            src={formData.featuredImage} 
                            alt={formData.featuredImageAlt || 'Featured image preview'}
                            className="w-full h-32 object-cover rounded-lg border border-gray-300"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({...formData, featuredImage: '', featuredImageAlt: ''})}
                            className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 shadow-lg"
                            title="Remove image"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <input
                          type="url"
                          id="featuredImage"
                          value={formData.featuredImage}
                          onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="https://example.com/image.jpg"
                        />
                        
                        <input
                          type="text"
                          value={formData.featuredImageAlt}
                          onChange={(e) => setFormData({...formData, featuredImageAlt: e.target.value})}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Alt text for SEO (e.g., WordPress security dashboard)"
                        />
                        
                        <label className={`w-full px-3 py-2 text-sm border border-gray-300 rounded-md flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                          uploadingFeaturedImage ? 'opacity-50 cursor-not-allowed' : ''
                        }`}>
                          {uploadingFeaturedImage ? (
                            <>
                              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Upload from Computer
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploadingFeaturedImage}
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                try {
                                  setUploadingFeaturedImage(true)
                                  const uploadedUrl = await handleImageUpload(file, {
                                    userId: user?.uid,
                                    useCloudStorage: process.env.NODE_ENV === 'production',
                                  })
                                  setFormData({...formData, featuredImage: uploadedUrl})
                                  setUploadingFeaturedImage(false)
                                } catch (error) {
                                  console.error('Error uploading featured image:', error)
                                  alert('Failed to upload image. Please try again.')
                                  setUploadingFeaturedImage(false)
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Paste URL, upload from computer, then add alt text</p>
                    </div>
                  </div>
                </div>

                {/* SEO Analysis Card */}
                {seoResults && (
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      SEO Analysis
                    </h3>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {seoResults.issues.map((issue, index) => (
                        <div key={index} className="text-sm flex items-start gap-2">
                          <span className={`inline-block w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            issue.includes('✓') ? 'bg-green-500' : 'bg-red-500'
                          }`}></span>
                          <span className="text-gray-700">{issue}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
