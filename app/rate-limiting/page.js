import Link from 'next/link'
import Image from 'next/image'
import JsonLd, { generateBreadcrumbSchema, generateFAQSchema } from '@/components/JsonLd'

export const metadata = {
  title: 'WordPress Rate Limiting | Progressive Throttling',
  description: 'Learn how Saurity uses progressive rate limiting with sliding windows to stop WordPress brute force attacks without blocking legitimate users.',
  alternates: {
    canonical: 'https://saurity.com/rate-limiting',
  },
}

const breadcrumbs = [
  { name: 'Home', url: 'https://saurity.com' },
  { name: 'Rate Limiting', url: 'https://saurity.com/rate-limiting' },
]

const faqs = [
  {
    question: 'What is rate limiting?',
    answer: 'Rate limiting controls how many requests (like login attempts) can be made in a specific time period. It prevents brute force attacks by limiting the rate at which attackers can try password combinations.',
  },
  {
    question: 'How does sliding window rate limiting work?',
    answer: 'Sliding window rate limiting tracks requests within a rolling time window. Unlike fixed windows that reset at specific times, sliding windows continuously track the last N minutes of activity, providing smoother and more accurate rate limiting.',
  },
  {
    question: 'Why use transients for rate limiting?',
    answer: 'WordPress transients provide high-performance temporary storage that automatically expires. This eliminates the need for custom database tables and scheduled cleanup tasks, while still providing the speed needed for rate limiting checks on every login attempt.',
  },
]

