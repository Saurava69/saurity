import Link from 'next/link'
import Image from 'next/image'
import JsonLd, { generateBreadcrumbSchema, generateFAQSchema } from '@/components/JsonLd'

export const metadata = {
  title: 'WordPress Login Security & Brute Force Protection',
  description: 'Protect WordPress logins with progressive rate limiting that stops brute force attacks without locking out admins. Learn how Saurity prevents unauthorized access.',
  alternates: {
    canonical: 'https://saurity.com/login-security',
  },
  openGraph: {
    title: 'WordPress Login Security Without Admin Lockouts',
    description: 'Progressive rate limiting for WordPress login protection. Stops brute force attacks while protecting legitimate users.',
    url: 'https://saurity.com/login-security',
  },
}

const breadcrumbs = [
  { name: 'Home', url: 'https://saurity.com' },
  { name: 'Login Security', url: 'https://saurity.com/login-security' },
]

const faqs = [
  {
    question: 'What is WordPress login security?',
    answer: 'WordPress login security protects your wp-admin area from unauthorized access using techniques like rate limiting, progressive delays, and IP-based blocking to prevent brute force attacks while maintaining accessibility for legitimate users.',
  },
  {
    question: 'How does Saurity prevent brute force attacks?',
    answer: 'Saurity uses progressive rate limiting with exponential delays. After 5 failed attempts in 10 minutes, each subsequent attempt is delayed by 2 seconds exponentially. After 20 attempts, the IP is hard-blocked for 1 hour. This stops automated attacks while rarely affecting real users.',
  },
  {
    question: 'Will Saurity lock me out of my WordPress admin?',
    answer: 'No. Saurity has a zero admin lockout guarantee with multiple fail-safes: automatic disable on lockout detection, emergency bypass URL, global kill switch, and fail-open architecture. If something goes wrong, Saurity disables itself rather than blocking access.',
  },
  {
    question: 'What is progressive rate limiting?',
    answer: 'Progressive rate limiting adds increasing delays after failed login attempts rather than blocking immediately. This approach reduces false positives (legitimate users with typos) while still effectively stopping brute force attacks through exponential time penalties.',
  },
  {
    question: 'How is Saurity different from other WordPress security plugins?',
    answer: 'Saurity prioritizes stability over features. Unlike plugins that instantly block IPs or require CAPTCHA, Saurity uses progressive delays, fail-safe architecture, and includes emergency recovery tools. It focuses solely on login security without bloat.',
  },
]

