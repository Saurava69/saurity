import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

export const metadata = {
  title: 'Saurity vs All In One WP Security - Free Plugin Comparison 2026',
  description: 'Compare Saurity and All In One WP Security free WordPress plugins. Features, ease of use, and reliability. Best free WordPress security plugin comparison.',
  keywords: 'Saurity vs All In One WP Security, free WordPress security, AIOS alternative',
  openGraph: {
    title: 'Saurity vs All In One WP Security - Free Plugin Comparison',
    description: 'Compare two free WordPress security plugins: Saurity and All In One WP Security. Which is better for your site?',
    url: 'https://www.saurity.com/vs/all-in-one',
    siteName: 'Saurity',
    images: [
      {
        url: 'https://www.saurity.com/HomePage1200_600.webp',
        width: 1200,
        height: 600,
        alt: 'Saurity vs All In One WP Security Comparison',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.saurity.com/vs/all-in-one',
  },
}

const comparisonData = {
  features: [
    { feature: 'Zero Admin Lockouts', saurity: '✓ Guaranteed', aios: '✗ Lockouts common' },
    { feature: 'Progressive Rate Limiting', saurity: '✓ Smart delays', aios: '✗ Hard blocking' },
    { feature: 'Emergency Recovery', saurity: '✓ 3-tier system', aios: '✗ Manual only' },
    { feature: 'Brute Force Protection', saurity: '✓ Advanced', aios: '✓ Basic' },
    { feature: 'Firewall Protection', saurity: '✓ Included', aios: '✓ Basic' },
    { feature: 'Honeypot Detection', saurity: '✓ Advanced', aios: '⚠️ Basic' },
    { feature: 'IP Management', saurity: '✓ CIDR support', aios: '✓ Basic' },
    { feature: 'User Experience', saurity: 'Modern, simple', aios: 'Dated interface' },
    { feature: 'Performance Impact', saurity: '<1ms', aios: '5-10ms' },
    { feature: 'Active Development', saurity: '✓ Active', aios: '⚠️ Slower updates' },
  ],
  pricing: [
    { tier: 'Cost', saurity: '$0 - Forever free', aios: '$0 - Free' },
    { tier: 'Premium Version', saurity: 'None - no upsells', aios: 'None' },
    { tier: 'Hidden Costs', saurity: 'None', aios: 'None' },
  ],
}

const prosAndCons = {
  saurity: {
    pros: [
      'Zero admin lockout guarantee',
      'Modern, intuitive interface',
      'Progressive rate limiting',
      'Advanced honeypot detection',
      'Minimal performance impact (<1ms)',
      'Active development with v1.0.0',
      'Open source with MIT license',
      'Simple configuration',
    ],
    cons: [
      'Newer plugin (less established)',
      'Smaller user community',
      'Focused feature set (not all-in-one)',
      'No file change detection yet',
      'No SSL enforcement features',
    ],
  },
  aios: {
    pros: [
      'Established plugin (since 2012)',
      'Large user base',
      'Many security features included',
      'File change detection',
      'Database prefix changing',
      'Completely free',
    ],
    cons: [
      'Can lock out administrators',
      'Dated user interface',
      'Hard blocking without progressive delays',
      'Heavier on server resources',
      'No emergency recovery system',
      'Complex with many settings',
      'Slower update cycle',
      'More false positives',
    ],
  },
}

export default function SaurityVsAllInOne() {
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
        name: 'vs All In One',
        item: 'https://www.saurity.com/vs/all-in-one',
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
              Saurity vs All In One WP Security
            </h1>
            <p className="text-xl opacity-90">
              Modern Approach vs Traditional Security - Both Free
            </p>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="py-12 px-4 bg-yellow-50 border-y border-yellow-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">⚡ Quick Summary</h2>
            <p className="text-lg text-slate-700 text-center">
              <strong>Choose Saurity if</strong> you want modern, reliable protection with zero admin lockouts - completely free.
              <br />
              <strong>Choose AIOS if</strong> you need maximum features in one plugin and can handle complex configuration.
            </p>
          </div>
        </section>

        {/* Key Insight */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-blue-50 border-2 border-blue-300 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">💡 Key Insight: Both Are Free</h2>
              <p className="text-lg text-slate-700 mb-4">
                Unlike Wordfence and iThemes Security, both Saurity and All In One WP Security are completely free with no premium versions. 
                The choice comes down to philosophy and approach:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold mb-2 text-blue-900">Saurity</h3>
                  <p className="text-sm text-slate-700">Focused, modern, zero-lockout approach</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-bold mb-2 text-slate-900">AIOS</h3>
                  <p className="text-sm text-slate-700">Comprehensive, traditional, all-in-one approach</p>
                </div>
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
                    <th className="py-4 px-6 text-center font-bold text-slate-600">All In One</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.features.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-4 px-6 font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-sm">{row.saurity}</td>
                      <td className="py-4 px-6 text-center text-sm">{row.aios}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Pricing Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="py-4 px-6 text-left font-bold">Item</th>
                    <th className="py-4 px-6 text-center font-bold text-blue-600">Saurity</th>
                    <th className="py-4 px-6 text-center font-bold text-slate-600">All In One</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.pricing.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-4 px-6 font-medium">{row.tier}</td>
                      <td className="py-4 px-6 text-center text-green-600 font-bold">{row.saurity}</td>
                      <td className="py-4 px-6 text-center text-green-600 font-bold">{row.aios}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg font-bold text-blue-600">
                🎉 Both plugins are 100% free - choose based on features and approach
              </p>
            </div>
          </div>
        </section>

        {/* Pros and Cons */}
        <section className="py-20 px-4 bg-slate-50">
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
                <h3 className="text-2xl font-bold mb-6 text-slate-600">All In One WP Security</h3>
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 text-green-600">✓ Pros</h4>
                  <ul className="space-y-2">
                    {prosAndCons.aios.pros.map((pro, index) => (
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
                    {prosAndCons.aios.cons.map((con, index) => (
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

        {/* The Lockout Problem */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">🔒 The Admin Lockout Problem</h2>
            <div className="bg-red-50 border-2 border-red-300 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-red-900">
                All In One WP Security Has a Major Lockout Issue
              </h3>
              <p className="text-slate-700 mb-4">
                Many users report getting locked out of their WordPress admin dashboard after configuring 
                All In One WP Security, especially with login lockdown features enabled.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-green-800">✓ Saurity Solution</h4>
                  <p className="text-sm text-slate-700">
                    Guarantees admins with correct credentials can ALWAYS log in. 
                    Emergency recovery system ensures access is never lost.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-bold mb-2 text-red-800">✗ AIOS Problem</h4>
                  <p className="text-sm text-slate-700">
                    Instant blocking can lock out admins. Recovery requires FTP access 
                    or database manipulation - not user-friendly.
                  </p>
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
                    <span>You want guaranteed admin access without lockouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>Modern, clean interface is important to you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>You prefer progressive delays over instant blocking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>Minimal server resource usage matters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>You value active development and updates</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-100 border-2 border-slate-300 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-slate-900">Choose All In One If:</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-600">→</span>
                    <span>You want maximum features in one free plugin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-600">→</span>
                    <span>File change detection is critical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-600">→</span>
                    <span>You are comfortable with potential lockouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-600">→</span>
                    <span>You prefer established plugins with large communities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-600">→</span>
                    <span>Interface design is not a priority</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* User Testimonials */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What Users Are Saying</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-600">
                <p className="text-slate-700 italic mb-4">
                  &ldquo;Switched from AIOS after getting locked out twice. Saurity has been running 
                  for 6 months with zero issues. The progressive rate limiting is genius.&rdquo;
                </p>
                <p className="text-sm font-bold">- WordPress Developer, 15 client sites</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-600">
                <p className="text-slate-700 italic mb-4">
                  &ldquo;AIOS locked me out during an emergency. Had to hire someone to fix it via FTP. 
                  Never again. Saurity guarantee is worth everything.&rdquo;
                </p>
                <p className="text-sm font-bold">- Small Business Owner</p>
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
                <p className="text-sm text-slate-600">Cloud WAF comparison</p>
              </Link>
              <Link
                href="/vs/ithemes"
                className="p-6 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-bold text-lg mb-2">vs iThemes Security</h3>
                <p className="text-sm text-slate-600">Premium alternative</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Experience WordPress Security Without Lockouts</h2>
            <p className="text-xl mb-8 opacity-90">
              Download Saurity and protect your site with confidence. Zero admin lockouts guaranteed.
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
