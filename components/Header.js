'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { usePathname } from 'next/navigation'
import HeaderSearchModal from './HeaderSearchModal'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [comparisonsOpen, setComparisonsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const { user, logout } = useAuth()
  const pathname = usePathname()
  
  const productsRef = useRef(null)
  const resourcesRef = useRef(null)
  const comparisonsRef = useRef(null)
  const userMenuRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (productsRef.current && !productsRef.current.contains(event.target)) {
        setProductsOpen(false)
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
        setResourcesOpen(false)
      }
      if (comparisonsRef.current && !comparisonsRef.current.contains(event.target)) {
        setComparisonsOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isActive = (path) => pathname === path

  // Close mobile menu on navigation
  const handleMobileNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="Saurity" 
              width={32} 
              height={32}
              className="w-8 h-8"
            />
            <span className="font-bold text-xl text-gray-900">Saurity</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {/* Products Dropdown */}
            <div className="relative" ref={productsRef}>
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  productsOpen || pathname.startsWith('/firewall') || pathname.startsWith('/login-security') || pathname.startsWith('/rate-limiting')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                Products
                <svg className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {productsOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <Link href="/firewall" className="block px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Web Firewall</div>
                    <div className="text-sm text-gray-600">Block malicious traffic</div>
                  </Link>
                  <Link href="/login-security" className="block px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Login Security</div>
                    <div className="text-sm text-gray-600">Zero admin lockouts</div>
                  </Link>
                  <Link href="/rate-limiting" className="block px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="font-medium text-gray-900">Rate Limiting</div>
                    <div className="text-sm text-gray-600">Prevent abuse & DDoS</div>
                  </Link>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link href="/features" className="block px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 transition-colors font-medium">
                    View All Features →
                  </Link>
                </div>
              )}
            </div>

            {/* Blog Link */}
            <Link 
              href="/blog"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith('/blog')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              Blog
            </Link>

            {/* Resources Dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  resourcesOpen || pathname.startsWith('/use-cases') || pathname.startsWith('/faq') || pathname.startsWith('/changelog')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                Resources
                <svg className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {resourcesOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <Link href="/use-cases" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                    Use Cases
                  </Link>
                  <Link href="/faq" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                    FAQ
                  </Link>
                  <Link href="/changelog" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                    Changelog
                  </Link>
                </div>
              )}
            </div>

            {/* Comparisons Dropdown */}
            <div className="relative" ref={comparisonsRef}>
              <button
                onClick={() => setComparisonsOpen(!comparisonsOpen)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  comparisonsOpen || pathname.startsWith('/vs')
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                Comparisons
                <svg className={`w-4 h-4 transition-transform ${comparisonsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {comparisonsOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <Link href="/vs/wordfence" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                     vs Wordfence
                  </Link>
                  <Link href="/vs/sucuri" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                     vs Sucuri
                  </Link>
                  <Link href="/vs/ithemes" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                     vs iThemes Security
                  </Link>
                  <Link href="/vs/all-in-one" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors">
                     vs All In One Security
                  </Link>
                </div>
              )}
            </div>

            {/* About Link */}
            <Link 
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              About
            </Link>
          </div>

          {/* Right Side - CTA & User Menu */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            {/* Search Icon */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors rounded-md hover:bg-gray-50"
              title="Search blog posts"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {user ? (
              <>
                {/* Quick Actions */}
                <Link 
                  href="/blog/write" 
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors rounded-md hover:bg-gray-50"
                  title="Write a post"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </Link>

                {/* User Menu Dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-semibold text-sm">
                        {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <svg className={`w-4 h-4 text-gray-600 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user.displayName || 'User'}</p>
                        <p className="text-xs text-gray-600 truncate">{user.email}</p>
                        {user.role && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-primary-50 text-primary-600 text-xs rounded-full font-medium">
                            {user.role}
                          </span>
                        )}
                      </div>
                      
                      <Link href="/user/my-posts" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        My Posts
                      </Link>
                      
                      {user.role === 'admin' && (
                        <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Admin Dashboard
                        </Link>
                      )}
                      
                      <div className="border-t border-gray-200 my-2"></div>
                      
                      <button
                        onClick={() => {
                          logout()
                          setUserMenuOpen(false)
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link href="/download" className="btn-primary text-sm">
                  Download Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {/* Products */}
              <div className="py-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Products</div>
                <Link href="/firewall" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                  Web Firewall
                </Link>
                <Link href="/login-security" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                  Login Security
                </Link>
                <Link href="/rate-limiting" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                  Rate Limiting
                </Link>
                <Link href="/features" onClick={handleMobileNavClick} className="block px-3 py-2 text-primary-600 hover:bg-primary-50 rounded-md transition-colors font-medium">
                  All Features
                </Link>
              </div>

              {/* Resources */}
              <div className="py-2 border-t border-gray-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Resources</div>
                <Link href="/blog" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                  Blog & Guides
                </Link>
                <Link href="/use-cases" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                  Use Cases
                </Link>
                <Link href="/faq" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                  FAQ
                </Link>
                <Link href="/changelog" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                  Changelog
                </Link>
              </div>

              {/* Other Links */}
              <div className="py-2 border-t border-gray-200">
                <Link href="/vs/wordfence" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                  Comparisons
                </Link>
                <Link href="/about" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                  About
                </Link>
              </div>
              
              {user ? (
                <div className="py-2 border-t border-gray-200">
                  <div className="px-3 py-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">
                          {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.displayName || 'User'}</p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link href="/user/my-posts" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                    My Posts
                  </Link>
                  <Link href="/blog/write" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                    Write Post
                  </Link>
                  {user.role === 'admin' && (
                    <Link href="/admin/dashboard" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="py-2 border-t border-gray-200 space-y-2">
                  <Link href="/auth/login" onClick={handleMobileNavClick} className="block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-md transition-colors">
                    Login
                  </Link>
                  <Link href="/download" onClick={handleMobileNavClick} className="block mx-3 btn-primary text-center">
                    Download Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      <HeaderSearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)} 
      />
    </header>
  )
}
