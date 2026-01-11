'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import TiptapEditor from '@/components/blog/TiptapEditor'
import { checkSEO, generateSlug } from '@/lib/utils/seoChecker'
import { db } from '@/lib/firebase/config'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import readingTime from 'reading-time'

export default function EditBlogPost() {
  const router = useRouter()
  const params = useParams()
  const { user, loading: authLoading } = useAuth()
  const postId = params.postId
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'Security Tips',
    tags: '',
    featuredImage: '',
    status: 'pending'
  })
  
  const [seoResults, setSeoResults] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [autoSlug, setAutoSlug] = useState(false)

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

  // Check admin access
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/auth/login?redirect=/admin/dashboard')
    }
  }, [user, authLoading, router])

  // Load post data
  useEffect(() => {
    if (user && user.role === 'admin' && postId) {
      loadPost()
    }
  }, [user, postId])

  const loadPost = async () => {
    try {
      const postDoc = await getDoc(doc(db, 'blogPosts', postId))
      if (postDoc.exists()) {
        const post = postDoc.data()
        setFormData({
          title: post.title || '',
          slug: post.slug || '',
          excerpt: post.excerpt || '',
          content: post.content || '',
          category: post.category || 'Security Tips',
          tags: post.tags?.join(', ') || '',
          featuredImage: post.featuredImage || '',
          status: post.status || 'pending'
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Post not found'
        })
      }
    } catch (error) {
      console.error('Error loading post:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Failed to load post'
      })
    } finally {
      setLoading(false)
    }
  }

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

  // Strip HTML tags for SEO check
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  // Auto-check SEO when content changes
  useEffect(() => {
    if (formData.title && formData.excerpt && formData.content) {
      const timer = setTimeout(() => {
        const plainContent = stripHtml(formData.content)
        const results = checkSEO(formData.title, formData.excerpt, plainContent, formData.slug)
        setSeoResults(results)
      }, 1000)
      
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
      const plainContent = stripHtml(formData.content)
      const seo = checkSEO(formData.title, formData.excerpt, plainContent, formData.slug)
      const stats = readingTime(plainContent)

      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      const postData = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt,
        content: formData.content,
        category: formData.category,
        tags: tagsArray,
        featuredImage: formData.featuredImage || '',
        readTime: Math.ceil(stats.minutes),
        wordCount: stats.words,
        seoScore: seo.score.overall,
        status: formData.status,
        updatedAt: serverTimestamp(),
      }

      await updateDoc(doc(db, 'blogPosts', postId), postData)

      setSubmitStatus({
        type: 'success',
        message: 'Post updated successfully!',
      })

      // Redirect after 1 second
      setTimeout(() => {
        router.push('/admin/dashboard')
      }, 1000)

    } catch (error) {
      console.error('Error updating post:', error)
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred while updating the post. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <Link href="/admin/dashboard" className="text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Edit Blog Post
            </h1>
            <p className="text-xl text-gray-600">
              Update post content and settings as admin.
            </p>
          </div>
        </div>
      </section>

      {/* Editor Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            {submitStatus && (
              <div className={`mb-8 p-4 rounded-lg ${
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

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Post Metadata */}
              <div className="bg-gray-50 p-6 rounded-lg space-y-6">
                <h2 className="text-2xl font-semibold">Post Information</h2>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">/blog/</span>
                    <input
                      type="text"
                      id="slug"
                      required
                      value={formData.slug}
                      onChange={handleSlugChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description / Excerpt * (120-160 characters recommended)
                  </label>
                  <textarea
                    id="excerpt"
                    required
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    maxLength={200}
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.excerpt.length}/200 characters</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="wordpress, security, plugins"
                    />
                  </div>

                  <div>
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select
                      id="status"
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL (optional)
                  </label>
                  <input
                    type="url"
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Tiptap Editor */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Content Editor</h2>
                <TiptapEditor
                  value={formData.content}
                  onChange={(value) => setFormData({...formData, content: value})}
                  title={formData.title}
                  excerpt={formData.excerpt}
                />
              </div>

              {/* SEO Analysis */}
              {seoResults && (
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    SEO Analysis
                  </h3>
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

              {/* Submit Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Updating...' : 'Update Post'}
                </button>
                <Link href="/admin/dashboard" className="btn-secondary">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
