'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/firebase/config'
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  orderBy,
  Timestamp,
  getDoc
} from 'firebase/firestore'

export default function AdminDashboard() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  
  const [pendingPosts, setPendingPosts] = useState([])
  const [publishedPosts, setPublishedPosts] = useState([])
  const [postsWithDrafts, setPostsWithDrafts] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [activeTab, setActiveTab] = useState('pending')
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)
  const [stats, setStats] = useState({
    pending: 0,
    published: 0,
    drafts: 0,
    totalUsers: 0
  })

  // Check admin access
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/auth/login?redirect=/admin/dashboard')
    }
  }, [user, authLoading, router])

  // Fetch data
  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchAllData()
    }
  }, [user])

  const fetchAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        fetchPendingPosts(),
        fetchPublishedPosts(),
        fetchPostsWithDrafts(),
        fetchUsers()
      ])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPendingPosts = async () => {
    const q = query(
      collection(db, 'blogPosts'),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setPendingPosts(posts)
    setStats(prev => ({ ...prev, pending: posts.length }))
  }

  const fetchPublishedPosts = async () => {
    const q = query(
      collection(db, 'blogPosts'),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setPublishedPosts(posts)
    setStats(prev => ({ ...prev, published: posts.length }))
  }

  const fetchPostsWithDrafts = async () => {
    const q = query(
      collection(db, 'blogPosts'),
      where('status', '==', 'published'),
      where('hasDraft', '==', true),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    const posts = snapshot.docs.map(doc => {
      const data = doc.data()
      // Convert Firebase Timestamps to plain objects for serialization
      if (data.draft && data.draft.submittedAt) {
        data.draft = {
          ...data.draft,
          submittedAt: data.draft.submittedAt.toDate().toISOString()
        }
      }
      return { id: doc.id, ...data }
    })
    setPostsWithDrafts(posts)
    setStats(prev => ({ ...prev, drafts: posts.length }))
  }

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, 'users'))
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setAllUsers(users)
    setStats(prev => ({ ...prev, totalUsers: users.length }))
  }

  const handleApprove = async (postId) => {
    setActionLoading(postId)
    try {
      await updateDoc(doc(db, 'blogPosts', postId), {
        status: 'published',
        publishedAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
      await fetchAllData()
      alert('Post approved and published!')
    } catch (error) {
      console.error('Error approving post:', error)
      alert('Failed to approve post')
    } finally {
      setActionLoading(null)
    }
  }

  const handleReject = async (postId) => {
    const rejectionReason = prompt('Please provide feedback for why this post is being rejected (required):')
    
    // If user cancels or provides empty feedback
    if (!rejectionReason || rejectionReason.trim() === '') {
      alert('Rejection feedback is required to help the author improve their post.')
      return
    }
    
    setActionLoading(postId)
    try {
      const updateData = {
        status: 'rejected',
        rejectedAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      }
      
      if (rejectionReason) {
        updateData.rejectionReason = rejectionReason
      }
      
      await updateDoc(doc(db, 'blogPosts', postId), updateData)
      await fetchAllData()
      alert('Post rejected. Author can edit and resubmit.')
    } catch (error) {
      console.error('Error rejecting post:', error)
      alert('Failed to reject post')
    } finally {
      setActionLoading(null)
    }
  }

  const handleUnpublish = async (postId) => {
    if (!confirm('Unpublish this post? It will become pending again.')) return
    
    setActionLoading(postId)
    try {
      await updateDoc(doc(db, 'blogPosts', postId), {
        status: 'pending',
        updatedAt: Timestamp.now()
      })
      await fetchAllData()
      alert('Post unpublished')
    } catch (error) {
      console.error('Error unpublishing post:', error)
      alert('Failed to unpublish post')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (postId) => {
    if (!confirm('Permanently delete this post? This cannot be undone!')) return
    
    setActionLoading(postId)
    try {
      await deleteDoc(doc(db, 'blogPosts', postId))
      await fetchAllData()
      alert('Post deleted permanently')
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Failed to delete post')
    } finally {
      setActionLoading(null)
    }
  }

  const handleApproveDraft = async (postId) => {
    setActionLoading(postId)
    try {
      const postRef = doc(db, 'blogPosts', postId)
      const postSnap = await getDoc(postRef)
      const post = postSnap.data()

      // Merge draft into main post
      await updateDoc(postRef, {
        ...post.draft,
        draft: null,
        hasDraft: false,
        updatedAt: Timestamp.now()
      })
      
      await fetchAllData()
      alert('Draft approved and published!')
    } catch (error) {
      console.error('Error approving draft:', error)
      alert('Failed to approve draft')
    } finally {
      setActionLoading(null)
    }
  }

  const handleRejectDraft = async (postId) => {
    if (!confirm('Reject these changes? The published version will remain unchanged.')) return
    
    setActionLoading(postId)
    try {
      await updateDoc(doc(db, 'blogPosts', postId), {
        draft: null,
        hasDraft: false,
        updatedAt: Timestamp.now()
      })
      
      await fetchAllData()
      alert('Draft rejected. Published version unchanged.')
    } catch (error) {
      console.error('Error rejecting draft:', error)
      alert('Failed to reject draft')
    } finally {
      setActionLoading(null)
    }
  }

  const handleUserRoleChange = async (userId, newRole) => {
    if (!confirm(`Change user role to ${newRole}?`)) return
    
    try {
      await updateDoc(doc(db, 'users', userId), {
        role: newRole
      })
      await fetchUsers()
      alert('User role updated!')
    } catch (error) {
      console.error('Error updating user role:', error)
      alert('Failed to update user role')
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-12">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage blog posts and users</p>
            </div>
            <Link href="/blog/write" className="btn-primary">
              Write New Post
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 font-medium mb-1">Pending Approval</p>
                  <p className="text-3xl font-bold text-yellow-900">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 font-medium mb-1">Published Posts</p>
                  <p className="text-3xl font-bold text-green-900">{stats.published}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 font-medium mb-1">Posts with Drafts</p>
                  <p className="text-3xl font-bold text-orange-900">{stats.drafts}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 font-medium mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.totalUsers}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-white">
        <div className="container-custom">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('pending')}
                className={`pb-4 px-2 font-medium transition-colors relative ${
                  activeTab === 'pending'
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Pending Posts ({stats.pending})
                {activeTab === 'pending' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('published')}
                className={`pb-4 px-2 font-medium transition-colors relative ${
                  activeTab === 'published'
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Published Posts ({stats.published})
                {activeTab === 'published' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('drafts')}
                className={`pb-4 px-2 font-medium transition-colors relative ${
                  activeTab === 'drafts'
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Posts with Drafts ({stats.drafts})
                {activeTab === 'drafts' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`pb-4 px-2 font-medium transition-colors relative ${
                  activeTab === 'users'
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Users ({stats.totalUsers})
                {activeTab === 'users' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </button>
            </div>
          </div>

          {/* Pending Posts Tab */}
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {pendingPosts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No pending posts</p>
                </div>
              ) : (
                pendingPosts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onApprove={() => handleApprove(post.id)}
                    onReject={() => handleReject(post.id)}
                    onEdit={() => router.push(`/admin/edit/${post.id}`)}
                    loading={actionLoading === post.id}
                    isPending={true}
                  />
                ))
              )}
            </div>
          )}

          {/* Published Posts Tab */}
          {activeTab === 'published' && (
            <div className="space-y-4">
              {publishedPosts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No published posts</p>
                </div>
              ) : (
                publishedPosts.map(post => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onUnpublish={() => handleUnpublish(post.id)}
                    onDelete={() => handleDelete(post.id)}
                    onEdit={() => router.push(`/admin/edit/${post.id}`)}
                    loading={actionLoading === post.id}
                    isPending={false}
                  />
                ))
              )}
            </div>
          )}

          {/* Drafts Tab */}
          {activeTab === 'drafts' && (
            <div className="space-y-4">
              {postsWithDrafts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No posts with pending drafts</p>
                </div>
              ) : (
                postsWithDrafts.map(post => (
                  <DraftComparisonCard
                    key={post.id}
                    post={post}
                    onApproveDraft={() => handleApproveDraft(post.id)}
                    onRejectDraft={() => handleRejectDraft(post.id)}
                    onEdit={() => router.push(`/admin/edit/${post.id}`)}
                    loading={actionLoading === post.id}
                  />
                ))
              )}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              {allUsers.map(u => (
                <div key={u.id} className="bg-white border rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold text-lg">
                          {u.displayName?.charAt(0).toUpperCase() || u.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{u.displayName || 'No name'}</p>
                        <p className="text-sm text-gray-600">{u.email}</p>
                        <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                          u.role === 'admin' 
                            ? 'bg-red-100 text-red-800'
                            : u.role === 'editor'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {u.role || 'user'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {u.id !== user.uid && (
                        <>
                          <select
                            value={u.role || 'user'}
                            onChange={(e) => handleUserRoleChange(u.id, e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                          >
                            <option value="user">User</option>
                            <option value="editor">Editor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </>
                      )}
                      {u.id === user.uid && (
                        <span className="text-sm text-gray-500 px-3 py-2">(You)</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function PostCard({ post, onApprove, onReject, onUnpublish, onDelete, onEdit, loading, isPending }) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="px-2 py-1 bg-primary-50 text-primary-600 rounded-full font-medium">
                  {post.category}
                </span>
                <span>by {post.author}</span>
                <span>•</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {post.tags?.map((tag, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 min-w-[140px]">
          {isPending ? (
            <>
              <button
                onClick={onApprove}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 text-sm font-medium"
              >
                {loading ? 'Processing...' : 'Approve'}
              </button>
              <button
                onClick={onEdit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={onReject}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 text-sm font-medium"
              >
                Reject
              </button>
            </>
          ) : (
            <>
              <Link
                href={`/blog/${post.slug}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium text-center"
              >
                View Post
              </Link>
              <button
                onClick={onEdit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={onUnpublish}
                disabled={loading}
                className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 text-sm font-medium"
              >
                Unpublish
              </button>
              <button
                onClick={onDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 text-sm font-medium"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function DraftComparisonCard({ post, onApproveDraft, onRejectDraft, onEdit, loading }) {
  const [showDiff, setShowDiff] = useState(false)
  
  return (
    <div className="bg-white border-2 border-orange-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
            Draft Pending Review
          </span>
          <h3 className="text-xl font-semibold">{post.title}</h3>
        </div>
        <button
          onClick={() => setShowDiff(!showDiff)}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          {showDiff ? 'Hide' : 'Show'} Changes
        </button>
      </div>

      {showDiff && post.draft && (
        <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
          {/* Published Version */}
          <div className="border-r pr-4">
            <h4 className="text-sm font-semibold text-gray-600 mb-2">Published Version</h4>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">Title</p>
                <p className="text-sm">{post.title}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Excerpt</p>
                <p className="text-sm line-clamp-2">{post.excerpt}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm">{post.category}</p>
              </div>
            </div>
          </div>

          {/* Draft Version */}
          <div className="pl-4">
            <h4 className="text-sm font-semibold text-green-600 mb-2">Draft Changes</h4>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">Title</p>
                <p className="text-sm font-medium text-green-700">{post.draft.title}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Excerpt</p>
                <p className="text-sm text-green-700 line-clamp-2">{post.draft.excerpt}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="text-sm text-green-700">{post.draft.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={onApproveDraft}
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 font-medium"
        >
          {loading ? 'Processing...' : 'Approve Draft'}
        </button>
        <button
          onClick={onRejectDraft}
          disabled={loading}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 font-medium"
        >
          Reject Draft
        </button>
        <button
          onClick={onEdit}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 font-medium"
        >
          Edit Directly
        </button>
      </div>
    </div>
  )
}
