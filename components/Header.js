import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.svg" 
              alt="Saurity Logo" 
              width={32} 
              height={32}
              className="w-8 h-8"
            />
            <span className="font-bold text-xl text-gray-900">Saurity</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/login-security" className="text-gray-700 hover:text-primary-600 transition-colors">
              Login Security
            </Link>
            <Link href="/rate-limiting" className="text-gray-700 hover:text-primary-600 transition-colors">
              Rate Limiting
            </Link>
            <a 
              href="https://github.com/saurity/saurity" 
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download v0.1
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
