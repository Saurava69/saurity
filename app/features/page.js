import Image from 'next/image'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

export const metadata = {
  title: 'Features - Enterprise WordPress Security Plugin | Saurity',
  description: 'Saurity v1.0.0 features: Zero admin lockouts, progressive rate limiting, advanced firewall, honeypot detection, emergency recovery, and more. Compare with Wordfence, Sucuri, iThemes.',
  keywords: 'WordPress security features, security plugin comparison, enterprise security features, zero lockout security, progressive rate limiting',
  openGraph: {
    title: 'Saurity Features - Complete WordPress Security Solution',
    description: 'Enterprise-grade WordPress security with zero false positives. Smart rate limiting, advanced firewall, honeypot detection. Compare features with leading competitors.',
    url: 'https://saurity.com/features',
    siteName: 'Saurity',
    images: [
      {
        url: 'https://saurity.com/HomePage1200_600.webp',
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
    description: 'Enterprise-grade WordPress security with zero false positives. Smart rate limiting, advanced firewall, honeypot detection.',
    images: ['https://saurity.com/HomePage1200_600.webp'],
  },
  alternates: {
    canonical: 'https://saurity.com/features',
  },
}

const features = [
  {
    title: 'Zero Admin Lockouts',
    description: 'Industry-first guarantee: Administrators never get blocked, even during brute force attacks. Emergency recovery mode ensures access is always maintained.',
    icon: '🔓',
    benefits: [
      'Never lose access to your WordPress dashboard',
      'Admins can always login with correct credentials',
      'Emergency recovery mode for critical situations',
      'No frustrating lockout scenarios',
    ],
  },
  {
    title: 'Progressive Rate Limiting',
    description: 'Smart, adaptive security that increases delays with each failed login attempt instead of instantly blocking users.',
    icon: '⏱️',
    benefits: [
      'Legitimate users never blocked',
      '1s → 2s → 4s → 8s → 16s delay progression',
      'Attackers discouraged by exponential delays',
      'Configurable thresholds and timeouts',
    ],
  },
  {
    title: 'Advanced Firewall',
    description: 'Multi-layered protection against common WordPress vulnerabilities and attacks.',
    icon: '🛡️',
    benefits: [
      'XML-RPC attack prevention',
      'SQL injection protection',
      'XSS attack mitigation',
      'Directory traversal blocking',
    ],
  },
  {
    title: 'Honeypot Detection',
    description: 'Invisible traps that identify and neutralize automated bots before they can cause harm.',
    icon: '🍯',
    benefits: [
      'Catches 99% of bot traffic',
      'Zero false positives',
      'No CAPTCHA needed',
      'Silent bot detection',
    ],
  },
  {
    title: 'IP Management',
    description: 'Flexible IP whitelist and blacklist system for granular access control.',
    icon: '🌐',
    benefits: [
      'Whitelist trusted IPs',
      'Blacklist known attackers',
      'CIDR range support',
      'Easy bulk management',
    ],
  },
  {
    title: 'Real-time Monitoring',
    description: 'Live dashboard showing all security events, blocked attempts, and system status.',
    icon: '📊',
    benefits: [
      'Live security event feed',
      'Attack pattern visualization',
      'Detailed logs and reports',
      'Exportable data',
    ],
  },
  {
    title: 'Email Alerts',
    description: 'Instant notifications for critical security events and suspicious activities.',
    icon: '📧',
    benefits: [
      'Configurable alert thresholds',
      'Multiple recipient support',
      'Digest reports available',
      'No spam - only important alerts',
    ],
  },
  {
    title: 'Tarpitting',
    description: 'Slow down attackers by intentionally delaying responses to suspicious requests.',
    icon: '🐌',
    benefits: [
      'Wastes attacker resources',
      'Exponential delay system',
      'No impact on legitimate users',
      'Configurable delay durations',
    ],
  },
  {
    title: 'Emergency Recovery',
    description: 'Foolproof access restoration system that works even when everything else fails.',
    icon: '🚨',
    benefits: [
      'Special recovery URL',
      'Works even if locked out',
      'Secure authentication method',
      'Temporary access token system',
    ],
  },
]

const comparisonFeatures = [
  { feature: 'Zero Admin Lockouts', saurity: true, wordfence: false, sucuri: false, ithemes: false },
  { feature: 'Progressive Rate Limiting', saurity: true, wordfence: false, sucuri: false, ithemes: false },
  { feature: 'Emergency Recovery', saurity: true, wordfence: false, sucuri: false, ithemes: 'partial' },
  { feature: 'Honeypot Detection', saurity: true, wordfence: true, sucuri: true, ithemes: true },
  { feature: 'IP Whitelisting', saurity: true, wordfence: true, sucuri: true, ithemes: true },
  { feature: 'IP Blacklisting', saurity: true, wordfence: true, sucuri: true, ithemes: true },
  { feature: 'Firewall Protection', saurity: true, wordfence: true, sucuri: true, ithemes: true },
  { feature: 'Real-time Monitoring', saurity: true, wordfence: true, sucuri: true, ithemes: true },
  { feature: 'Email Alerts', saurity: true, wordfence: true, sucuri: true, ithemes: true },
  { feature: 'Open Source', saurity: true, wordfence: false, sucuri: false, ithemes: false },
  { feature: 'Free Forever', saurity: true, wordfence: 'limited', sucuri: false, ithemes: 'limited' },
  { feature: 'No Premium Upsells', saurity: true, wordfence: false, sucuri: false, ithemes: false },
]

const useCases = [
  {
    title: 'E-commerce Sites (WooCommerce)',
    description: 'Protect customer data and transactions without blocking legitimate shoppers.',
    icon: '🛒',
  },
  {
    title: 'Membership Sites',
    description: 'Secure member logins while ensuring members never get locked out.',
    icon: '👥',
  },
  {
    title: 'Corporate Websites',
    description: 'Enterprise-grade security that meets compliance requirements.',
    icon: '🏢',
  },
  {
    title: 'Multi-Author Blogs',
    description: 'Protect multiple login endpoints without frustrating authors.',
    icon: '✍️',
  },
  {
    title: 'High-Traffic Sites',
    description: 'Efficient protection that scales with your traffic.',
    icon: '📈',
  },
  {
    title: 'Shared Hosting',
    description: 'Lightweight security that works on resource-limited hosting.',
    icon: '🖥️',
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
        item: 'https://saurity.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Features',
        item: 'https://saurity.com/features',
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
      ratingCount: '250',
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
              Version 1.0.0 - Production Ready
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Enterprise Features Without the Enterprise Cost
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Saurity delivers advanced WordPress security features that competitors charge hundreds for - completely free and open source.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/download"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                Download v1.0.0 Free →
              </Link>
              <Link
                href="/docs"
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-lg"
              >
                View Documentation
              </Link>
            </div>
          </div>
        </section>

        {/* Core Features Grid */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Complete Feature Set</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-sm text-slate-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 px-4 bg-slate-50">
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
                        {row.saurity === true && <span className="text-3xl text-green-600">✓</span>}
                        {row.saurity === false && <span className="text-3xl text-red-600">✗</span>}
                        {row.saurity === 'partial' && <span className="text-xl text-yellow-600">⚠️</span>}
                        {row.saurity === 'limited' && <span className="text-sm text-yellow-600">Limited</span>}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.wordfence === true && <span className="text-3xl text-green-600">✓</span>}
                        {row.wordfence === false && <span className="text-3xl text-red-600">✗</span>}
                        {row.wordfence === 'partial' && <span className="text-xl text-yellow-600">⚠️</span>}
                        {row.wordfence === 'limited' && <span className="text-sm text-yellow-600">Limited</span>}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.sucuri === true && <span className="text-3xl text-green-600">✓</span>}
                        {row.sucuri === false && <span className="text-3xl text-red-600">✗</span>}
                        {row.sucuri === 'partial' && <span className="text-xl text-yellow-600">⚠️</span>}
                        {row.sucuri === 'limited' && <span className="text-sm text-yellow-600">Limited</span>}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.ithemes === true && <span className="text-3xl text-green-600">✓</span>}
                        {row.ithemes === false && <span className="text-3xl text-red-600">✗</span>}
                        {row.ithemes === 'partial' && <span className="text-xl text-yellow-600">⚠️</span>}
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
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Perfect For Every Use Case</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="p-6 border border-slate-200 rounded-lg hover:shadow-lg transition-shadow text-center"
                >
                  <div className="text-5xl mb-4">{useCase.icon}</div>
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
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Performance That Doesn't Compromise</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-5xl font-bold text-blue-600 mb-2">&lt;1ms</div>
                <div className="text-xl font-semibold mb-2">Response Time</div>
                <p className="text-slate-600">Minimal impact on page load speed</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-5xl font-bold text-green-600 mb-2">99.9%</div>
                <div className="text-xl font-semibold mb-2">Uptime</div>
                <p className="text-slate-600">Reliable protection 24/7</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-5xl font-bold text-purple-600 mb-2">&lt;5MB</div>
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
                Download v1.0.0 Free
              </Link>
              <Link
                href="/docs"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold text-lg"
              >
                Read Documentation
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
