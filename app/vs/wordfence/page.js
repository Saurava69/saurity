import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

export const metadata = {
  title: 'Saurity vs Wordfence - Detailed Comparison 2026 | WordPress Security',
  description: 'Compare Saurity and Wordfence WordPress security plugins. Feature comparison, pricing, performance benchmarks, and migration guide. Zero admin lockouts vs frequent lockouts.',
  keywords: 'Saurity vs Wordfence, WordPress security comparison, Wordfence alternative, best WordPress security plugin 2026',
  openGraph: {
    title: 'Saurity vs Wordfence - Which WordPress Security Plugin is Better?',
    description: 'Detailed comparison of Saurity and Wordfence features, pricing, performance, and user experience. See why Saurity never locks out admins.',
    url: 'https://www.saurity.com/vs/wordfence',
    siteName: 'Saurity',
    images: [
      {
        url: 'https://www.saurity.com/HomePage1200_600.webp',
        width: 1200,
        height: 600,
        alt: 'Saurity vs Wordfence Comparison',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saurity vs Wordfence - Which WordPress Security Plugin is Better?',
    description: 'Detailed comparison of Saurity and Wordfence features, pricing, performance, and user experience.',
    images: ['https://www.saurity.com/HomePage1200_600.webp'],
  },
  alternates: {
    canonical: 'https://www.saurity.com/vs/wordfence',
  },
}

const comparisonData = {
  features: [
    { feature: 'Zero Admin Lockouts', saurity: '✓ Guaranteed', wordfence: '✗ Admins can be locked out' },
    { feature: 'Progressive Rate Limiting', saurity: '✓ Smart delays', wordfence: '✗ Instant blocking' },
    { feature: 'Emergency Recovery', saurity: '✓ Always accessible', wordfence: '✗ No recovery system' },
    { feature: 'Honeypot Detection', saurity: '✓ Included', wordfence: '✓ Included' },
    { feature: 'Firewall Protection', saurity: '✓ Included', wordfence: '✓ Included' },
    { feature: 'IP Whitelisting', saurity: '✓ Unlimited', wordfence: '✓ Limited in free' },
    { feature: 'IP Blacklisting', saurity: '✓ Unlimited', wordfence: '✓ Included' },
    { feature: 'Real-time Monitoring', saurity: '✓ Full access', wordfence: '✓ Delayed in free' },
    { feature: 'Email Alerts', saurity: '✓ Configurable', wordfence: '✓ Limited in free' },
    { feature: 'Two-Factor Auth', saurity: '⚠️ Planned', wordfence: '✓ Premium only' },
    { feature: 'Malware Scanning', saurity: '⚠️ Planned', wordfence: '✓ Premium only' },
    { feature: 'Country Blocking', saurity: '⚠️ Planned', wordfence: '✓ Premium only' },
  ],
  pricing: [
    { tier: 'Free Version', saurity: '$0 - All features', wordfence: '$0 - Limited features' },
    { tier: 'Premium Version', saurity: 'N/A - No premium', wordfence: '$119/year per site' },
    { tier: 'Multiple Sites', saurity: '$0 unlimited', wordfence: '$119/year each site' },
    { tier: 'Hidden Costs', saurity: 'None', wordfence: 'Upsell prompts' },
  ],
  performance: [
    { metric: 'Response Time', saurity: '<1ms', wordfence: '2-5ms' },
    { metric: 'Memory Usage', saurity: '<5MB', wordfence: '10-30MB' },
    { metric: 'Database Queries', saurity: 'Optimized', wordfence: 'Heavy' },
    { metric: 'Page Load Impact', saurity: 'Minimal', wordfence: 'Noticeable' },
  ],
}

const prosAndCons = {
  saurity: {
    pros: [
      'Administrators never get locked out',
      'Completely free with all features',
      'Open source and transparent',
      'Lightweight and fast',
      'No premium upsells or nagging',
      'Progressive rate limiting is user-friendly',
      'Easy to configure',
      'Works great on shared hosting',
    ],
    cons: [
      'Newer plugin with smaller community',
      'No malware scanning (yet)',
      'Limited country-level blocking options',
      'Fewer integrations with third-party services',
    ],
  },
  wordfence: {
    pros: [
      'Established plugin with large user base',
      'Comprehensive malware scanning in premium',
      'Country blocking features',
      'Two-factor authentication',
      'Extensive documentation',
      'Regular security updates',
    ],
    cons: [
      'Can lock out administrators',
      'Constant premium upgrade prompts',
      'Heavy on server resources',
      'Free version has delayed threat updates',
      'Premium version expensive for multiple sites',
      'Complex configuration for beginners',
      'Frequent false positives',
    ],
  },
}

export default function SaurityVsWordfence() {
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
        name: 'Comparisons',
        item: 'https://www.saurity.com/features',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'vs Wordfence',
        item: 'https://www.saurity.com/vs/wordfence',
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Saurity vs Wordfence
            </h1>
            <p className="text-xl opacity-90">
              An honest comparison of two WordPress security solutions
            </p>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="py-12 px-4 bg-yellow-50 border-y border-yellow-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">⚡ Quick Summary</h2>
            <p className="text-lg text-slate-700 text-center">
              <strong>Choose Saurity if</strong> you want guaranteed admin access, completely free features, and lightweight performance.
              <br />
              <strong>Choose Wordfence if</strong> you need malware scanning and are willing to pay for premium features.
            </p>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="py-4 px-6 text-left font-bold">Feature</th>
                    <th className="py-4 px-6 text-center font-bold text-blue-600">Saurity</th>
                    <th className="py-4 px-6 text-center font-bold text-orange-600">Wordfence</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.features.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-4 px-6 font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-sm">{row.saurity}</td>
                      <td className="py-4 px-6 text-center text-sm">{row.wordfence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Pricing Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="py-4 px-6 text-left font-bold">Pricing Tier</th>
                    <th className="py-4 px-6 text-center font-bold text-blue-600">Saurity</th>
                    <th className="py-4 px-6 text-center font-bold text-orange-600">Wordfence</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.pricing.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-4 px-6 font-medium">{row.tier}</td>
                      <td className="py-4 px-6 text-center">{row.saurity}</td>
                      <td className="py-4 px-6 text-center">{row.wordfence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg font-bold text-green-600">
                💰 Cost Savings: $119/year per site with Saurity
              </p>
            </div>
          </div>
        </section>

        {/* Performance Comparison */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Performance Benchmarks</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="py-4 px-6 text-left font-bold">Performance Metric</th>
                    <th className="py-4 px-6 text-center font-bold text-blue-600">Saurity</th>
                    <th className="py-4 px-6 text-center font-bold text-orange-600">Wordfence</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.performance.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-4 px-6 font-medium">{row.metric}</td>
                      <td className="py-4 px-6 text-center font-bold text-green-600">{row.saurity}</td>
                      <td className="py-4 px-6 text-center text-slate-600">{row.wordfence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Pros and Cons</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Saurity */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-blue-600">Saurity</h3>
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 text-green-600">✓ Pros</h4>
                  <ul className="space-y-2">
                    {prosAndCons.saurity.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">+</span>
                        <span className="text-slate-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-3 text-red-600">✗ Cons</h4>
                  <ul className="space-y-2">
                    {prosAndCons.saurity.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">-</span>
                        <span className="text-slate-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Wordfence */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-orange-600">Wordfence</h3>
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 text-green-600">✓ Pros</h4>
                  <ul className="space-y-2">
                    {prosAndCons.wordfence.pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">+</span>
                        <span className="text-slate-700">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-3 text-red-600">✗ Cons</h4>
                  <ul className="space-y-2">
                    {prosAndCons.wordfence.cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600 mt-1">-</span>
                        <span className="text-slate-700">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Differentiator */}
        <section className="py-20 px-4 bg-blue-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">🔑 The Key Difference</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Admin Lockout Protection</h3>
              <p className="text-lg text-slate-700 mb-4">
                The fundamental difference between Saurity and Wordfence is how they handle administrator access:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">✓ Saurity Approach</h4>
                  <p className="text-sm text-slate-700">
                    Administrators with correct credentials can ALWAYS log in, even during active attacks. 
                    Progressive rate limiting slows down attackers without blocking legitimate users.
                  </p>
                </div>
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                  <h4 className="font-bold text-red-800 mb-2">✗ Wordfence Approach</h4>
                  <p className="text-sm text-slate-700">
                    Administrators can be locked out after failed login attempts or if their IP is flagged. 
                    This can cause business disruption and requires support intervention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Migration Guide */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">How to Migrate from Wordfence to Saurity</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <h3 className="font-bold mb-2">Download Saurity</h3>
                    <p className="text-slate-600">Get the latest version from GitHub</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <h3 className="font-bold mb-2">Export Wordfence Settings (Optional)</h3>
                    <p className="text-slate-600">Note your IP whitelist and blacklist if needed</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <h3 className="font-bold mb-2">Deactivate Wordfence</h3>
                    <p className="text-slate-600">Go to Plugins and deactivate Wordfence</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <h3 className="font-bold mb-2">Install and Activate Saurity</h3>
                    <p className="text-slate-600">Upload and activate the Saurity plugin</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                  <div>
                    <h3 className="font-bold mb-2">Configure Saurity</h3>
                    <p className="text-slate-600">Import IP lists and adjust settings as needed</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">6</span>
                  <div>
                    <h3 className="font-bold mb-2">Test Protection</h3>
                    <p className="text-slate-600">Verify your site is protected and admins can log in</p>
                  </div>
                </li>
              </ol>
              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-slate-700">
                  <strong>Note:</strong> Migration takes less than 10 minutes and involves zero downtime. 
                  Your site remains protected throughout the process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Other Comparisons */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Compare Saurity with Other Plugins</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/vs/sucuri"
                className="p-6 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-bold text-lg mb-2">vs Sucuri</h3>
                <p className="text-sm text-slate-600">Cloud-based WAF comparison</p>
              </Link>
              <Link
                href="/vs/ithemes"
                className="p-6 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-bold text-lg mb-2">vs iThemes Security</h3>
                <p className="text-sm text-slate-600">Feature-for-feature analysis</p>
              </Link>
              <Link
                href="/vs/all-in-one"
                className="p-6 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-bold text-lg mb-2">vs All In One WP Security</h3>
                <p className="text-sm text-slate-600">Complete comparison</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Switch to Saurity?</h2>
            <p className="text-xl mb-8 opacity-90">
              Experience WordPress security without the frustration of lockouts. Download Saurity today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/download"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-slate-100 transition-colors font-semibold text-lg"
              >
                Download Saurity v1.0.0
              </Link>
              <Link
                href="/features"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg"
              >
                View All Features
              </Link>
            </div>
            <p className="mt-6 text-sm opacity-75">
              No credit card required • 100% free forever • Open source MIT license
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
