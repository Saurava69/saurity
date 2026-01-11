import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

export const metadata = {
  title: 'Saurity vs iThemes Security - Feature Comparison 2026 | WordPress',
  description: 'Compare Saurity and iThemes Security WordPress plugins. Features, pricing, ease of use, and performance. See which security plugin is right for your WordPress site.',
  keywords: 'Saurity vs iThemes, iThemes Security alternative, WordPress security comparison',
  openGraph: {
    title: 'Saurity vs iThemes Security - Which WordPress Security Plugin?',
    description: 'Detailed comparison of Saurity and iThemes Security features, pricing, and performance.',
    url: 'https://saurity.com/vs/ithemes',
    siteName: 'Saurity',
    images: [
      {
        url: 'https://saurity.com/HomePage1200_600.webp',
        width: 1200,
        height: 600,
        alt: 'Saurity vs iThemes Security Comparison',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://saurity.com/vs/ithemes',
  },
}

const comparisonData = {
  features: [
    { feature: 'Zero Admin Lockouts', saurity: '✓ Guaranteed', ithemes: '✗ Lockouts possible' },
    { feature: 'Progressive Rate Limiting', saurity: '✓ Smart delays', ithemes: '✗ Instant blocking' },
    { feature: 'Emergency Recovery', saurity: '✓ 3-tier system', ithemes: '⚠️ Partial' },
    { feature: 'Two-Factor Auth', saurity: '⚠️ Planned', ithemes: '✓ Pro only' },
    { feature: 'File Change Detection', saurity: '⚠️ Planned', ithemes: '✓ Included' },
    { feature: 'Database Backups', saurity: '✗ Not included', ithemes: '✓ Pro only' },
    { feature: 'Brute Force Protection', saurity: '✓ Advanced', ithemes: '✓ Basic' },
    { feature: 'Honeypot Detection', saurity: '✓ Included', ithemes: '✗ Not included' },
    { feature: 'IP Management', saurity: '✓ Full CIDR support', ithemes: '✓ Basic' },
    { feature: 'User Experience', saurity: 'Simple', ithemes: 'Complex' },
  ],
  pricing: [
    { tier: 'Free Version', saurity: '$0 - All features', ithemes: 'Limited features' },
    { tier: 'Pro Version', saurity: 'N/A - No premium', ithemes: '$99/year (1 site)' },
    { tier: '5 Sites', saurity: '$0', ithemes: '$199/year' },
    { tier: 'Unlimited Sites', saurity: '$0', ithemes: '$299/year' },
  ],
}

const prosAndCons = {
  saurity: {
    pros: [
      'Zero admin lockout guarantee',
      'Completely free - no premium version',
      'Progressive rate limiting (user-friendly)',
      'Simple, focused feature set',
      'Open source and transparent',
      'Minimal performance impact',
      'No upsell prompts',
      'Works immediately after activation',
    ],
    cons: [
      'No 2FA yet (planned)',
      'No file change detection yet',
      'No database backups',
      'Fewer features overall',
      'Smaller user community',
    ],
  },
  ithemes: {
    pros: [
      'Comprehensive feature set',
      '2FA authentication (Pro)',
      'File change detection',
      'Database backups (Pro)',
      'Large established community',
      'Regular updates',
    ],
    cons: [
      'Can lock out administrators',
      'Complex interface - steep learning curve',
      'Free version very limited',
      'Frequent premium upgrade prompts',
      '$99-299/year for full features',
      'Heavy on server resources',
      'Many features you may not need',
    ],
  },
}

export default function SaurityVsIThemes() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://saurity.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Comparisons',
        item: 'https://saurity.com/features',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'vs iThemes',
        item: 'https://saurity.com/vs/ithemes',
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
              Saurity vs iThemes Security
            </h1>
            <p className="text-xl opacity-90">
              Simplicity and Reliability vs Feature Complexity
            </p>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="py-12 px-4 bg-yellow-50 border-y border-yellow-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">⚡ Quick Summary</h2>
            <p className="text-lg text-slate-700 text-center">
              <strong>Choose Saurity if</strong> you want simple, reliable protection that never locks you out - completely free.
              <br />
              <strong>Choose iThemes if</strong> you need comprehensive features like 2FA and file monitoring and can pay $99-299/year.
            </p>
          </div>
        </section>

        {/* Philosophy Difference */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Different Security Philosophies</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-blue-900">Saurity: Focused Simplicity</h3>
                <p className="text-slate-700">
                  Does one thing extremely well - prevents brute force attacks without false positives. 
                  Simple interface, zero lockouts guaranteed, completely free.
                </p>
              </div>
              <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-purple-900">iThemes: Comprehensive Suite</h3>
                <p className="text-slate-700">
                  All-in-one solution with dozens of features. More complex to configure, 
                  premium required for best features, steeper learning curve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="py-4 px-6 text-left font-bold">Feature</th>
                    <th className="py-4 px-6 text-center font-bold text-blue-600">Saurity</th>
                    <th className="py-4 px-6 text-center font-bold text-purple-600">iThemes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.features.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-4 px-6 font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-sm">{row.saurity}</td>
                      <td className="py-4 px-6 text-center text-sm">{row.ithemes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Pricing Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="py-4 px-6 text-left font-bold">Tier</th>
                    <th className="py-4 px-6 text-center font-bold text-blue-600">Saurity</th>
                    <th className="py-4 px-6 text-center font-bold text-purple-600">iThemes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.pricing.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-4 px-6 font-medium">{row.tier}</td>
                      <td className="py-4 px-6 text-center">{row.saurity}</td>
                      <td className="py-4 px-6 text-center">{row.ithemes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg font-bold text-green-600">
                💰 Cost Savings: $99-299/year with Saurity
              </p>
            </div>
          </div>
        </section>

        {/* Ease of Use */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Ease of Use Comparison</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-blue-600">Saurity</h3>
                <p className="text-slate-700 mb-4">
                  <strong>Setup Time:</strong> 5 minutes
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Configuration:</strong> Works out of the box, optional customization
                </p>
                <p className="text-slate-700">
                  <strong>Learning Curve:</strong> Minimal - simple dashboard with clear options
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-purple-600">iThemes Security</h3>
                <p className="text-slate-700 mb-4">
                  <strong>Setup Time:</strong> 30-60 minutes
                </p>
                <p className="text-slate-700 mb-4">
                  <strong>Configuration:</strong> Requires reviewing dozens of settings
                </p>
                <p className="text-slate-700">
                  <strong>Learning Curve:</strong> Steep - many options can be overwhelming
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Pros and Cons</h2>
            <div className="grid md:grid-cols-2 gap-8">
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

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-purple-600">iThemes Security</h3>
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 text-green-600">✓ Pros</h4>
                  <ul className="space-y-2">
                    {prosAndCons.ithemes.pros.map((pro, index) => (
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
                    {prosAndCons.ithemes.cons.map((con, index) => (
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

        {/* Which to Choose */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Which Should You Choose?</h2>
            <div className="space-y-8">
              <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-blue-900">Choose Saurity If:</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>Your main concern is brute force attack protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>You want simple, reliable security without complexity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>Admin lockouts are unacceptable for your workflow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>You prefer free, open-source solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>You value minimal server resource usage</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-purple-900">Choose iThemes If:</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">→</span>
                    <span>You need comprehensive security features (2FA, file monitoring, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">→</span>
                    <span>Database backups are important to you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">→</span>
                    <span>You want all security features in one plugin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">→</span>
                    <span>Budget allows for $99-299/year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">→</span>
                    <span>You are comfortable with complex configuration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Migration Guide */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Migrating from iThemes to Saurity</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-slate-700 mb-6">
                Switching from iThemes to Saurity is straightforward:
              </p>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    <h3 className="font-bold mb-1">Download Saurity</h3>
                    <p className="text-slate-600">Get the latest version from GitHub</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    <h3 className="font-bold mb-1">Export iThemes IP Lists (if needed)</h3>
                    <p className="text-slate-600">Save any custom IP whitelist/blacklist</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    <h3 className="font-bold mb-1">Deactivate iThemes Security</h3>
                    <p className="text-slate-600">Go to Plugins and deactivate</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    <h3 className="font-bold mb-1">Install and Activate Saurity</h3>
                    <p className="text-slate-600">Upload and activate - works immediately</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                  <div>
                    <h3 className="font-bold mb-1">Import IP Lists (optional)</h3>
                    <p className="text-slate-600">Add your IP whitelist/blacklist to Saurity</p>
                  </div>
                </li>
              </ol>
              <p className="text-sm text-slate-600 mt-6 p-4 bg-blue-50 rounded">
                <strong>Note:</strong> Saurity focuses on brute force protection. If you rely on iThemes features like 2FA or file monitoring, you may want to keep iThemes or find alternative solutions for those specific needs.
              </p>
            </div>
          </div>
        </section>

        {/* Other Comparisons */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Compare Saurity with Other Plugins</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/vs/wordfence"
                className="p-6 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-bold text-lg mb-2">vs Wordfence</h3>
                <p className="text-sm text-slate-600">Most popular comparison</p>
              </Link>
              <Link
                href="/vs/sucuri"
                className="p-6 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-bold text-lg mb-2">vs Sucuri</h3>
                <p className="text-sm text-slate-600">Cloud WAF vs plugin</p>
              </Link>
              <Link
                href="/vs/all-in-one"
                className="p-6 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-bold text-lg mb-2">vs All In One WP Security</h3>
                <p className="text-sm text-slate-600">Free alternatives compared</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Try Saurity Today</h2>
            <p className="text-xl mb-8 opacity-90">
              Simple, reliable WordPress security. Download free and protect your site in 5 minutes.
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