export default function RateLimitingPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={generateFAQSchema(faqs)} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              WordPress Rate Limiting Done Right
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Progressive throttling with sliding windows stops brute force attacks while protecting legitimate users from false positives.
            </p>
            <a 
              href="https://github.com/saurity/saurity#readme" 
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Documentation
            </a>
          </div>
        </div>
      </section>

      {/* What is Rate Limiting */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">What is Rate Limiting?</h2>
            <p className="section-subheading">
              Rate limiting controls the frequency of actions to prevent abuse while maintaining accessibility.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">The Problem</h3>
                <p className="text-gray-700 mb-4">
                  Brute force attacks attempt thousands of login combinations per minute. Without rate limiting, attackers can try:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>100+ passwords per minute</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>6,000+ attempts per hour</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>144,000+ attempts per day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Unlimited attempts until successful</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">The Solution</h3>
                <p className="text-gray-700 mb-4">
                  Rate limiting restricts attempts to a reasonable threshold:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>5 attempts per 10 minutes (default)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Exponential delays after threshold</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Hard block only after extreme abuse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Legitimate users rarely affected</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Window vs Fixed Window */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Sliding Window vs. Fixed Window</h2>
            <p className="section-subheading">
              Saurity uses sliding window rate limiting for more accurate and fair throttling.
            </p>

            <div className="flex justify-center my-12">
              <Image 
                src="/ratelimiting800_800.webp"
                alt="Visual comparison of sliding window vs fixed window rate limiting showing how Saurity prevents boundary exploits"
                width={800}
                height={800}
                className="rounded-lg shadow-xl"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white rounded-lg p-8 border-2 border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">Fixed Window (Not Used)</h3>
                <div className="mb-4">
                  <div className="bg-gray-100 p-4 rounded mb-2">
                    <p className="text-sm font-mono text-gray-700">Window 1: 12:00-12:10</p>
                    <p className="text-sm text-gray-600">5 attempts allowed</p>
                  </div>
                  <div className="bg-gray-100 p-4 rounded">
                    <p className="text-sm font-mono text-gray-700">Window 2: 12:10-12:20</p>
                    <p className="text-sm text-gray-600">5 attempts allowed</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Problem:</strong> Attackers can make 10 attempts by timing requests around window boundaries (5 at 12:09, 5 at 12:10).
                </p>
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-sm text-red-800">❌ Exploitable boundary loophole</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-2 border-primary-600">
                <h3 className="text-xl font-semibold mb-4 text-primary-700">Sliding Window (Saurity)</h3>
                <div className="mb-4">
                  <div className="bg-primary-50 p-4 rounded mb-2">
                    <p className="text-sm font-mono text-primary-900">Any 10-minute period</p>
                    <p className="text-sm text-primary-700">5 attempts maximum</p>
                  </div>
                  <div className="bg-primary-50 p-4 rounded">
                    <p className="text-sm font-mono text-primary-900">Continuously tracked</p>
                    <p className="text-sm text-primary-700">No boundary resets</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  <strong>Benefit:</strong> Tracks the last 10 minutes continuously. No matter when attempts are made, only 5 are allowed in any 10-minute span.
                </p>
                <div className="bg-green-50 border border-green-200 rounded p-3">
                  <p className="text-sm text-green-800">✓ No exploitable loopholes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Saurity Implements Rate Limiting */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">How Saurity Implements Rate Limiting</h2>
            <p className="section-subheading">
              Three-layer approach: tracking, throttling, and blocking.
            </p>

            <div className="space-y-8 mt-12">
              {/* Layer 1: Tracking */}
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Per-IP Attempt Tracking</h3>
                    <p className="text-gray-700 mb-4">
                      Every failed login is tracked by IP address using WordPress transients with automatic expiration.
                    </p>
                    <div className="bg-white border border-gray-200 rounded p-4 font-mono text-sm">
                      <div className="text-gray-600">// Transient key structure</div>
                      <div className="text-blue-600">saurity_login_attempts_192.168.1.1</div>
                      <div className="text-gray-600 mt-2">// Value: array of timestamps</div>
                      <div className="text-green-600">[1704628800, 1704628860, 1704628920, ...]</div>
                      <div className="text-gray-600 mt-2">// Auto-expires after window (600 seconds)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 2: Progressive Delays */}
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-yellow-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Exponential Backoff</h3>
                    <p className="text-gray-700 mb-4">
                      Once threshold is exceeded, delays increase exponentially:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded border border-gray-200 text-center">
                        <p className="text-sm text-gray-600 mb-1">Attempt 6</p>
                        <p className="text-3xl font-bold text-yellow-600">2s</p>
                      </div>
                      <div className="bg-white p-4 rounded border border-gray-200 text-center">
                        <p className="text-sm text-gray-600 mb-1">Attempt 7</p>
                        <p className="text-3xl font-bold text-orange-600">4s</p>
                      </div>
                      <div className="bg-white p-4 rounded border border-gray-200 text-center">
                        <p className="text-sm text-gray-600 mb-1">Attempt 8</p>
                        <p className="text-3xl font-bold text-red-600">8s</p>
                      </div>
                      <div className="bg-white p-4 rounded border border-gray-200 text-center">
                        <p className="text-sm text-gray-600 mb-1">Attempt 9</p>
                        <p className="text-3xl font-bold text-red-700">16s</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      Formula: <code className="bg-gray-200 px-2 py-1 rounded">delay = base_delay × 2^(attempts - threshold)</code>
                    </p>
                  </div>
                </div>
              </div>

              {/* Layer 3: Hard Blocking */}
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-red-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Hard Block (Last Resort)</h3>
                    <p className="text-gray-700 mb-4">
                      Only after extreme abuse (20+ attempts by default) is the IP temporarily hard-blocked.
                    </p>
                    <div className="bg-white border border-red-200 rounded p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 font-semibold">Block Threshold:</span>
                        <span className="text-red-600 font-bold">20 attempts</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700 font-semibold">Block Duration:</span>
                        <span className="text-red-600 font-bold">1 hour</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700 font-semibold">Implementation:</span>
                        <span className="text-gray-600 text-sm">Transient flag</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      Hard blocks are deliberately conservative. Most attacks are stopped by progressive delays long before reaching this threshold.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Transients */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Why Use WordPress Transients?</h2>
            <p className="section-subheading">
              Transients provide the perfect balance of performance, simplicity, and reliability for rate limiting.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white rounded-lg p-6 border border-green-200">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Advantages
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <div>
                      <strong className="text-gray-900">No Custom Tables</strong>
                      <p className="text-sm text-gray-600">Uses WordPress core functionality, no schema changes</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <div>
                      <strong className="text-gray-900">Automatic Expiration</strong>
                      <p className="text-sm text-gray-600">Data cleans itself up, no cron jobs needed</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <div>
                      <strong className="text-gray-900">High Performance</strong>
                      <p className="text-sm text-gray-600">Optimized for fast reads, can use object cache</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <div>
                      <strong className="text-gray-900">Clean Uninstall</strong>
                      <p className="text-sm text-gray-600">Automatically removed with plugin deletion</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 border border-yellow-200">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Considerations
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">⚠</span>
                    <div>
                      <strong className="text-gray-900">Cache Clearing</strong>
                      <p className="text-sm text-gray-600">Aggressive cache clearing may reset counters early</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">⚠</span>
                    <div>
                      <strong className="text-gray-900">Not Persistent</strong>
                      <p className="text-sm text-gray-600">Counters reset if cache is flushed (by design)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">⚠</span>
                    <div>
                      <strong className="text-gray-900">Shared Hosting Limits</strong>
                      <p className="text-sm text-gray-600">Some hosts restrict transient size, but 5-20 timestamps fit easily</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> These are fail-safe features, not bugs. If cache clears, counters reset and legitimate users can access immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Per-IP vs Per-User */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Per-IP vs. Per-User Rate Limiting</h2>
            <p className="section-subheading">
              Saurity uses per-IP tracking to protect against distributed attacks while maintaining simplicity.
            </p>

            <div className="mt-12 space-y-6">
              <div className="bg-primary-50 border-l-4 border-primary-600 p-6">
                <h3 className="text-xl font-semibold mb-3">Per-IP Tracking (Saurity)</h3>
                <p className="text-gray-700 mb-4">
                  Tracks failed attempts by IP address, regardless of username attempted.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">✓ Advantages</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Simple implementation</li>
                      <li>• Stops distributed attacks from single IP</li>
                      <li>• No username enumeration needed</li>
                      <li>• Works even for non-existent users</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-yellow-700 mb-2">⚠ Limitations</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Shared IPs (offices, VPNs) affect multiple users</li>
                      <li>• Distributed attacks from many IPs harder to stop</li>
                      <li>• NAT networks may share IP</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border-l-4 border-gray-400 p-6">
                <h3 className="text-xl font-semibold mb-3">Per-User Tracking (Not Used)</h3>
                <p className="text-gray-700 mb-4">
                  Would track failed attempts per username, regardless of source IP.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">✓ Advantages</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Better for shared IPs</li>
                      <li>• More granular control</li>
                      <li>• Each user has own limit</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">✗ Disadvantages</h4>
                    <ul className="text-sm space-y-1 text-gray-700">
                      <li>• Distributed attacks from many IPs unaffected</li>
                      <li>• Username enumeration risk</li>
                      <li>• More complex implementation</li>
                      <li>• Doesn&apos;t protect non-existent users</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded p-6">
                <h4 className="font-semibold text-lg mb-2">Why Per-IP is Sufficient</h4>
                <p className="text-gray-700">
                  For v0.1, per-IP tracking provides the best balance of security and simplicity. Most brute force attacks come from single IPs or small botnets. 
                  Per-user tracking may be added in future versions for high-security environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Rate Limiting Configuration</h2>
            <p className="section-subheading">
              All parameters are configurable to match your security requirements.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-lg mb-3">Attempts Threshold</h3>
                <p className="text-gray-600 mb-3">Number of failed attempts before throttling begins</p>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Range</span>
                    <span className="font-mono text-sm">1-20</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Default</span>
                    <span className="font-mono text-sm font-bold text-primary-600">5</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-lg mb-3">Time Window</h3>
                <p className="text-gray-600 mb-3">Duration of the sliding window in seconds</p>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Range</span>
                    <span className="font-mono text-sm">60-3600s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Default</span>
                    <span className="font-mono text-sm font-bold text-primary-600">600s (10 min)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-lg mb-3">Progressive Delay</h3>
                <p className="text-gray-600 mb-3">Base delay for exponential backoff</p>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Range</span>
                    <span className="font-mono text-sm">1-10s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Default</span>
                    <span className="font-mono text-sm font-bold text-primary-600">2s</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-lg mb-3">Hard Block Threshold</h3>
                <p className="text-gray-600 mb-3">Attempts before temporary IP block</p>
                <div className="bg-gray-50 p-4 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Range</span>
                    <span className="font-mono text-sm">10-100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Default</span>
                    <span className="font-mono text-sm font-bold text-primary-600">20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Frequently Asked Questions</h2>
            
            <div className="space-y-6 mt-12">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Get Started with Saurity
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Progressive rate limiting that stops attacks without blocking legitimate users.
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
              <Link 
                href="/login-security" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-primary-700 transition-colors"
              >
                Learn About Login Security
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}