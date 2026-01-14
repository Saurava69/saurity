'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import TiptapEditor from '@/components/blog/TiptapEditor'
import { db } from '@/lib/firebase/config'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import readingTime from 'reading-time'

export default function EditUserPost() {
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
  
  const [originalStatus, setOriginalStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [autoSlug, setAutoSlug] = useState(false)
  const [showApprovalWarning, setShowApprovalWarning] = useState(false)

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

  // Check user access
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login?redirect=/user/my-posts')
    }
  }, [user, authLoading, router])

  // Load post data
  useEffect(() => {
    if (user && postId) {
      loadPost()
    }
  }, [user, postId])

  const loadPost = async () => {
    try {
      const postDoc = await getDoc(doc(db, 'blogPosts', postId))
      if (postDoc.exists()) {
        const post = postDoc.data()
        
        // Check if user owns this post
        if (post.authorId !== user.uid) {
          setSubmitStatus({
            type: 'error',
            message: 'You do not have permission to edit this post'
          })
          setTimeout(() => router.push('/user/my-posts'), 2000)
          return
        }
        
        setOriginalStatus(post.status)
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
        
        // Show approval warning if editing published post or updating pending post
        if (post.status === 'published') {
          setShowApprovalWarning(true)
        } else if (post.status === 'pending') {
          setShowApprovalWarning('pending')
        }
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

  // Generate slug from title
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
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

  // Strip HTML tags for word count
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const plainContent = stripHtml(formData.content)
      const stats = readingTime(plainContent)

      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)

      // If post is published, save as draft (keeps post live)
      if (originalStatus === 'published') {
        const postData = {
          draft: {
            title: formData.title,
            slug: formData.slug || generateSlug(formData.title),
            excerpt: formData.excerpt,
            content: formData.content,
            category: formData.category,
            tags: tagsArray,
            featuredImage: formData.featuredImage || '',
            readTime: Math.ceil(stats.minutes),
            wordCount: stats.words,
            hasChanges: true,
            submittedAt: serverTimestamp()
          },
          updatedAt: serverTimestamp(),
        }

        await updateDoc(doc(db, 'blogPosts', postId), postData)

        setSubmitStatus({
          type: 'success',
          message: 'Draft submitted for review! Your published post remains live while the admin reviews your changes.',
        })
      } else {
        // For pending/rejected posts, update directly
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
          status: formData.status,
          updatedAt: serverTimestamp(),
        }

        await updateDoc(doc(db, 'blogPosts', postId), postData)

        setSubmitStatus({
          type: 'success',
          message: 'Post updated successfully!',
        })
      }

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/user/my-posts')
      }, 2000)

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

  if (!user) {
    return null
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-12 border-b">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <Link href="/user/my-posts" className="text-primary-600 hover:text-primary-700 mb-3 inline-flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to My Posts
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Edit Blog Post
            </h1>
            {showApprovalWarning === true && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-blue-800 mb-1">Draft System - Post Stays Live</p>
                    <p className="text-sm text-blue-700">
                      Your published post will remain live and visible to readers. Changes will be saved as a draft for admin review. Once approved, your changes will replace the current version.
                    </p>
                  </div>
                </div>
              </div>
            )}
            {showApprovalWarning === 'pending' && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-blue-800 mb-1">Updating Pending Approval</p>
                    <p className="text-sm text-blue-700">
                      This post is awaiting admin approval. You can continue to edit and improve it before the admin reviews it. Your changes will update the existing approval request.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Editor Section */}
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
                  {/* Title Input */}
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
                    Save Changes
                  </h3>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-center flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {originalStatus === 'published' ? 'Submit for Re-Approval' : 'Save Changes'}
                      </>
                    )}
                  </button>

                  <Link href="/user/my-posts" className="w-full btn-secondary text-center mt-3 block">
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
                        Featured Image URL
                      </label>
                      <input
                        type="url"
                        id="featuredImage"
                        value={formData.featuredImage}
                        onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
