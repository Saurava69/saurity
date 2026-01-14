import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/use-cases" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/login-security" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Login Security
                </Link>
              </li>
              <li>
                <Link href="/rate-limiting" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Rate Limiting
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/saurity/saurity#readme" 
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/saurity/saurity" 
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/saurity/saurity/issues" 
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Compare</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/vs/wordfence" className="text-gray-600 hover:text-primary-600 transition-colors">
                  vs Wordfence
                </Link>
              </li>
              <li>
                <Link href="/vs/sucuri" className="text-gray-600 hover:text-primary-600 transition-colors">
                  vs Sucuri
                </Link>
              </li>
              <li>
                <Link href="/vs/ithemes" className="text-gray-600 hover:text-primary-600 transition-colors">
                  vs iThemes
                </Link>
              </li>
              <li>
                <Link href="/vs/all-in-one" className="text-gray-600 hover:text-primary-600 transition-colors">
                  vs All In One
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Image 
                src="/logo.png" 
                alt="Saurity WordPress Security Plugin - Zero Admin Lockouts" 
                width={24} 
                height={24}
                className="w-6 h-6"
              />
              <span className="text-gray-600">
                © {currentYear} Saurity. WordPress security without the lockouts.
              </span>
            </div>
            <div className="text-gray-600 text-sm">
              GPL v2 License • Open Source
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
