import Link from 'next/link'
import Image from 'next/image'
import JsonLd, { generateSoftwareSchema, generateOrganizationSchema } from '@/components/JsonLd'

export const metadata = {
  title: 'WordPress Login Security Without Admin Lockouts',
  description: 'Saurity protects WordPress logins with progressive rate limiting that never locks out admins. Zero-lockout guarantee, fail-safe design, and emergency recovery built-in.',
  alternates: {
    canonical: 'https://saurity.com',
  },
}

export default function Home() {
  return (
    <>
      <JsonLd data={generateSoftwareSchema()} />
      <JsonLd data={generateOrganizationSchema()} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  WordPress Login Security Without Admin Lockouts
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  Progressive rate limiting that stops brute force attacks without breaking your site. 
                  Zero admin lockout guarantee.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://github.com/saurity/saurity/releases" 
                    className="btn-primary text-lg px-8 py-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Free Plugin
                  </a>
                  <a 
                    href="https://github.com/saurity/saurity#readme" 
                    className="btn-secondary text-lg px-8 py-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Documentation
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Version 0.1 • WordPress 6.0+ • PHP 8.0+ • 100% Free & Open Source
                </p>
              </div>
              
              <div className="relative">
                <Image 
                  src="/HomePage1200_600.webp"
                  alt="WordPress login security dashboard showing progressive rate limiting and zero lockout guarantee"
                  width={1200}
                  height={600}
                  priority
                  className="rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">The Problem with WordPress Login Security</h2>
            <p className="section-subheading">
              Most WordPress security plugins prioritize aggressive blocking over reliability, 
              leading to false positives and admin lockouts.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="feature-card">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Admin Lockouts</h3>
                <p className="text-gray-600">
                  Aggressive plugins lock out legitimate admins, causing downtime and lost productivity.
                </p>
              </div>

              <div className="feature-card">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Performance Impact</h3>
                <p className="text-gray-600">
                  Heavy security plugins slow down your site with constant scanning and database queries.
                </p>
              </div>

              <div className="feature-card">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">False Positives</h3>
                <p className="text-gray-600">
                  Instant blocking catches legitimate users with typos or forgotten passwords.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">How Saurity Works</h2>
            <p className="section-subheading">
              Progressive rate limiting with exponential delays—not instant blocks—stops attackers 
              while protecting legitimate users.
            </p>

            <div className="space-y-8 mt-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Progressive Rate Limiting</h3>
                  <p className="text-gray-600 text-lg">
                    Instead of blocking immediately, Saurity adds exponential delays after failed login attempts. 
                    5 attempts in 10 minutes? A few seconds delay. 20 attempts? Hard block for 1 hour.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Fail-Safe Architecture</h3>
                  <p className="text-gray-600 text-lg">
                    If something goes wrong, Saurity automatically disables itself rather than blocking access. 
                    Your site stays accessible, always.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Emergency Recovery Built-In</h3>
                  <p className="text-gray-600 text-lg">
                    Kill switch, emergency bypass URL, and automatic lockout detection ensure you're never locked out. 
                    If all else fails, simply rename the plugin folder.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Saurity Different */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">What Makes Saurity Different</h2>
            <p className="section-subheading">
              Built by a WordPress security engineer who values stability over feature bloat.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-lg">Zero Admin Lockout Guarantee</h4>
                    <p className="text-gray-600">Fail-safe design prevents admin lockouts completely.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-lg">Emergency Bypass URL</h4>
                    <p className="text-gray-600">Secret URL to bypass all protection if needed.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-lg">Global Kill Switch</h4>
                    <p className="text-gray-600">Disable all enforcement instantly from admin panel.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-lg">Auto-Disable Protection</h4>
                    <p className="text-gray-600">Automatically disables if admin lockout detected.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-lg">Near-Zero Performance Overhead</h4>
                    <p className="text-gray-600">Single database query, transient-based rate limiting.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-lg">Shared Hosting Compatible</h4>
                    <p className="text-gray-600">No special requirements, works everywhere.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-lg">No Cloud Dependencies</h4>
                    <p className="text-gray-600">Everything runs on your server, no external services.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-lg">Clean Uninstall</h4>
                    <p className="text-gray-600">Removes all tables, options, and transients completely.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Who Saurity Is For</h2>
            <p className="section-subheading">
              Built for professionals who value reliability and technical honesty.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3">WordPress Developers</h3>
                <p className="text-gray-600">
                  You need security that won't break client sites or lock out users. 
                  Saurity's fail-safe design means you can sleep at night.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3">Agency Owners</h3>
                <p className="text-gray-600">
                  Managing multiple sites? Install Saurity once and trust it to work reliably 
                  without constant maintenance or support tickets.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3">Shared Hosting Users</h3>
                <p className="text-gray-600">
                  Heavy security plugins slow down shared hosting. Saurity's minimal footprint 
                  provides protection without performance penalties.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-3">Security-Conscious Site Owners</h3>
                <p className="text-gray-600">
                  Burned by aggressive plugins that locked you out? Saurity prioritizes 
                  accessibility over aggressive blocking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Saurity Does NOT Do */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">What Saurity Does NOT Do</h2>
            <p className="section-subheading">
              Honesty matters. Here's what v0.1 deliberately excludes to maintain stability.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 mt-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Intentional Limitations (v0.1)
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">×</span>
                  <span>No malware scanning or file integrity monitoring</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">×</span>
                  <span>No 2FA or OAuth (planned for future versions)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">×</span>
                  <span>No CAPTCHA or challenge-response systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">×</span>
                  <span>No geolocation or IP reputation services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">×</span>
                  <span>No email notifications (check logs manually)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">×</span>
                  <span>No dashboard widget (access via Settings → SAURITY)</span>
                </li>
              </ul>
              <p className="mt-4 text-gray-600">
                These features are excluded to ensure v0.1 is rock-solid and lockout-free. 
                Advanced features will come in future releases only after proving stability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Install Saurity in 5 Minutes
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Free, open source, and designed to never lock you out. 
              Download, activate, and configure in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://github.com/saurity/saurity/releases" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download v0.1
              </a>
              <a 
                href="https://github.com/saurity/saurity#installation" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-primary-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Installation Guide
              </a>
            </div>
            <p className="text-sm text-primary-100 mt-6">
              WordPress 6.0+ • PHP 8.0+ • MySQL 5.7+ • 100% Free
            </p>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="section-heading">Core Features</h2>
            <p className="section-subheading mx-auto">
              Everything you need for WordPress login security, nothing you don't.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/login-security" className="feature-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                Login Protection
              </h3>
              <p className="text-gray-600 mb-4">
                Progressive rate limiting with exponential delays. Stops brute force without false positives.
              </p>
              <span className="text-primary-600 font-medium">
                Learn more →
              </span>
            </Link>

            <Link href="/rate-limiting" className="feature-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                Rate Limiting
              </h3>
              <p className="text-gray-600 mb-4">
                Sliding window algorithm with per-IP and per-username tracking. Transient-based for speed.
              </p>
              <span className="text-primary-600 font-medium">
                Learn more →
              </span>
            </Link>

            <div className="feature-card">
              <h3 className="text-xl font-semibold mb-2">
                Lightweight Firewall
              </h3>
              <p className="text-gray-600 mb-4">
                Blocks XML-RPC abuse, POST floods, and sensitive path access. Minimal overhead.
              </p>
              <span className="text-gray-500 text-sm">
                Coming in future updates
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}