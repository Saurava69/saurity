import Link from 'next/link'
import JsonLd, { generateBreadcrumbSchema } from '@/components/JsonLd'

export const metadata = {
  title: 'Download Saurity v1.0.0 - Free WordPress Security Plugin',
  description: 'Download Saurity v1.0.0 for free. Enterprise WordPress security with zero false positives. Install in 5 minutes. No credit card required.',
  alternates: {
    canonical: 'https://saurity.com/download',
  },
  openGraph: {
    title: 'Download Saurity v1.0.0 - Free WordPress Security',
    description: 'Enterprise WordPress security plugin. Download free, install in 5 minutes.',
    url: 'https://saurity.com/download',
    images: ['/HomePage1200_600.webp'],
  },
}

const breadcrumbs = [
  { name: 'Home', url: 'https://saurity.com' },
  { name: 'Download', url: 'https://saurity.com/download' },
]

export default function DownloadPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ✨ Latest Version: v1.0.0
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Download Saurity - Free WordPress Security
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Enterprise-grade security with zero false positives. Install in 5 minutes. 
              100% free forever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="https://github.com/saurity/saurity/releases/latest" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                Download v1.0.0 Free
              </a>
              <a 
                href="https://github.com/saurity/saurity" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-md text-primary-600 bg-white border-2 border-primary-600 hover:bg-primary-50 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>GPL v2 Licensed</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>5 Minute Setup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-700">Free Forever</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-primary-600 mb-2">&lt;0.5ms</div>
              <div className="text-gray-700">Performance Overhead</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-primary-600 mb-2">0</div>
              <div className="text-gray-700">False Positives</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-primary-600 mb-2">5 min</div>
              <div className="text-gray-700">Installation Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Steps */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Install in 3 Easy Steps</h2>
            <p className="section-subheading">
              Get Saurity running on your WordPress site in under 5 minutes
            </p>

            <div className="space-y-8 mt-12">
              {/* Step 1 */}
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Download the Plugin</h3>
                    <p className="text-gray-700 mb-4">
                      Click the download button above to get the latest version from GitHub Releases.
                      The file will be named <code>saurity-v1.0.0.zip</code>
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm">
                      wget https://github.com/saurity/saurity/releases/latest/download/saurity.zip
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Install & Activate</h3>
                    <p className="text-gray-700 mb-4">
                      Go to <strong>Plugins → Add New → Upload Plugin</strong> in your WordPress admin.
                      Upload the ZIP file and click <strong>Install Now</strong>, then <strong>Activate</strong>.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded p-4">
                      <p className="text-sm text-blue-900">
                        <strong>Alternative:</strong> Extract and upload the <code>saurity</code> folder to 
                        <code>/wp-content/plugins/</code> via FTP.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    ✓
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Configure (Optional)</h3>
                    <p className="text-gray-700 mb-4">
                      Saurity works out of the box with smart defaults. Optionally customize settings at 
                      <strong> Settings → Saurity</strong>.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                      <p className="text-sm text-yellow-900">
                        <strong>Important:</strong> Save your Emergency Bypass URL displayed after activation!
                        This ensures you can always access your admin panel.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">System Requirements</h2>
            <p className="section-subheading">
              Works on all modern WordPress installations
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Minimum Requirements</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>WordPress 6.0 or higher</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>PHP 8.0 or higher</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>MySQL 5.7+ or MariaDB 10.2+</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Writable uploads directory</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4">Recommended</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Latest WordPress version</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>PHP 8.2 or higher</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>HTTPS enabled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>Regular backups configured</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Shared Hosting Compatible
              </h4>
              <p className="text-gray-700">
                Saurity is optimized for shared hosting with minimal resource usage. 
                Works perfectly on budget hosting plans from Bluehost, SiteGround, HostGator, and others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">What&apos;s Included in v1.0.0</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg mb-3">🔒 Security Features</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Smart Rate Limiting (Login, POST, XML-RPC, Comments)</li>
                  <li>• Advanced Firewall (SQLi, XSS Protection)</li>
                  <li>• IP Management (Allowlist/Blocklist with CIDR)</li>
                  <li>• Honeypot Bot Detection</li>
                  <li>• Tarpitting (Attack Slowdown)</li>
                  <li>• Subnet Blocking (Anti-Botnet)</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg mb-3">⚙️ Management Features</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>• Activity Logging with Search</li>
                  <li>• Email Notifications</li>
                  <li>• CSV Import/Export</li>
                  <li>• 3-Tier Emergency Recovery</li>
                  <li>• Dashboard Widget</li>
                  <li>• Configurable Settings</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
                View All Features →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">After Installation</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Link href="/login-security" className="feature-card group text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600">
                  Read Documentation
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn about all features and configuration options
                </p>
              </Link>

              <a 
                href="https://github.com/saurity/saurity#configuration" 
                className="feature-card group text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600">
                  Configure Settings
                </h3>
                <p className="text-gray-600 text-sm">
                  Customize rate limits and protection levels
                </p>
              </a>

              <a 
                href="https://github.com/saurity/saurity/issues" 
                className="feature-card group text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600">
                  Get Support
                </h3>
                <p className="text-gray-600 text-sm">
                  Questions? Report issues on GitHub
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Secure Your WordPress Site?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Join thousands of WordPress sites protected by Saurity. 
              Download now and install in 5 minutes.
            </p>
            <a 
              href="https://github.com/saurity/saurity/releases/latest" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
              </svg>
              Download v1.0.0 Free
            </a>
            <p className="text-sm text-primary-100 mt-4">
              No credit card • No account • No strings attached
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
