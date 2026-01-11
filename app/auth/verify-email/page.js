'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { applyActionCode } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentUser, logout } = useAuth()
  const [checking, setChecking] = useState(false)
  const [resending, setResending] = useState(false)
  const [message, setMessage] = useState('')
  const [autoVerifying, setAutoVerifying] = useState(false)

  useEffect(() => {
    // Handle Firebase action code from URL
    const mode = searchParams.get('mode')
    const oobCode = searchParams.get('oobCode')

    if (mode === 'verifyEmail' && oobCode) {
      handleFirebaseVerification(oobCode)
      return
    }

    // If no user, redirect to signup
    if (!currentUser) {
      router.push('/auth/signup')
      return
    }

    // If already verified, redirect to blog
    if (currentUser.emailVerified) {
      router.push('/blog')
    }
  }, [currentUser, router, searchParams])

  const handleFirebaseVerification = async (oobCode) => {
    setAutoVerifying(true)
    setMessage('Verifying your email...')

    try {
      // Apply the verification code
      await applyActionCode(auth, oobCode)
      
      // Reload user to get updated verification status
      if (auth.currentUser) {
        await auth.currentUser.reload()
      }

      setMessage('Email verified successfully! Redirecting to login...')
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (error) {
      console.error('Verification error:', error)
      
      if (error.code === 'auth/invalid-action-code') {
        setMessage('This verification link is invalid or has expired. Please request a new one.')
      } else if (error.code === 'auth/expired-action-code') {
        setMessage('This verification link has expired. Please request a new verification email.')
      } else {
        setMessage('Verification failed. Please try again or request a new verification email.')
      }
      
      setAutoVerifying(false)
    }
  }

  const checkVerification = async () => {
    if (!currentUser) return

    setChecking(true)
    setMessage('')

    try {
      // Reload user to get latest verification status
      await currentUser.reload()
      
      if (currentUser.emailVerified) {
        setMessage('Email verified successfully! Redirecting...')
        setTimeout(() => {
          router.push('/blog')
        }, 2000)
      } else {
        setMessage('Email not verified yet. Please check your inbox and click the verification link.')
      }
    } catch (error) {
      console.error('Error checking verification:', error)
      setMessage('Error checking verification status. Please try again.')
    } finally {
      setChecking(false)
    }
  }

  const resendVerification = async () => {
    if (!currentUser) return

    setResending(true)
    setMessage('')

    try {
      await currentUser.sendEmailVerification()
      setMessage('Verification email sent! Please check your inbox.')
    } catch (error) {
      console.error('Error sending verification email:', error)
      if (error.code === 'auth/too-many-requests') {
        setMessage('Too many requests. Please wait a few minutes before trying again.')
      } else {
        setMessage('Failed to send verification email. Please try again.')
      }
    } finally {
      setResending(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Show loading state while auto-verifying from email link
  if (autoVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4 animate-pulse">
            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h2>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-20">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Verify Your Email</h1>
            <p className="text-gray-600">We've sent a verification link to:</p>
            <p className="text-lg font-medium text-gray-900 mt-2">{currentUser.email}</p>
          </div>

          {/* Verification Card */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${
                message.includes('successfully') || message.includes('sent')
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-yellow-50 border border-yellow-200'
              }`}>
                <p className={`text-sm ${
                  message.includes('successfully') || message.includes('sent')
                    ? 'text-green-800'
                    : 'text-yellow-800'
                }`}>{message}</p>
              </div>
            )}

            {/* Instructions */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-primary-600 text-sm font-bold">1</span>
                </div>
                <p className="text-gray-700">Check your email inbox for a verification link </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-primary-600 text-sm font-bold">2</span>
                </div>
                <p className="text-gray-700">Click the verification link in the email</p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-primary-600 text-sm font-bold">3</span>
                </div>
                <p className="text-gray-700">Come back here and click "I've Verified My Email"</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={checkVerification}
                disabled={checking}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checking ? 'Checking...' : "I've Verified My Email"}
              </button>

              <button
                onClick={resendVerification}
                disabled={resending}
                className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resending ? 'Sending...' : 'Resend Verification Email'}
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Logout
              </button>
            </div>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Didn't receive the email?</strong>
              </p>
              <ul className="mt-2 text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Check your spam/junk folder</li>
                <li>Make sure you entered the correct email</li>
                <li>Click "Resend Verification Email" to get a new link</li>
              </ul>
            </div>
          </div>

          {/* Back Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Wrong email?{' '}
            <Link href="/auth/signup" className="text-primary-600 hover:text-primary-700 font-medium">
              Sign up again
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
