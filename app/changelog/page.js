import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

export const metadata = {
  title: 'Changelog - Saurity WordPress Security Plugin | Version History',
  description: 'Complete version history and changelog for Saurity WordPress security plugin. Track new features, improvements, and bug fixes across all releases.',
  keywords: 'Saurity changelog, version history, WordPress security updates, plugin releases',
  openGraph: {
    title: 'Saurity Changelog - Version History & Updates',
    description: 'Track all Saurity WordPress security plugin updates, new features, and improvements.',
    url: 'https://www.saurity.com/changelog',
  },
  alternates: {
    canonical: 'https://www.saurity.com/changelog',
  },
}

export default function Changelog() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.saurity.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Changelog',
        item: 'https://www.saurity.com/changelog',
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Changelog
            </h1>
            <p className="text-xl opacity-90">
              Complete version history and updates for Saurity WordPress Security Plugin
            </p>
          </div>
        </section>

        {/* Changelog Content */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Version 1.0.0 */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-green-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                  v1.0.0
                </span>
                <span className="text-slate-600">January 11, 2026</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Latest Release
                </span>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-green-600">
                <h2 className="text-3xl font-bold mb-4 text-slate-900">
                  🎉 Production Release - Enterprise Ready
                </h2>
                <p className="text-lg text-slate-700 mb-6">
                  Major release with enterprise-grade features, advanced protection, and zero false positives.
                  Production-tested and battle-hardened.
                </p>

                <div className="space-y-6">
                  {/* New Features */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-green-800">✨ New Features</h3>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">+</span>
                        <span><strong>Advanced Firewall</strong> - SQL injection, XSS protection, malicious user agent blocking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">+</span>
                        <span><strong>Honeypot Detection</strong> - Hidden fields catch form-filling bots with 100% accuracy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">+</span>
                        <span><strong>Subnet Blocking</strong> - Automatic /24 subnet bans defeat botnet IP rotation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">+</span>
                        <span><strong>Tarpitting</strong> - Delays block responses to waste attacker resources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">+</span>
                        <span><strong>Email Notifications</strong> - Instant alerts for critical security events</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">+</span>
                        <span><strong>Activity Logging</strong> - Real-time logging with search, filters, and CSV export</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">+</span>
                        <span><strong>IP Management</strong> - Allowlist/blocklist with CIDR support and CSV import/export</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">+</span>
                        <span><strong>Two-Tier Rate Limiting</strong> - Per-IP and per-device tracking for NAT/office safety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">+</span>
                        <span><strong>Comment Protection</strong> - Rate limiting for comment forms</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">+</span>
                        <span><strong>XML-RPC Protection</strong> - Rate limiting for XML-RPC endpoints</span>
                      </li>
                    </ul>
                  </div>

                  {/* Improvements */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-blue-800">🚀 Improvements</h3>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">↑</span>
                        <span><strong>Performance</strong> - Reduced overhead to &lt;0.5ms per request</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">↑</span>
                        <span><strong>Admin Dashboard</strong> - Complete redesign with modern UI</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">↑</span>
                        <span><strong>Documentation</strong> - Comprehensive inline help and tooltips</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">↑</span>
                        <span><strong>Emergency Recovery</strong> - Enhanced 3-tier system with auto-disable</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-1">↑</span>
                        <span><strong>Configuration</strong> - Simplified settings with smart defaults</span>
                      </li>
                    </ul>
                  </div>

                  {/* Security */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-purple-800">🔒 Security</h3>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">🛡️</span>
                        <span>Zero admin lockout guarantee with fail-safe architecture</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">🛡️</span>
                        <span>Progressive rate limiting prevents false positives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">🛡️</span>
                        <span>Input sanitization and validation throughout</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-600 mt-1">🛡️</span>
                        <span>Database queries use prepared statements</span>
                      </li>
                    </ul>
                  </div>

                  {/* Testing */}
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-orange-800">✅ Testing</h3>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">✓</span>
                        <span>Tested on WordPress 6.0, 6.1, 6.2, 6.3, 6.4</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">✓</span>
                        <span>Tested on PHP 8.0, 8.1, 8.2, 8.3</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">✓</span>
                        <span>Load tested with 10,000+ concurrent attacks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600 mt-1">✓</span>
                        <span>Verified on shared hosting, VPS, and dedicated servers</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <Link
                    href="/download"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download v1.0.0
                  </Link>
                </div>
              </div>
            </div>

            {/* Version 0.1 */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-slate-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                  v0.1
                </span>
                <span className="text-slate-600">November 15, 2025</span>
                <span className="bg-slate-200 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                  Initial Release
                </span>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-slate-600">
                <h2 className="text-3xl font-bold mb-4 text-slate-900">
                  🎊 Initial Public Release
                </h2>
                <p className="text-lg text-slate-700 mb-6">
                  First public release focusing on core brute force protection with zero admin lockouts.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">Core Features</h3>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-slate-600 mt-1">•</span>
                        <span>Progressive rate limiting for login attempts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-600 mt-1">•</span>
                        <span>IP-based blocking with exponential delays</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-600 mt-1">•</span>
                        <span>Emergency bypass URL for recovery</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-600 mt-1">•</span>
                        <span>Global kill switch</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-600 mt-1">•</span>
                        <span>Basic logging functionality</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-slate-600 mt-1">•</span>
                        <span>Clean uninstall with data removal</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Roadmap */}
            <div className="bg-blue-50 border-2 border-blue-200 p-8 rounded-lg">
              <h2 className="text-3xl font-bold mb-6 text-blue-900 flex items-center gap-3">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Future Roadmap
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-800">Coming in v1.1 (Q2 2026)</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span>Two-Factor Authentication (2FA) support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span>Geolocation-based restrictions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span>Advanced user session management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span>Device fingerprinting improvements</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-800">Planned for v2.0 (Q4 2026)</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span>File integrity monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span>Basic malware scanner</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span>Security hardening recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span>Automated security reports</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <p className="text-sm text-slate-600">
                    <strong>Note:</strong> Features are added only after thorough testing. 
                    Stability and zero lockouts remain the top priorities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Links Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Related Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/download"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-600"
              >
                <h3 className="font-bold text-lg mb-2">Download</h3>
                <p className="text-slate-600 text-sm">Get the latest version</p>
              </Link>
              <Link
                href="/features"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-600"
              >
                <h3 className="font-bold text-lg mb-2">Features</h3>
                <p className="text-slate-600 text-sm">See what's included</p>
              </Link>
              <a
                href="https://github.com/saurity/saurity#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-600"
              >
                <h3 className="font-bold text-lg mb-2">Documentation</h3>
                <p className="text-slate-600 text-sm">Installation & setup guide</p>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
