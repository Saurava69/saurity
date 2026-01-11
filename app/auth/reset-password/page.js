'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { sendPasswordResetEmail, confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [mode, setMode] = useState('request') // 'request' or 'reset'
  const [verifiedEmail, setVerifiedEmail] = useState('')

  useEffect(() => {
    // Check if this is a password reset link from email
    const actionMode = searchParams.get('mode')
    const oobCode = searchParams.get('oobCode')

    if (actionMode === 'resetPassword' && oobCode) {
      verifyResetCode(oobCode)
    }
  }, [searchParams])

  const verifyResetCode = async (oobCode) => {
    setLoading(true)
    try {
      // Verify the password reset code and get the email
      const email = await verifyPasswordResetCode(auth, oobCode)
      setVerifiedEmail(email)
      setMode('reset')
      setMessage(`Enter a new password for ${email}`)
    } catch (error) {
      console.error('Error verifying reset code:', error)
      if (error.code === 'auth/expired-action-code') {
        setError('This password reset link has expired. Please request a new one.')
      } else if (error.code === 'auth/invalid-action-code') {
        setError('This password reset link is invalid. Please request a new one.')
      } else {
        setError('Failed to verify reset link. Please request a new one.')
      }
      setMode('request')
    } finally {
      setLoading(false)
    }
  }

  const handleRequestReset = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, email)
      setMessage('Password reset email sent! Please check your inbox.')
    } catch (error) {
      console.error('Password reset error:', error)
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address.')
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address.')
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many requests. Please wait a few minutes before trying again.')
      } else {
        setError('Failed to send password reset email. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    // Validation
    if (newPassword.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match')
    }

    setLoading(true)

    try {
      const oobCode = searchParams.get('oobCode')
      
      // Reset the password
      await confirmPasswordReset(auth, oobCode, newPassword)
      
      setMessage('Password reset successful! Redirecting to login...')
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (error) {
      console.error('Password reset error:', error)
      if (error.code === 'auth/expired-action-code') {
        setError('This password reset link has expired. Please request a new one.')
      } else if (error.code === 'auth/invalid-action-code') {
        setError('This password reset link is invalid. Please request a new one.')
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please use a stronger password.')
      } else {
        setError('Failed to reset password. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {mode === 'request' ? 'Reset Password' : 'Create New Password'}
            </h1>
            <p className="text-gray-600">
              {mode === 'request' 
                ? 'Enter your email to receive a password reset link' 
                : 'Enter your new password below'}
            </p>
          </div>

          {/* Form Card */}
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

            {mode === 'request' ? (
              // Request Reset Form
              <form onSubmit={handleRequestReset} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            ) : (
              // Reset Password Form
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label htmlFor="verified-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="verified-email"
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

            {/* Back to Login Link */}
            <div className="mt-6 text-center">
              <Link href="/auth/login" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                ← Back to Login
              </Link>
            </div>
          </div>

          {/* Help Text */}
          {mode === 'request' && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">
                <strong>Remember your password?</strong>{' '}
                <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
