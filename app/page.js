import Link from 'next/link'
import Image from 'next/image'
import JsonLd, { generateSoftwareSchema, generateOrganizationSchema } from '@/components/JsonLd'

export const metadata = {
  title: 'Saurity - Enterprise WordPress Security Plugin v1.0.0',
  description: 'Saurity v1.0.0 - Enterprise WordPress security with zero false positives. Smart rate limiting, advanced firewall, honeypot detection. Download free → Never locks out admins.',
  keywords: 'WordPress security, brute force protection, rate limiting, firewall, IP blocking, spam prevention, DDoS protection, XML-RPC protection, WordPress hardening',
  alternates: {
    canonical: 'https://www.saurity.com',
  },
  openGraph: {
    title: 'Saurity v1.0.0 - Enterprise WordPress Security Plugin',
    description: 'Enterprise-grade WordPress security with zero false positives. Smart rate limiting, advanced firewall, honeypot detection. Download free →',
    images: ['/HomePage1200_600.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saurity v1.0.0 - Enterprise WordPress Security',
    description: 'Enterprise-grade WordPress security with zero false positives. Smart rate limiting, advanced firewall, honeypot detection.',
    images: ['/HomePage1200_600.webp'],
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
                <div className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  🎉 NEW: Version 1.0.0 Released
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Enterprise WordPress Security - Zero False Positives
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                  Smart rate limiting, advanced firewall, honeypot detection, and 3-tier emergency recovery. 
                  Production-ready. Never locks out admins.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://github.com/saurity/saurity/releases" 
                    className="btn-primary text-lg px-8 py-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download v1.0.0 Free
                  </a>
                  <a 
                    href="https://github.com/saurity/saurity#readme" 
                    className="btn-secondary text-lg px-8 py-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Documentation
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  WordPress 6.0+ • PHP 8.0+ • MySQL 5.7+ • 100% Free & Open Source
                </p>
                <div className="flex items-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Zero Lockouts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">&lt; 0.5ms Overhead</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Shared Hosting</span>
                  </div>
                </div>
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
                Download v1.0.0
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

      {/* v1.0.0 Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-heading">Enterprise Features in v1.0.0</h2>
              <p className="section-subheading mx-auto">
                Production-ready security with advanced protection and zero false positives
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="feature-card">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Rate Limiting</h3>
                <p className="text-gray-600">
                  Login, POST, XML-RPC, and comment protection with two-tier system for NAT/office safety
                </p>
              </div>

              <div className="feature-card">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Firewall</h3>
                <p className="text-gray-600">
                  SQL injection, XSS protection, malicious user agent blocking, and sensitive path protection
                </p>
              </div>

              <div className="feature-card">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">IP Management</h3>
                <p className="text-gray-600">
                  Allowlist/blocklist with CIDR support, CSV import/export, and metadata tracking
                </p>
              </div>

              <div className="feature-card">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Tarpitting</h3>
                <p className="text-gray-600">
                  Delays blocks to waste attacker resources - slows 10,000 attempts/min to just 20
                </p>
              </div>

              <div className="feature-card">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Activity Logging</h3>
                <p className="text-gray-600">
                  Real-time logging with search, filters, CSV export, and auto-cleanup
                </p>
              </div>

              <div className="feature-card">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Honeypot Detection</h3>
                <p className="text-gray-600">
                  Hidden fields catch form-filling bots with 100% accuracy - zero false positives
                </p>
              </div>

              <div className="feature-card">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Subnet Blocking</h3>
                <p className="text-gray-600">
                  Defeats botnets that rotate IPs - blocks entire /24 subnets automatically
                </p>
              </div>

              <div className="feature-card">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Email Notifications</h3>
                <p className="text-gray-600">
                  Instant alerts for critical security events with configurable thresholds
                </p>
              </div>

              <div className="feature-card">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">3-Tier Recovery</h3>
                <p className="text-gray-600">
                  Kill switch, emergency bypass URL, and manual disable - never get locked out
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="section-heading">Explore Core Features</h2>
            <p className="section-subheading mx-auto">
              Deep dive into how Saurity protects your WordPress site
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
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
                Two-tier system with per-IP and per-device tracking. File-based for maximum speed.
              </p>
              <span className="text-primary-600 font-medium">
                Learn more →
              </span>
            </Link>

            <Link href="/firewall" className="feature-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                Advanced Firewall
              </h3>
              <p className="text-gray-600 mb-4">
                SQL injection, XSS protection, and malicious user agent blocking. Enterprise-grade security.
              </p>
              <span className="text-primary-600 font-medium">
                Learn more →
              </span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Link href="/features" className="feature-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                All Features
              </h3>
              <p className="text-gray-600 mb-4">
                Complete feature list, comparison table, and performance benchmarks.
              </p>
              <span className="text-primary-600 font-medium">
                View all features →
              </span>
            </Link>

            <Link href="/blog" className="feature-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                Security Blog
              </h3>
              <p className="text-gray-600 mb-4">
                Latest WordPress security insights, best practices, and industry updates.
              </p>
              <span className="text-primary-600 font-medium">
                Read articles →
              </span>
            </Link>

            <Link href="/faq" className="feature-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                FAQ
              </h3>
              <p className="text-gray-600 mb-4">
                Common questions about installation, configuration, compatibility, and troubleshooting.
              </p>
              <span className="text-primary-600 font-medium">
                View FAQ →
              </span>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/use-cases" className="feature-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                Use Cases
              </h3>
              <p className="text-gray-600 mb-4">
                E-commerce, membership sites, enterprise, and more. See how Saurity fits your needs.
              </p>
              <span className="text-primary-600 font-medium">
                Explore use cases →
              </span>
            </Link>

            <Link href="/vs/wordfence" className="feature-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                vs Wordfence
              </h3>
              <p className="text-gray-600 mb-4">
                Compare Saurity with Wordfence. Features, pricing, and why users are switching.
              </p>
              <span className="text-primary-600 font-medium">
                See comparison →
              </span>
            </Link>

            <Link href="/changelog" className="feature-card group">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                Changelog
              </h3>
              <p className="text-gray-600 mb-4">
                Track all updates, new features, and improvements in every Saurity release.
              </p>
              <span className="text-primary-600 font-medium">
                View changelog →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
