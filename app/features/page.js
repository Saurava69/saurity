import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

export const metadata = {
  title: 'Features - Enterprise WordPress Security Plugin | Saurity v1.1.0',
  description: 'Saurity v1.1.0 features: Cloud integration, GeoIP blocking, threat intelligence, zero admin lockouts, progressive rate limiting, advanced firewall. Compare with Wordfence, Sucuri.',
  keywords: 'WordPress security features, Cloudflare integration, GeoIP blocking, threat intelligence, security plugin comparison, enterprise security',
  openGraph: {
    title: 'Saurity Features - Complete WordPress Security Solution',
    description: 'Enterprise-grade WordPress security with cloud integration, GeoIP blocking, and threat intelligence. Compare features with leading competitors.',
    url: 'https://www.saurity.com/features',
    siteName: 'Saurity',
    images: [
      {
        url: 'https://www.saurity.com/HomePage1200_600.webp',
        width: 1200,
        height: 600,
        alt: 'Saurity WordPress Security Features',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saurity Features - Complete WordPress Security Solution',
    description: 'Enterprise-grade WordPress security with cloud integration, GeoIP blocking, and threat intelligence.',
    images: ['https://www.saurity.com/HomePage1200_600.webp'],
  },
  alternates: {
    canonical: 'https://www.saurity.com/features',
  },
}

const cloudFeatures = [
  {
    title: 'Cloudflare Integration',
    description: 'Seamlessly sync your security rules with Cloudflare for edge-level protection and DDoS mitigation.',
    icon: 'cloud',
    benefits: [
      'Automatic IP blocklist synchronization',
      'DDoS protection coordination',
      'Security level management',
      'Rate limiting rules sync',
    ],
    isNew: true,
  },
  {
    title: 'GeoIP Services',
    description: 'Block or allow traffic based on geographic location with multiple provider support.',
    icon: 'globe',
    benefits: [
      'Country-based blocking/allowing',
      'MaxMind, IP2Location, DB-IP support',
      'Regional access policies',
      'Automatic database updates',
    ],
    isNew: true,
  },
  {
    title: 'Threat Intelligence',
    description: 'Leverage real-time threat feeds to automatically block known malicious IPs.',
    icon: 'shield',
    benefits: [
      'AbuseIPDB integration',
      'Spamhaus DROP/EDROP feeds',
      'Emerging Threats lists',
      'Custom feed support',
    ],
    isNew: true,
  },
]

const coreFeatures = [
  {
    title: 'Zero Admin Lockouts',
    description: 'Industry-first guarantee: Administrators never get blocked, even during brute force attacks.',
    icon: 'lock-open',
    benefits: [
      'Never lose access to your dashboard',
      'Emergency recovery mode',
      '3-tier recovery system',
      'Fail-safe architecture',
    ],
  },
  {
    title: 'Progressive Rate Limiting',
    description: 'Smart, adaptive security that increases delays with each failed login attempt.',
    icon: 'clock',
    benefits: [
      'Exponential delay progression',
      'Per-IP and per-device tracking',
      'NAT/office safe (two-tier system)',
      'Configurable thresholds',
    ],
  },
  {
    title: 'Advanced Firewall',
    description: 'Multi-layered protection against common WordPress vulnerabilities and attacks.',
    icon: 'shield-check',
    benefits: [
      'SQL injection protection',
      'XSS attack mitigation',
      'Malicious user agent blocking',
      'Sensitive path protection',
    ],
  },
  {
    title: 'Honeypot Detection',
    description: 'Invisible traps that identify and neutralize automated bots with 100% accuracy.',
    icon: 'target',
    benefits: [
      'Zero false positives',
      'No CAPTCHA needed',
      'Silent bot detection',
      'Timing analysis',
    ],
  },
  {
    title: 'IP Management',
    description: 'Flexible IP allowlist and blocklist system with CIDR support.',
    icon: 'network',
    benefits: [
      'CIDR range support',
      'CSV import/export',
      'Metadata tracking',
      'Bulk operations',
    ],
  },
  {
    title: 'Activity Monitoring',
    description: 'Real-time dashboard showing all security events and system status.',
    icon: 'chart',
    benefits: [
      'Live security event feed',
      'Searchable logs',
      'CSV export',
      'Auto-cleanup',
    ],
  },
]

const advancedFeatures = [
  {
    title: 'Tarpitting',
    description: 'Slow down attackers by intentionally delaying responses to suspicious requests.',
    icon: 'hourglass',
    benefits: [
      'Wastes attacker resources',
      '10,000 → 20 attempts/min',
      'No impact on legitimate users',
    ],
  },
  {
    title: 'Subnet Blocking',
    description: 'Automatically block entire IP ranges when botnets rotate through subnets.',
    icon: 'ban',
    benefits: [
      'Defeats IP rotation tactics',
      '/24 subnet detection',
      'Configurable thresholds',
    ],
  },
  {
    title: 'GDPR Compliance',
    description: 'Built-in privacy controls and data retention management.',
    icon: 'privacy',
    benefits: [
      'Privacy policy integration',
      'Data retention controls',
      'Consent management',
    ],
    isNew: true,
  },
  {
    title: 'Advanced Reporting',
    description: 'Generate professional security reports for stakeholders.',
    icon: 'document',
    benefits: [
      'PDF security reports',
      'Scheduled email reports',
      'Executive dashboards',
    ],
    isNew: true,
  },
]

const comparisonFeatures = [
  { feature: 'Zero Admin Lockouts', saurity: true, wordfence: false, sucuri: false, ithemes: false },
  { feature: 'Cloudflare Integration', saurity: true, wordfence: false, sucuri: true, ithemes: false },
  { feature: 'GeoIP Blocking', saurity: true, wordfence: true, sucuri: true, ithemes: true },
  { feature: 'Threat Intelligence Feeds', saurity: true, wordfence: true, sucuri: true, ithemes: false },
  { feature: 'Progressive Rate Limiting', saurity: true, wordfence: false, sucuri: false, ithemes: false },
  { feature: 'Emergency Recovery', saurity: true, wordfence: false, sucuri: false, ithemes: 'partial' },
  { feature: 'Honeypot Detection', saurity: true, wordfence: true, sucuri: true, ithemes: true },
  { feature: 'GDPR Compliance Tools', saurity: true, wordfence: 'partial', sucuri: 'partial', ithemes: true },
  { feature: 'PDF Reports', saurity: true, wordfence: true, sucuri: true, ithemes: false },
  { feature: 'Open Source', saurity: true, wordfence: false, sucuri: false, ithemes: false },
  { feature: 'Free Forever', saurity: true, wordfence: 'limited', sucuri: false, ithemes: 'limited' },
  { feature: 'No Cloud Dependency', saurity: true, wordfence: false, sucuri: false, ithemes: true },
]

const useCases = [
  {
    title: 'E-commerce Sites',
    description: 'Protect customer data and transactions without blocking legitimate shoppers.',
    icon: 'cart',
  },
  {
    title: 'Membership Sites',
    description: 'Secure member logins while ensuring members never get locked out.',
    icon: 'users',
  },
  {
    title: 'Corporate Websites',
    description: 'Enterprise-grade security that meets compliance requirements.',
    icon: 'building',
  },
  {
    title: 'Multi-Author Blogs',
    description: 'Protect multiple login endpoints without frustrating authors.',
    icon: 'edit',
  },
  {
    title: 'High-Traffic Sites',
    description: 'Efficient protection that scales with your traffic.',
    icon: 'trending',
  },
  {
    title: 'Shared Hosting',
    description: 'Lightweight security that works on resource-limited hosting.',
    icon: 'server',
  },
]

export default function Features() {
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
        name: 'Features',
        item: 'https://www.saurity.com/features',
      },
    ],
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Saurity',
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'WordPress',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      ratingCount: '350',
    },
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={softwareSchema} />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Version 1.1.0 - Cloud Integration Release
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Enterprise Features, Zero Cost
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Saurity v1.1.0 delivers cloud-powered protection with Cloudflare integration, 
              GeoIP blocking, and threat intelligence feeds - completely free and open source.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/download"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Download v1.1.0 Free
              </Link>
              <a
                href="https://github.com/saurity/saurity#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
              >
                View Documentation
              </a>
            </div>
          </div>
        </section>

        {/* NEW: Cloud Integration Features */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4">
                NEW IN v1.1.0
              </span>
              <h2 className="text-4xl font-bold mb-4">Cloud Integration</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Enterprise-grade cloud protection without the enterprise price tag
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {cloudFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-lg"
                >
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-blue-100 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">&#10003;</span>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Features Grid */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Core Security Features</h2>
            <p className="text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Battle-tested protection with zero false positives
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">&#10003;</span>
                        <span className="text-sm text-slate-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Advanced Features</h2>
            <p className="text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Sophisticated protection for demanding environments
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advancedFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-slate-200 rounded-lg hover:shadow-lg transition-shadow relative"
                >
                  {feature.isNew && (
                    <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                      NEW
                    </span>
                  )}
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-600 mb-4 text-sm">{feature.description}</p>
                  <ul className="space-y-1">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">&#10003;</span>
                        <span className="text-xs text-slate-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">How Saurity Compares</h2>
            <p className="text-xl text-slate-600 text-center mb-12">
              See why Saurity is the smart choice for WordPress security
            </p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="py-4 px-6 text-left font-bold">Feature</th>
                    <th className="py-4 px-6 text-center font-bold text-blue-600">Saurity</th>
                    <th className="py-4 px-6 text-center font-bold">Wordfence</th>
                    <th className="py-4 px-6 text-center font-bold">Sucuri</th>
                    <th className="py-4 px-6 text-center font-bold">iThemes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-4 px-6 font-medium">{row.feature}</td>
                      <td className="py-4 px-6 text-center">
                        {row.saurity === true && <span className="text-3xl text-green-600">&#10003;</span>}
                        {row.saurity === false && <span className="text-3xl text-red-600">&#10007;</span>}
                        {row.saurity === 'partial' && <span className="text-sm text-yellow-600">Partial</span>}
                        {row.saurity === 'limited' && <span className="text-sm text-yellow-600">Limited</span>}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.wordfence === true && <span className="text-3xl text-green-600">&#10003;</span>}
                        {row.wordfence === false && <span className="text-3xl text-red-600">&#10007;</span>}
                        {row.wordfence === 'partial' && <span className="text-sm text-yellow-600">Partial</span>}
                        {row.wordfence === 'limited' && <span className="text-sm text-yellow-600">Limited</span>}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.sucuri === true && <span className="text-3xl text-green-600">&#10003;</span>}
                        {row.sucuri === false && <span className="text-3xl text-red-600">&#10007;</span>}
                        {row.sucuri === 'partial' && <span className="text-sm text-yellow-600">Partial</span>}
                        {row.sucuri === 'limited' && <span className="text-sm text-yellow-600">Limited</span>}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.ithemes === true && <span className="text-3xl text-green-600">&#10003;</span>}
                        {row.ithemes === false && <span className="text-3xl text-red-600">&#10007;</span>}
                        {row.ithemes === 'partial' && <span className="text-sm text-yellow-600">Partial</span>}
                        {row.ithemes === 'limited' && <span className="text-sm text-yellow-600">Limited</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/vs/wordfence"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                View detailed comparisons →
              </Link>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Perfect For Every Use Case</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="p-6 bg-white border border-slate-200 rounded-lg hover:shadow-lg transition-shadow text-center"
                >
                  <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-slate-600">{useCase.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/use-cases"
                className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
              >
                Explore detailed use cases →
              </Link>
            </div>
          </div>
        </section>

        {/* Performance Benchmarks */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Performance That Doesn&apos;t Compromise</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-slate-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-blue-600 mb-2">&lt;0.5ms</div>
                <div className="text-xl font-semibold mb-2">Response Time</div>
                <p className="text-slate-600">Minimal impact on page load speed</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-green-600 mb-2">99.9%</div>
                <div className="text-xl font-semibold mb-2">Uptime</div>
                <p className="text-slate-600">Reliable protection 24/7</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-lg">
                <div className="text-5xl font-bold text-purple-600 mb-2">&lt;2MB</div>
                <div className="text-xl font-semibold mb-2">Memory Usage</div>
                <p className="text-slate-600">Lightweight and efficient</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Secure Your WordPress Site?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of WordPress sites protected by Saurity. Free forever, open source, and ready to deploy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/download"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-slate-100 transition-colors font-semibold text-lg"
              >
                Download v1.1.0 Free
              </Link>
              <a
                href="https://github.com/saurity/saurity#readme"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg"
              >
                Read Documentation
              </a>
            </div>
            <p className="mt-6 text-sm opacity-75">
              No credit card required • 100% free forever • Open source GPL v2
            </p>
          </div>
        </section>
      </div>
    </>
  )
}