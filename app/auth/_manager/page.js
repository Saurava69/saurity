'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  applyActionCode, 
  confirmPasswordReset, 
  verifyPasswordResetCode 
} from 'firebase/auth'
import { auth } from '@/lib/firebase/config'

export default function AuthManagerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [mode, setMode] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [verifiedEmail, setVerifiedEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    const actionMode = searchParams.get('mode')
    const oobCode = searchParams.get('oobCode')

    if (!actionMode || !oobCode) {
      setError('Invalid or missing parameters')
      setLoading(false)
      return
    }

    setMode(actionMode)

    // Handle different modes
    if (actionMode === 'verifyEmail') {
      handleEmailVerification(oobCode)
    } else if (actionMode === 'resetPassword') {
      handlePasswordResetInit(oobCode)
    } else {
      setError('Unknown action mode')
      setLoading(false)
    }
  }, [searchParams])

  // Email Verification Handler
  const handleEmailVerification = async (oobCode) => {
    setLoading(true)
    setMessage('Verifying your email...')

    try {
      await applyActionCode(auth, oobCode)
      
      if (auth.currentUser) {
        await auth.currentUser.reload()
      }

      setMessage('✅ Email verified successfully! Redirecting to login...')
      setLoading(false)
      
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (error) {
      console.error('Email verification error:', error)
      setLoading(false)
      
      if (error.code === 'auth/invalid-action-code') {
        setError('This verification link is invalid or has already been used.')
      } else if (error.code === 'auth/expired-action-code') {
        setError('This verification link has expired. Please request a new one.')
      } else {
        setError('Verification failed. Please try again or request a new verification email.')
      }
    }
  }

  // Password Reset Init Handler
  const handlePasswordResetInit = async (oobCode) => {
    setLoading(true)

    try {
      const email = await verifyPasswordResetCode(auth, oobCode)
      setVerifiedEmail(email)
      setMessage(`Enter a new password for ${email}`)
      setLoading(false)
    } catch (error) {
      console.error('Error verifying reset code:', error)
      setLoading(false)
      
      if (error.code === 'auth/expired-action-code') {
        setError('This password reset link has expired. Please request a new one.')
      } else if (error.code === 'auth/invalid-action-code') {
        setError('This password reset link is invalid or has already been used.')
      } else {
        setError('Failed to verify reset link. Please request a new one.')
      }
    }
  }

  // Password Reset Submit Handler
  const handlePasswordReset = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (newPassword.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match')
    }

    setLoading(true)

    try {
      const oobCode = searchParams.get('oobCode')
      await confirmPasswordReset(auth, oobCode, newPassword)
      
      setMessage('✅ Password reset successful! Redirecting to login...')
      
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (error) {
      console.error('Password reset error:', error)
      
      if (error.code === 'auth/expired-action-code') {
        setError('This password reset link has expired. Please request a new one.')
      } else if (error.code === 'auth/invalid-action-code') {
        setError('This password reset link is invalid or has already been used.')
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.')
      } else {
        setError('Failed to reset password. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Render based on mode and state
  if (loading && !verifiedEmail) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 animate-pulse">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {mode === 'verifyEmail' ? 'Verifying Email' : 'Processing Request'}
          </h2>
          <p className="text-gray-600">{message || 'Please wait...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              {mode === 'verifyEmail' ? (
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              )}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {mode === 'verifyEmail' ? 'Email Verification' : 'Reset Password'}
            </h1>
            {mode === 'resetPassword' && verifiedEmail && (
              <p className="text-gray-600">Create a new password for your account</p>
            )}
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {message && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">{message}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Email Verification Success */}
            {mode === 'verifyEmail' && !error && !loading && (
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-4">Your email has been verified successfully!</p>
              </div>
            )}

            {/* Password Reset Form */}
            {mode === 'resetPassword' && verifiedEmail && !error && (
              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={verifiedEmail}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                  />
                </div>

                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="••••••••"
                    minLength={6}
                  />
                  <p className="text-sm text-gray-500 mt-1">At least 6 characters</p>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="••••••••"
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Resetting Password...' : 'Reset Password'}
                </button>
              </form>
            )}

            {/* Action Buttons for Errors */}
            {error && (
              <div className="space-y-3 mt-6">
                {mode === 'verifyEmail' && (
                  <Link href="/auth/signup" className="block w-full text-center px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors">
                    Request New Verification Email
                  </Link>
                )}
                {mode === 'resetPassword' && (
                  <Link href="/auth/reset-password" className="block w-full text-center px-4 py-2 border border-primary-600 text-primary-600 rounded-md hover:bg-primary-50 transition-colors">
                    Request New Reset Link
                  </Link>
                )}
                <Link href="/auth/login" className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                  Back to Login
                </Link>
              </div>
            )}

            {/* Back Link */}
            {!error && (
              <div className="mt-6 text-center">
                <Link href="/auth/login" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  ← Back to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
