import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

export const metadata = {
  title: 'Use Cases - WordPress Security Solutions by Industry | Saurity',
  description: 'Discover how Saurity protects different types of WordPress sites: e-commerce, membership sites, corporate websites, multi-author blogs, high-traffic sites, and shared hosting environments.',
  keywords: 'WordPress security for e-commerce, WooCommerce security, membership site security, blog security, enterprise WordPress security',
  openGraph: {
    title: 'Saurity Use Cases - Security Solutions for Every WordPress Site',
    description: 'Industry-specific WordPress security implementations for e-commerce, membership sites, corporate websites, and more.',
    url: 'https://www.saurity.com/use-cases',
    siteName: 'Saurity',
    images: [
      {
        url: 'https://www.saurity.com/HomePage1200_600.webp',
        width: 1200,
        height: 600,
        alt: 'Saurity WordPress Security Use Cases',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saurity Use Cases - Security Solutions for Every WordPress Site',
    description: 'Industry-specific WordPress security implementations for e-commerce, membership sites, corporate websites, and more.',
    images: ['https://www.saurity.com/HomePage1200_600.webp'],
  },
  alternates: {
    canonical: 'https://www.saurity.com/use-cases',
  },
}

const useCases = [
  {
    title: 'E-commerce Sites (WooCommerce)',
    icon: '🛒',
    description: 'Protect customer data and transactions without blocking legitimate shoppers.',
    challenges: [
      'Customer accounts vulnerable to credential stuffing',
      'Payment information at risk',
      'High volume of automated bot traffic',
      'Need to balance security with user experience',
    ],
    solutions: [
      'Progressive rate limiting prevents brute force attacks without blocking customers',
      'Honeypot detection stops 99% of bots before they reach checkout',
      'Admin accounts always accessible for urgent order management',
      'Real-time alerts for suspicious activity during peak sales',
    ],
    benefits: [
      'Zero customer lockouts during checkout',
      'Protected payment processes',
      'Reduced fraud and chargebacks',
      'Compliance with PCI-DSS security requirements',
    ],
    stats: {
      metric1: '99.9%',
      label1: 'Uptime During Sales',
      metric2: '0',
      label2: 'Customer Lockouts',
      metric3: '<1ms',
      label3: 'Impact on Checkout',
    },
  },
  {
    title: 'Membership Sites',
    icon: '👥',
    description: 'Secure member logins while ensuring members never get locked out.',
    challenges: [
      'Multiple user accounts to protect',
      'Forgotten passwords leading to frustration',
      'Subscription access issues impact revenue',
      'Need for reliable member access 24/7',
    ],
    solutions: [
      'Members always get through with correct credentials',
      'Progressive delays discourage attackers without blocking users',
      'IP whitelisting for corporate or institutional members',
      'Emergency recovery for premium members',
    ],
    benefits: [
      'Happy members with reliable access',
      'Reduced support tickets for lockouts',
      'Protected member data and content',
      'Better member retention rates',
    ],
    stats: {
      metric1: '100%',
      label1: 'Member Access Rate',
      metric2: '90%',
      label2: 'Support Ticket Reduction',
      metric3: '24/7',
      label3: 'Guaranteed Access',
    },
  },
  {
    title: 'Corporate Websites',
    icon: '🏢',
    description: 'Enterprise-grade security that meets compliance requirements.',
    challenges: [
      'Multiple admin users need secure access',
      'Compliance requirements (GDPR, HIPAA, SOC 2)',
      'Corporate IP ranges need whitelisting',
      'Audit trails and security logs required',
    ],
    solutions: [
      'Comprehensive security logs for compliance',
      'CIDR range support for corporate networks',
      'Admin guarantee ensures business continuity',
      'Email alerts to security teams',
    ],
    benefits: [
      'Meets enterprise compliance standards',
      'Detailed audit trails for security reviews',
      'Zero downtime from lockouts',
      'Integration with corporate security policies',
    ],
    stats: {
      metric1: '100%',
      label1: 'Compliance Coverage',
      metric2: 'Full',
      label2: 'Audit Trail',
      metric3: 'Zero',
      label3: 'Business Disruption',
    },
  },
  {
    title: 'Multi-Author Blogs',
    icon: '✍️',
    description: 'Protect multiple login endpoints without frustrating authors.',
    challenges: [
      'Dozens or hundreds of contributor accounts',
      'Authors working from various locations',
      'Frequent password resets causing delays',
      'Need to protect editorial workflow',
    ],
    solutions: [
      'No author ever blocked from publishing deadlines',
      'Flexible rate limiting per user role',
      'IP whitelisting for editorial offices',
      'Detailed logs showing all login activity',
    ],
    benefits: [
      'Uninterrupted publishing workflow',
      'Protected author accounts',
      'Reduced IT support burden',
      'Better content security',
    ],
    stats: {
      metric1: '100%',
      label1: 'Author Productivity',
      metric2: 'Zero',
      label2: 'Deadline Misses',
      metric3: '75%',
      label3: 'Fewer Support Calls',
    },
  },
  {
    title: 'High-Traffic Sites',
    icon: '📈',
    description: 'Efficient protection that scales with your traffic.',
    challenges: [
      'Massive concurrent login attempts',
      'Performance degradation from security overhead',
      'Need to handle traffic spikes',
      'Resource constraints on scaling',
    ],
    solutions: [
      'Lightweight design with minimal overhead',
      'Efficient database queries for high performance',
      'Scales horizontally without issues',
      'Optimized for high-traffic scenarios',
    ],
    benefits: [
      'No performance impact during traffic spikes',
      'Handles millions of requests efficiently',
      'Lower server costs',
      'Better user experience',
    ],
    stats: {
      metric1: '<1ms',
      label1: 'Response Time',
      metric2: '<5MB',
      label2: 'Memory Usage',
      metric3: 'Unlimited',
      label3: 'Scalability',
    },
  },
  {
    title: 'Shared Hosting Environments',
    icon: '🖥️',
    description: 'Lightweight security that works on resource-limited hosting.',
    challenges: [
      'Limited server resources',
      'Shared IP addresses with neighbors',
      'Cannot install system-level security',
      'Budget constraints for security tools',
    ],
    solutions: [
      'Minimal resource footprint',
      'Works within shared hosting limitations',
      'No server-level access required',
      'Completely free with no premium costs',
    ],
    benefits: [
      'Professional security on budget hosting',
      'No server performance impact',
      'Easy plugin installation',
      'Zero additional costs',
    ],
    stats: {
      metric1: '<5MB',
      label1: 'Memory Footprint',
      metric2: '$0',
      label2: 'Monthly Cost',
      metric3: '100%',
      label3: 'Hosting Compatible',
    },
  },
]

// const testimonials = [
//   {
//     quote: 'Saurity saved our WooCommerce store during Black Friday. Zero customer lockouts and complete protection.',
//     author: 'Sarah Johnson',
//     role: 'E-commerce Manager',
//     company: 'Fashion Boutique',
//   },
//   {
//     quote: 'Finally, a security plugin that does not lock out our 50+ contributors. Game changer for our newsroom.',
//     author: 'Michael Chen',
//     role: 'CTO',
//     company: 'Digital News Network',
//   },
//   {
//     quote: 'Passed our SOC 2 audit with Saurity providing comprehensive security logs and protection.',
//     author: 'David Martinez',
//     role: 'Security Director',
//     company: 'Tech Corp',
//   },
// ]

export default function UseCases() {
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
        name: 'Use Cases',
        item: 'https://www.saurity.com/use-cases',
      },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Security Solutions for Every WordPress Site
            </h1>
            <p className="text-xl opacity-90">
              Industry-specific implementations that protect your unique needs
            </p>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto space-y-20">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
              >
                {/* Content */}
                <div className="flex-1">
                  <div className="text-6xl mb-4">{useCase.icon}</div>
                  <h2 className="text-4xl font-bold mb-4">{useCase.title}</h2>
                  <p className="text-xl text-slate-600 mb-8">{useCase.description}</p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-red-600">Common Challenges</h3>
                      <ul className="space-y-2">
                        {useCase.challenges.map((challenge, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">⚠</span>
                            <span className="text-slate-700">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 text-blue-600">Saurity Solutions</h3>
                      <ul className="space-y-2">
                        {useCase.solutions.map((solution, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">💡</span>
                            <span className="text-slate-700">{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3 text-green-600">Key Benefits</h3>
                      <ul className="space-y-2">
                        {useCase.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span className="text-slate-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="flex-1 w-full">
                  <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-blue-100">
                    <h3 className="text-2xl font-bold mb-6 text-center">Impact Metrics</h3>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {useCase.stats.metric1}
                        </div>
                        <div className="text-sm text-slate-600">{useCase.stats.label1}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {useCase.stats.metric2}
                        </div>
                        <div className="text-sm text-slate-600">{useCase.stats.label2}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600 mb-2">
                          {useCase.stats.metric3}
                        </div>
                        <div className="text-sm text-slate-600">{useCase.stats.label3}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        {/* <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <div className="text-4xl mb-4">💬</div>
                  <p className="text-slate-700 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="border-t pt-4">
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-slate-600">{testimonial.role}</div>
                    <div className="text-sm text-slate-500">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Industry Selector */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Which Industry Best Describes You?</h2>
            <p className="text-xl text-slate-600 mb-8">
              Choose your scenario to see detailed implementation guides
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/docs"
                className="p-6 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="text-4xl mb-2">🛒</div>
                <div className="font-bold">E-commerce</div>
              </Link>
              <Link
                href="/docs"
                className="p-6 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="text-4xl mb-2">👥</div>
                <div className="font-bold">Membership</div>
              </Link>
              <Link
                href="/docs"
                className="p-6 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="text-4xl mb-2">🏢</div>
                <div className="font-bold">Corporate</div>
              </Link>
              <Link
                href="/docs"
                className="p-6 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="text-4xl mb-2">✍️</div>
                <div className="font-bold">Publishing</div>
              </Link>
              <Link
                href="/docs"
                className="p-6 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="text-4xl mb-2">📈</div>
                <div className="font-bold">High-Traffic</div>
              </Link>
              <Link
                href="/docs"
                className="p-6 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="text-4xl mb-2">🖥️</div>
                <div className="font-bold">Small Business</div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready for Your Use Case?</h2>
            <p className="text-xl mb-8 opacity-90">
              Download Saurity and protect your WordPress site today - regardless of your industry or setup.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/download"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-slate-100 transition-colors font-semibold text-lg"
              >
                Download v1.0.0 Free
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
