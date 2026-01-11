// Server-side Firebase operations for blog posts
// This enables server-side rendering and better performance

import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Initialize Firebase Admin SDK (singleton pattern)
if (!getApps().length) {
  try {
    // Check if environment variables are set
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.error('Firebase Admin credentials not found in environment variables')
      console.error('Please set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in .env.local')
    } else {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        })
      })
    }
  } catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error)
  }
}

const db = getApps().length > 0 ? getFirestore() : null

/**
 * Get a published blog post by slug (server-side)
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} Post data or null
 */
export async function getPostBySlug(slug) {
  // Check if Firebase is initialized
  if (!db) {
    console.error('Firebase Admin SDK not initialized. Check environment variables.')
    return null
  }

  // Validate slug parameter
  if (!slug || typeof slug !== 'string') {
    console.error('Invalid slug parameter:', slug)
    return null
  }

  try {
    const snapshot = await db.collection('blogPosts')
      .where('slug', '==', slug)
      .where('status', '==', 'published')
      .limit(1)
      .get()
    
    if (snapshot.empty) return null
    
    const doc = snapshot.docs[0]
    const data = doc.data()
    
    return {
      id: doc.id,
      ...data,
      // Convert Firestore Timestamps to ISO strings for serialization
      publishedAt: data.publishedAt?.toDate().toISOString(),
      createdAt: data.createdAt?.toDate().toISOString(),
      updatedAt: data.updatedAt?.toDate().toISOString(),
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

/**
 * Get related posts by category (server-side)
 * @param {string} category - Post category
 * @param {string} currentSlug - Current post slug to exclude
 * @param {number} limit - Number of related posts
 * @returns {Promise<Array>} Related posts
 */
export async function getRelatedPosts(category, currentSlug, limit = 3) {
  // Check if Firebase is initialized
  if (!db) {
    console.error('Firebase Admin SDK not initialized. Check environment variables.')
    return []
  }

  // Validate parameters
  if (!category || !currentSlug) {
    console.error('Invalid parameters for getRelatedPosts')
    return []
  }

  try {
    const snapshot = await db.collection('blogPosts')
      .where('status', '==', 'published')
      .where('category', '==', category)
      .limit(limit + 1) // Get one extra in case current post is included
      .get()
    
    const posts = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        publishedAt: doc.data().publishedAt?.toDate().toISOString(),
        createdAt: doc.data().createdAt?.toDate().toISOString(),
      }))
      .filter(post => post.slug !== currentSlug)
      .slice(0, limit)
    
    return posts
  } catch (error) {
    console.error('Error fetching related posts:', error)
    return []
  }
}

/**
 * Get all published posts for static generation
 * @returns {Promise<Array>} All published posts
 */
export async function getAllPublishedPosts() {
  // Check if Firebase is initialized
  if (!db) {
    console.error('Firebase Admin SDK not initialized. Check environment variables.')
    return []
  }

  try {
    const snapshot = await db.collection('blogPosts')
      .where('status', '==', 'published')
      .get()
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      slug: doc.data().slug,
    }))
  } catch (error) {
    console.error('Error fetching all posts:', error)
    return []
  }
}

/**
 * Get published posts with full data (server-side for blog listing)
 * @param {string|null} category - Optional category filter
 * @returns {Promise<Array>} Published posts with full data
 */
export async function getPublishedPosts(category = null) {
  // Check if Firebase is initialized
  if (!db) {
    console.error('Firebase Admin SDK not initialized. Check environment variables.')
    return []
  }

  try {
    let query = db.collection('blogPosts').where('status', '==', 'published')
    
    // Add category filter if specified
    if (category && category !== 'all') {
      query = query.where('category', '==', category)
    }
    
    const snapshot = await query.get()
    
    const posts = snapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamps to ISO strings for serialization
        publishedAt: data.publishedAt?.toDate().toISOString(),
        createdAt: data.createdAt?.toDate().toISOString(),
        updatedAt: data.updatedAt?.toDate().toISOString(),
      }
    })
    
    // Sort by publishedAt or createdAt (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.createdAt || 0)
      const dateB = new Date(b.publishedAt || b.createdAt || 0)
      return dateB - dateA
    })
    
    return posts
  } catch (error) {
    console.error('Error fetching published posts:', error)
    return []
  }
}

/**
 * Extract plain text from Tiptap JSON content
 * @param {string|Object} content - Tiptap JSON content
 * @returns {string} Plain text
 */
export function extractTextFromTiptap(content) {
  try {
    const json = typeof content === 'string' ? JSON.parse(content) : content
    let text = ''
    
    function traverse(nodes) {
      if (!nodes || !Array.isArray(nodes)) return
      
      nodes.forEach(node => {
        if (node.type === 'text') {
          text += node.text + ' '
        }
        if (node.content) {
          traverse(node.content)
        }
      })
    }
    
    if (json && json.content) {
      traverse(json.content)
    }
    
    return text.trim()
  } catch (error) {
    console.error('Error extracting text:', error)
    return ''
  }
}

/**
 * Calculate accurate reading time based on content
 * @param {string|Object} content - Tiptap JSON content
 * @returns {number} Reading time in minutes
 */
export function calculateReadTime(content) {
  try {
    const wordsPerMinute = 265 // Medium uses 265 WPM
    const text = extractTextFromTiptap(content)
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length
    
    // Count images (add 12 seconds per image)
    const contentStr = typeof content === 'string' ? content : JSON.stringify(content)
    const imageCount = (contentStr.match(/"type":"image"/g) || []).length
    const imageTime = imageCount * 12 // 12 seconds per image
    
    const readTime = (wordCount / wordsPerMinute) + (imageTime / 60)
    return Math.ceil(Math.max(1, readTime)) // Minimum 1 minute
  } catch (error) {
    console.error('Error calculating read time:', error)
    return 5 // Default fallback
  }
}
