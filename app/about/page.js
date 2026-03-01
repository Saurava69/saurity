export const metadata = {
  title: 'About Saurity v1.1.0 | Enterprise WordPress Security',
  description: 'Learn about Saurity v1.1.0, the enterprise WordPress security plugin with cloud integration, GeoIP blocking, threat intelligence, and zero false positives.',
  alternates: {
    canonical: 'https://www.saurity.com/about',
  },
}

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold mb-4">
              Version 1.1.0 - Cloud Integration Release
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Saurity
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              WordPress security built by engineers who have been locked out one too many times.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Our Mission</h2>
            <p className="section-subheading">
              Build WordPress security tools that prioritize reliability and accessibility over aggressive blocking.
            </p>
            
            <div className="mt-12 space-y-6">
              <p className="text-lg text-gray-700">
                Saurity was born from frustration with WordPress security plugins that lock out legitimate admins 
                in their quest to stop attackers. We believe security should protect your site without creating 
                new problems.
              </p>
              
              <p className="text-lg text-gray-700">
                Too many security plugins prioritize features over stability. They add aggressive blocking, 
                instant IP bans, and complex firewall rules that break sites and lock out users. When something 
                goes wrong, you&apos;re left scrambling to regain access.
              </p>
              
              <p className="text-lg text-gray-700">
                Saurity takes a different approach: fail-safe architecture, progressive rate limiting, and 
                multiple recovery mechanisms ensure you never lose access to your WordPress admin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* v1.1.0 Highlights */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">What&apos;s New in v1.1.0</h2>
            <p className="text-xl text-blue-100 mb-12">
              Cloud-powered protection with enterprise-grade threat intelligence
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Cloudflare Integration</h3>
                <p className="text-blue-100 text-sm">Automatic blocklist sync and DDoS coordination</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">GeoIP Blocking</h3>
                <p className="text-blue-100 text-sm">Country-based access control with multiple providers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Threat Intelligence</h3>
                <p className="text-blue-100 text-sm">Real-time feeds from AbuseIPDB and Spamhaus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Our Philosophy</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4">Stability First</h3>
                <p className="text-gray-700">
                  A security plugin that locks you out of your site is worse than no security at all. 
                  We prioritize accessibility and reliability above aggressive features.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4">Fail-Safe Design</h3>
                <p className="text-gray-700">
                  When in doubt, allow access. If Saurity encounters an error or uncertainty, it automatically 
                  disables itself rather than blocking legitimate users.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4">Technical Honesty</h3>
                <p className="text-gray-700">
                  No marketing hype, no exaggerated claims. We document what Saurity does and doesn&apos;t do. 
                  Security is about managing risk, not eliminating it.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-semibold mb-4">Performance Matters</h3>
                <p className="text-gray-700">
                  Heavy security plugins slow down sites. Saurity uses transients, single queries, and 
                  efficient algorithms to provide protection without performance penalties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">What Makes Us Different</h2>
            
            <div className="space-y-8 mt-12">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Zero Lockout Guarantee</h3>
                  <p className="text-gray-700">
                    Emergency bypass URL, global kill switch, auto-disable detection, and fail-open architecture 
                    ensure you always have access. Unlike other plugins that can brick your admin panel.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cloud Integration (NEW in v1.1.0)</h3>
                  <p className="text-gray-700">
                    Cloudflare API integration for automatic blocklist sync, GeoIP services for country-based blocking, 
                    and threat intelligence feeds from AbuseIPDB and Spamhaus. Enterprise protection without enterprise cost.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Progressive Rate Limiting</h3>
                  <p className="text-gray-700">
                    Exponential delays instead of instant blocks. Stops brute force attacks while protecting 
                    legitimate users who mistype passwords. Most plugins block immediately, creating false positives.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Shared Hosting Friendly</h3>
                  <p className="text-gray-700">
                    Near-zero performance overhead (&lt;0.5ms). No complex database queries, no file scanning, no heavy processing. 
                    Works perfectly on budget shared hosting without slowing down your site.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Open Source & Free</h3>
                  <p className="text-gray-700">
                    GPL v2 licensed. No premium upsells, no feature limitations, no license keys. 
                    The full plugin is free forever. Contribute on GitHub if you find it useful.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Approach */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Development Approach</h2>
            
            <div className="mt-12 space-y-6">
              <div className="bg-white rounded-lg p-6 border-l-4 border-primary-600">
                <h3 className="text-xl font-semibold mb-3">v1.1.0: Cloud Integration Release</h3>
                <p className="text-gray-700">
                  Version 1.1.0 adds enterprise cloud features: Cloudflare integration, GeoIP blocking, 
                  threat intelligence feeds, GDPR compliance tools, and advanced PDF reports. 
                  All while maintaining zero false positives.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border-l-4 border-primary-600">
                <h3 className="text-xl font-semibold mb-3">Test Everything</h3>
                <p className="text-gray-700">
                  Every feature is tested on multiple hosting environments: shared hosting, VPS, managed WordPress, 
                  and local development. We test edge cases, failure scenarios, and recovery mechanisms.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border-l-4 border-primary-600">
                <h3 className="text-xl font-semibold mb-3">Listen to Users</h3>
                <p className="text-gray-700">
                  Development is driven by real-world feedback. If users report issues or suggest improvements, 
                  we investigate thoroughly. Open source means transparent development and community input.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border-l-4 border-primary-600">
                <h3 className="text-xl font-semibold mb-3">Document Honestly</h3>
                <p className="text-gray-700">
                  Clear documentation about what works, what doesn&apos;t, and known limitations. No hiding 
                  behind vague marketing speak. If something isn&apos;t ready, we say so explicitly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Set */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">v1.1.0 Feature Set</h2>
            <p className="section-subheading">
              Enterprise security features now available
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">✅ Cloud Integration (NEW)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Cloudflare API integration</li>
                  <li>• GeoIP country blocking</li>
                  <li>• Threat intelligence feeds</li>
                  <li>• Automatic blocklist sync</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">✅ Smart Rate Limiting</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Login protection (progressive delays)</li>
                  <li>• POST flood prevention (two-tier)</li>
                  <li>• XML-RPC abuse protection</li>
                  <li>• Comment rate limiting</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">✅ Advanced Firewall</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• SQL injection detection</li>
                  <li>• XSS protection</li>
                  <li>• Malicious user agent blocking</li>
                  <li>• Sensitive path protection</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">✅ Advanced Detection</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Honeypot bot detection</li>
                  <li>• Timing analysis</li>
                  <li>• Tarpitting (attack slowdown)</li>
                  <li>• Subnet blocking (anti-botnet)</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">✅ Privacy & Compliance (NEW)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• GDPR compliance tools</li>
                  <li>• Privacy policy integration</li>
                  <li>• Data retention controls</li>
                  <li>• Consent management</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">✅ Reporting (NEW)</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• PDF security reports</li>
                  <li>• Scheduled email reports</li>
                  <li>• Executive dashboards</li>
                  <li>• Trend analysis</li>
                </ul>
              </div>
            </div>

            <div className="mt-12 bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-lg">
              <h3 className="text-xl font-semibold mb-3 text-primary-900">Future Roadmap (v1.2+)</h3>
              <p className="text-gray-700 mb-4">
                Coming in future releases:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Two-Factor Authentication (2FA)</li>
                <li>• Enhanced session management</li>
                <li>• File integrity monitoring</li>
                <li>• Multi-site network support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Join the Community
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Saurity is open source and community-driven. Contribute code, report bugs, 
              or suggest features on GitHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://github.com/saurity/saurity" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
              <a 
                href="https://github.com/saurity/saurity/issues" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-primary-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Report an Issue
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-heading">Get in Touch</h2>
            <p className="text-xl text-gray-600 mb-8">
              Questions, feedback, or security concerns? We&apos;re here to help.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-lg mb-2">Bug Reports</h3>
                <p className="text-gray-600 mb-4 text-sm">Found a bug or security issue?</p>
                <a 
                  href="https://github.com/saurity/saurity/issues" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open an Issue →
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-lg mb-2">Feature Requests</h3>
                <p className="text-gray-600 mb-4 text-sm">Have an idea for improvement?</p>
                <a 
                  href="https://github.com/saurity/saurity/discussions" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Start Discussion →
                </a>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-lg mb-2">Documentation</h3>
                <p className="text-gray-600 mb-4 text-sm">Need help getting started?</p>
                <a 
                  href="https://github.com/saurity/saurity#readme" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the Docs →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}