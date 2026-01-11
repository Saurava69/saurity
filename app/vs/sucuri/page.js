import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

export const metadata = {
  title: 'Saurity vs Sucuri - Complete Comparison 2026 | WordPress Security',
  description: 'Compare Saurity and Sucuri WordPress security solutions. Cloud WAF vs self-hosted plugin, pricing, features, and performance. See which is right for your site.',
  keywords: 'Saurity vs Sucuri, Sucuri alternative, WordPress security comparison, cloud WAF vs plugin',
  openGraph: {
    title: 'Saurity vs Sucuri - Self-Hosted vs Cloud Security Comparison',
    description: 'Detailed comparison of Saurity self-hosted plugin and Sucuri cloud-based WAF. Features, pricing, and performance analysis.',
    url: 'https://saurity.com/vs/sucuri',
    siteName: 'Saurity',
    images: [
      {
        url: 'https://saurity.com/HomePage1200_600.webp',
        width: 1200,
        height: 600,
        alt: 'Saurity vs Sucuri Comparison',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://saurity.com/vs/sucuri',
  },
}

const comparisonData = {
  features: [
    { feature: 'Zero Admin Lockouts', saurity: '✓ Guaranteed', sucuri: '✗ Can block admins' },
    { feature: 'Progressive Rate Limiting', saurity: '✓ Smart delays', sucuri: '✗ Hard blocks' },
    { feature: 'Self-Hosted', saurity: '✓ All local', sucuri: '✗ Cloud-based' },
    { feature: 'Cloud WAF', saurity: '✗ Not included', sucuri: '✓ Main feature' },
    { feature: 'Malware Scanning', saurity: '⚠️ Planned', sucuri: '✓ Included' },
    { feature: 'DDoS Protection', saurity: '⚠️ Basic', sucuri: '✓ Advanced' },
    { feature: 'Emergency Recovery', saurity: '✓ 3-tier system', sucuri: '⚠️ Limited' },
    { feature: 'IP Management', saurity: '✓ Full control', sucuri: '✓ Via dashboard' },
    { feature: 'Performance Impact', saurity: '<1ms local', sucuri: 'Varies (CDN)' },
    { feature: 'Data Privacy', saurity: '✓ All local', sucuri: '⚠️ Routes through Sucuri' },
  ],
  pricing: [
    { tier: 'Free Version', saurity: '$0 - All features', sucuri: 'Basic plugin only' },
    { tier: 'Platform Plan', saurity: 'N/A', sucuri: '$199.99/year' },
    { tier: 'Professional Plan', saurity: 'N/A', sucuri: '$299.99/year' },
    { tier: 'Business Plan', saurity: 'N/A', sucuri: '$499.99/year' },
    { tier: 'Multiple Sites', saurity: '$0 unlimited', sucuri: 'Separate fees per site' },
  ],
}

const prosAndCons = {
  saurity: {
    pros: [
      'Completely free with all features',
      'Self-hosted - full data control',
      'Zero admin lockout guarantee',
      'Minimal performance impact (<1ms)',
      'No external dependencies',
      'Open source and transparent',
      'Works on any hosting',
      'Progressive rate limiting',
    ],
    cons: [
      'No malware scanning yet',
      'No cloud WAF protection',
      'No DDoS mitigation',
      'Requires WordPress hosting',
      'Limited to plugin-based protection',
    ],
  },
  sucuri: {
    pros: [
      'Cloud-based WAF protection',
      'Comprehensive malware scanning',
      'DDoS mitigation included',
      'CDN performance benefits',
      'Professional incident response',
      'Established reputation',
    ],
    cons: [
      'Expensive ($199-$499/year)',
      'Can lock out administrators',
      'All traffic routes through Sucuri',
      'Privacy concerns (third-party)',
      'Requires DNS changes',
      'Performance depends on CDN',
      'Vendor lock-in',
      'Complex setup process',
    ],
  },
}

export default function SaurityVsSucuri() {
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
        name: 'vs Sucuri',
        item: 'https://saurity.com/vs/sucuri',
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
              Saurity vs Sucuri
            </h1>
            <p className="text-xl opacity-90">
              Self-Hosted Plugin vs Cloud-Based WAF - Which Approach Is Right for You?
            </p>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="py-12 px-4 bg-yellow-50 border-y border-yellow-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">⚡ Quick Summary</h2>
            <p className="text-lg text-slate-700 text-center">
              <strong>Choose Saurity if</strong> you want self-hosted security, full data control, and zero cost.
              <br />
              <strong>Choose Sucuri if</strong> you need cloud WAF, malware scanning, and can afford $199-499/year.
            </p>
          </div>
        </section>

        {/* Key Differences */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Fundamental Differences</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 border-2 border-blue-200 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Saurity Approach</h3>
                <p className="text-slate-700 mb-4">
                  <strong>Self-Hosted Plugin</strong> - Runs directly on your WordPress server. All protection happens locally without routing traffic through external services.
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Complete data privacy and control</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>No DNS changes required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Minimal performance overhead</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Works immediately after activation</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 text-orange-900">Sucuri Approach</h3>
                <p className="text-slate-700 mb-4">
                  <strong>Cloud-Based WAF</strong> - Routes all traffic through Sucuri servers before reaching your site. Protection happens at the network level.
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Stops attacks before reaching your server</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>CDN performance benefits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>All traffic goes through third party</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">✗</span>
                    <span>Requires DNS/nameserver changes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="py-4 px-6 text-left font-bold">Feature</th>
                    <th className="py-4 px-6 text-center font-bold text-blue-600">Saurity</th>
                    <th className="py-4 px-6 text-center font-bold text-orange-600">Sucuri</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.features.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-4 px-6 font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-center text-sm">{row.saurity}</td>
                      <td className="py-4 px-6 text-center text-sm">{row.sucuri}</td>
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
                    <th className="py-4 px-6 text-left font-bold">Plan</th>
                    <th className="py-4 px-6 text-center font-bold text-blue-600">Saurity</th>
                    <th className="py-4 px-6 text-center font-bold text-orange-600">Sucuri</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.pricing.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-4 px-6 font-medium">{row.tier}</td>
                      <td className="py-4 px-6 text-center">{row.saurity}</td>
                      <td className="py-4 px-6 text-center">{row.sucuri}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg font-bold text-green-600">
                💰 Cost Savings: $199-499/year per site with Saurity
              </p>
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

              {/* Sucuri */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-orange-600">Sucuri</h3>
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 text-green-600">✓ Pros</h4>
                  <ul className="space-y-2">
                    {prosAndCons.sucuri.pros.map((pro, index) => (
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
                    {prosAndCons.sucuri.cons.map((con, index) => (
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

        {/* Use Case Recommendations */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Which Should You Choose?</h2>
            <div className="space-y-8">
              <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-blue-900">Choose Saurity If:</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>You want complete control over your security and data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>Budget is a concern (Saurity is 100% free)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>You need guaranteed admin access without lockouts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>Your site is on shared hosting or has limited resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">→</span>
                    <span>You prefer self-hosted, open-source solutions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3 text-orange-900">Choose Sucuri If:</h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">→</span>
                    <span>You need comprehensive malware scanning and removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">→</span>
                    <span>Your site faces frequent DDoS attacks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">→</span>
                    <span>You want enterprise-level incident response support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">→</span>
                    <span>Budget allows for $199-499/year per site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600">→</span>
                    <span>You are comfortable routing traffic through third-party servers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Can You Use Both? */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Can You Use Both Together?</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-lg text-slate-700 mb-4">
                <strong>Yes, but it is not recommended.</strong> Sucuri cloud WAF already provides firewall and rate limiting at the network level, so running Saurity behind it would be redundant for those features.
              </p>
              <p className="text-slate-700 mb-4">
                <strong>Better approach:</strong> Choose one solution based on your needs:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>For most users:</strong> Start with Saurity (free) and see if it meets your needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>If compromised:</strong> Consider adding Sucuri for malware cleanup and ongoing scanning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>For high-risk sites:</strong> Enterprise sites with budget may justify Sucuri from the start</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Other Comparisons */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Compare Saurity with Other Plugins</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/vs/wordfence"
                className="p-6 bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <h3 className="font-bold text-lg mb-2">vs Wordfence</h3>
                <p className="text-sm text-slate-600">Popular plugin comparison</p>
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
            <h2 className="text-4xl font-bold mb-6">Try Saurity Risk-Free</h2>
            <p className="text-xl mb-8 opacity-90">
              100% free, open source, and no credit card required. Download and protect your site in minutes.
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