export default function LoginSecurityPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={generateFAQSchema(faqs)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              WordPress Login Security That Never Locks You Out
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Progressive rate limiting stops brute force attacks while protecting legitimate users. 
              No instant blocks, no admin lockouts, no downtime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://github.com/saurity/saurity/releases" 
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Free Plugin
              </a>
              <a 
                href="https://github.com/saurity/saurity#readme" 
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Brute Force Attacks */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Understanding WordPress Brute Force Attacks</h2>
            <p className="section-subheading">
              Brute force attacks attempt thousands of username/password combinations to gain unauthorized access to wp-admin.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">How Attacks Work</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 font-bold text-xl">1.</span>
                    <span>Automated bots scan for WordPress sites</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 font-bold text-xl">2.</span>
                    <span>Try common usernames (admin, user, site name)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 font-bold text-xl">3.</span>
                    <span>Test thousands of password combinations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 font-bold text-xl">4.</span>
                    <span>Attempt 10-100+ logins per minute</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary-600 font-bold text-xl">5.</span>
                    <span>Continue until blocked or successful</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">Why They Succeed</h3>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 mb-2">Weak Passwords</h4>
                    <p className="text-red-800 text-sm">Common passwords like password123, admin123, or sitename2024 are cracked instantly.</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 mb-2">No Rate Limiting</h4>
                    <p className="text-orange-800 text-sm">Without protection, attackers can try unlimited login attempts without consequences.</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-900 mb-2">Predictable Usernames</h4>
                    <p className="text-yellow-800 text-sm">Default usernames like admin or user reduce the attacker&apos;s work by 50%.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Saurity Protects Logins */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">How Saurity Protects WordPress Logins</h2>
            <p className="section-subheading">
              Multi-layered defense using progressive rate limiting, intelligent delays, and fail-safe mechanisms.
            </p>

            <div className="space-y-12 mt-12">
              {/* Layer 1 */}
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Per-IP Rate Limiting</h3>
                    <p className="text-gray-700 mb-4">
                      Tracks failed login attempts per IP address using a sliding window algorithm. 
                      Default: 5 attempts per 10 minutes before throttling begins.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded p-4">
                      <p className="text-sm text-blue-900">
                        <strong>Technical:</strong> Uses WordPress transients for high-performance counting without database overhead. Automatically resets after the time window expires.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 2 */}
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Progressive Delays</h3>
                    <p className="text-gray-700 mb-4">
                      After rate limit threshold, each failed attempt adds an exponential delay:
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-sm font-semibold text-gray-900">Attempt 6</p>
                        <p className="text-2xl font-bold text-primary-600">2s delay</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-sm font-semibold text-gray-900">Attempt 7</p>
                        <p className="text-2xl font-bold text-primary-600">4s delay</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-sm font-semibold text-gray-900">Attempt 8</p>
                        <p className="text-2xl font-bold text-primary-600">8s delay</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-sm font-semibold text-gray-900">Attempt 9</p>
                        <p className="text-2xl font-bold text-primary-600">16s delay</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      Exponential delays make brute force attacks impractically slow while rarely affecting legitimate users.
                    </p>
                  </div>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Hard Blocking (Last Resort)</h3>
                    <p className="text-gray-700 mb-4">
                      Only after extreme abuse (20+ failed attempts), the IP is temporarily blocked for 1 hour. 
                      This is rare and only catches persistent automated attacks.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                      <p className="text-sm text-yellow-900">
                        <strong>Note:</strong> Hard blocks are deliberately conservative. The goal is deterrence through delays, not aggressive blocking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 4 */}
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    ✓
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Activity Logging</h3>
                    <p className="text-gray-700 mb-4">
                      All login attempts (success and failure), throttled requests, and blocks are logged in human-readable format.
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto">
                      <div>Failed login for user &apos;admin&apos; from IP 192.168.1.1</div>
                      <div>Login throttled for IP 192.168.1.1 (6 attempts)</div>
                      <div>IP 192.168.1.100 hard blocked after 25 attempts</div>
                      <div>Successful login for user &apos;john&apos;</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zero Lockout Guarantee */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Zero Admin Lockout Guarantee</h2>
            <p className="section-subheading">
              Multiple fail-safes ensure you always have access to your WordPress admin.
            </p>

            <div className="flex justify-center my-12">
              <Image 
                src="/recovery1000_700.webp"
                alt="Emergency recovery flowchart showing multiple fail-safe mechanisms including bypass URL, kill switch, and auto-disable protection"
                width={1000}
                height={700}
                className="rounded-lg shadow-xl"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="text-xl font-semibold">Emergency Bypass URL</h3>
                </div>
                <p className="text-gray-700">
                  Secret URL shown on activation that bypasses all protection. Bookmark it for emergency access.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                  </svg>
                  <h3 className="text-xl font-semibold">Global Kill Switch</h3>
                </div>
                <p className="text-gray-700">
                  One-click disable in Settings → SAURITY. Instantly turns off all enforcement without deactivating the plugin.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h3 className="text-xl font-semibold">Auto-Disable Protection</h3>
                </div>
                <p className="text-gray-700">
                  If admin lockout is detected, Saurity automatically disables itself. Your site accessibility comes first.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <h3 className="text-xl font-semibold">File System Recovery</h3>
                </div>
                <p className="text-gray-700">
                  Simply rename the plugin folder via FTP/SSH to disable completely. No database changes needed.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Fail-Open Architecture
              </h4>
              <p className="text-gray-700">
                If Saurity encounters any error or uncertainty, it always fails open (allows access) rather than failing closed (blocking access). 
                This is fundamental to the zero-lockout guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Frequently Asked Questions</h2>
            
            <div className="space-y-6 mt-12">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Configurable Settings</h2>
            <p className="section-subheading">
              All rate limiting parameters are adjustable in Settings → SAURITY.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Rate Limit Attempts</h3>
                <p className="text-gray-600 mb-2">Number of failed attempts before throttling</p>
                <p className="text-sm text-gray-500">Range: 1-20 attempts • Default: 5</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Rate Limit Window</h3>
                <p className="text-gray-600 mb-2">Time window for counting attempts</p>
                <p className="text-sm text-gray-500">Range: 60-3600 seconds • Default: 600 (10 min)</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Hard Block Threshold</h3>
                <p className="text-gray-600 mb-2">Attempts before hard blocking IP</p>
                <p className="text-sm text-gray-500">Range: 10-100 attempts • Default: 20</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Hard Block Duration</h3>
                <p className="text-gray-600 mb-2">How long to block after threshold</p>
                <p className="text-sm text-gray-500">Range: 300-86400 seconds • Default: 3600 (1 hour)</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Progressive Delay</h3>
                <p className="text-gray-600 mb-2">Base delay for exponential backoff</p>
                <p className="text-sm text-gray-500">Range: 1-10 seconds • Default: 2</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">Kill Switch</h3>
                <p className="text-gray-600 mb-2">Globally disable all enforcement</p>
                <p className="text-sm text-gray-500">Toggle: On/Off • Default: Off</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Protect Your WordPress Logins Today
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Free, open source, and designed to never lock you out. 
              Install Saurity and stop worrying about brute force attacks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://github.com/saurity/saurity/releases" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Plugin
              </a>
              <a 
                href="https://github.com/saurity/saurity#emergency-recovery" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-primary-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Emergency Recovery Guide
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Learn More</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/rate-limiting" className="feature-card group">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600">
                  Rate Limiting Explained
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Deep dive into sliding window rate limiting and why it works better than instant blocking.
                </p>
                <span className="text-primary-600 text-sm font-medium">Read more →</span>
              </Link>

              <a 
                href="https://github.com/saurity/saurity#readme" 
                className="feature-card group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600">
                  Full Documentation
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Complete installation, configuration, and troubleshooting guide on GitHub.
                </p>
                <span className="text-primary-600 text-sm font-medium">Read docs →</span>
              </a>

              <a 
                href="https://github.com/saurity/saurity/issues" 
                className="feature-card group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600">
                  Get Support
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Have questions? Report issues or get help from the community on GitHub.
                </p>
                <span className="text-primary-600 text-sm font-medium">Open issue →</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}