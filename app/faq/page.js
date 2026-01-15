import Link from 'next/link'
import JsonLd from '@/components/JsonLd'

export const metadata = {
  title: 'FAQ - Frequently Asked Questions | Saurity WordPress Security',
  description: 'Get answers to common questions about Saurity WordPress security plugin. Installation, configuration, troubleshooting, features, and comparison with other security plugins.',
  keywords: 'WordPress security FAQ, Saurity questions, security plugin help, WordPress protection questions',
  openGraph: {
    title: 'Saurity FAQ - Your Questions Answered',
    description: 'Common questions about Saurity WordPress security plugin, installation, features, and troubleshooting.',
    url: 'https://www.saurity.com/faq',
    siteName: 'Saurity',
    images: [
      {
        url: 'https://www.saurity.com/HomePage1200_600.webp',
        width: 1200,
        height: 600,
        alt: 'Saurity WordPress Security FAQ',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saurity FAQ - Your Questions Answered',
    description: 'Common questions about Saurity WordPress security plugin, installation, features, and troubleshooting.',
    images: ['https://www.saurity.com/HomePage1200_600.webp'],
  },
  alternates: {
    canonical: 'https://www.saurity.com/faq',
  },
}

const faqs = [
  {
    category: 'General',
    questions: [
      {
        question: 'What is Saurity?',
        answer: 'Saurity is a free, open-source WordPress security plugin that provides enterprise-grade protection without the risk of locking out administrators. It features progressive rate limiting, advanced firewall protection, honeypot detection, and emergency recovery systems.',
      },
      {
        question: 'Is Saurity really free?',
        answer: 'Yes, Saurity is 100% free and open source under the MIT license. There are no premium versions, upsells, or hidden costs. All features are available to everyone at no charge.',
      },
      {
        question: 'What makes Saurity different from other security plugins?',
        answer: 'Saurity is the only WordPress security plugin that guarantees administrators will never be locked out. It uses progressive rate limiting instead of instant blocking, ensuring legitimate users can always access their sites while effectively deterring attackers.',
      },
      {
        question: 'Is Saurity suitable for beginners?',
        answer: 'Yes! Saurity works out of the box with sensible defaults. No complex configuration is required, though advanced users can customize settings to their needs.',
      },
    ],
  },
  {
    category: 'Installation & Setup',
    questions: [
      {
        question: 'How do I install Saurity?',
        answer: 'Download the plugin from GitHub, upload it to your WordPress site via the Plugins → Add New → Upload Plugin menu, and activate it. Full installation instructions are available in our documentation.',
      },
      {
        question: 'What are the system requirements?',
        answer: 'Saurity requires WordPress 5.0 or higher and PHP 7.4 or higher. It works on all major hosting platforms including shared hosting, VPS, and dedicated servers.',
      },
      {
        question: 'Do I need to configure anything after installation?',
        answer: 'No, Saurity works immediately after activation with secure default settings. However, you can customize rate limiting thresholds, IP whitelists, email alerts, and other settings in the plugin dashboard.',
      },
      {
        question: 'Can I use Saurity with other security plugins?',
        answer: 'While Saurity provides comprehensive protection on its own, it can coexist with other security plugins. However, we recommend using Saurity as your primary login security solution to avoid conflicts.',
      },
    ],
  },
  {
    category: 'Features & Functionality',
    questions: [
      {
        question: 'What is progressive rate limiting?',
        answer: 'Progressive rate limiting increases the delay between login attempts exponentially (1s → 2s → 4s → 8s → 16s) instead of blocking users entirely. This discourages attackers while ensuring legitimate users never lose access.',
      },
      {
        question: 'Will administrators ever be locked out?',
        answer: 'No. Saurity guarantees that administrators with correct credentials can always log in, even during active brute force attacks. This is our unique value proposition.',
      },
      {
        question: 'What is the emergency recovery feature?',
        answer: 'Emergency recovery provides a special URL that allows you to regain access to your WordPress dashboard even if you are locked out. It uses secure token-based authentication to ensure only authorized users can access it.',
      },
      {
        question: 'Does Saurity protect against all types of attacks?',
        answer: 'Saurity provides comprehensive protection against brute force attacks, XML-RPC exploits, SQL injection, XSS attacks, and bot traffic. While no security solution can guarantee 100% protection, Saurity significantly reduces your attack surface.',
      },
      {
        question: 'What is honeypot detection?',
        answer: 'Honeypots are invisible form fields that only bots fill out. When a bot is detected via honeypot, Saurity can block or slow down their requests, stopping 99% of automated attacks with zero false positives.',
      },
      {
        question: 'Can I whitelist my IP address?',
        answer: 'Yes, you can whitelist specific IP addresses or CIDR ranges to ensure they are never rate-limited or blocked. This is useful for office IPs or trusted locations.',
      },
    ],
  },
  {
    category: 'Comparison & Migration',
    questions: [
      {
        question: 'How does Saurity compare to Wordfence?',
        answer: 'Unlike Wordfence, Saurity never locks out administrators and has no premium upsells. Saurity is also lighter on server resources and completely open source. See our detailed comparison page for more information.',
      },
      {
        question: 'Should I switch from Wordfence/Sucuri/iThemes to Saurity?',
        answer: 'If you have ever been locked out of your own WordPress site or frustrated by constant premium upgrade prompts, Saurity is the better choice. We offer all essential security features without the frustration.',
      },
      {
        question: 'Can I migrate from another security plugin?',
        answer: 'Yes, you can safely deactivate your existing security plugin and activate Saurity. Your site will be protected immediately with no downtime.',
      },
      {
        question: 'Do I lose my security logs when switching?',
        answer: 'You will not have access to logs from your previous plugin, but Saurity starts logging all security events immediately upon activation.',
      },
    ],
  },
  {
    category: 'Performance & Hosting',
    questions: [
      {
        question: 'Will Saurity slow down my site?',
        answer: 'No. Saurity is highly optimized with minimal performance impact (<1ms response time). It is designed to protect your site without adding noticeable overhead.',
      },
      {
        question: 'Does Saurity work on shared hosting?',
        answer: 'Yes, Saurity is lightweight and works perfectly on shared hosting environments. It uses less than 5MB of memory.',
      },
      {
        question: 'Is Saurity compatible with WooCommerce?',
        answer: 'Yes, Saurity works seamlessly with WooCommerce and protects both customer and admin login areas without interfering with the checkout process.',
      },
      {
        question: 'Can I use Saurity on multisite WordPress installations?',
        answer: 'Yes, Saurity is fully compatible with WordPress multisite networks.',
      },
    ],
  },
  {
    category: 'Troubleshooting',
    questions: [
      {
        question: 'What should I do if I am locked out?',
        answer: 'If you are an administrator, you should never be locked out. However, if you are experiencing issues, use the emergency recovery URL feature or contact support through GitHub.',
      },
      {
        question: 'Why am I not receiving email alerts?',
        answer: 'Check your WordPress email settings and spam folder. Ensure your hosting provider allows outgoing emails. You can also configure SMTP for better email delivery.',
      },
      {
        question: 'How do I view security logs?',
        answer: 'Navigate to the Saurity dashboard in your WordPress admin panel. All security events, blocked attempts, and system status are displayed in real-time.',
      },
      {
        question: 'Can I export security logs?',
        answer: 'Yes, Saurity allows you to export security logs for analysis or compliance purposes.',
      },
    ],
  },
  {
    category: 'Pricing & Licensing',
    questions: [
      {
        question: 'Is there a premium version?',
        answer: 'No. Saurity is completely free with no premium version or paid upgrades. All features are available to everyone.',
      },
      {
        question: 'What is the license?',
        answer: 'Saurity is released under the MIT license, which means you can use, modify, and distribute it freely, even for commercial purposes.',
      },
      {
        question: 'Do you offer support?',
        answer: 'Yes, community support is available through GitHub Issues. We actively maintain the project and respond to questions and bug reports.',
      },
      {
        question: 'Can I contribute to Saurity?',
        answer: 'Absolutely! Saurity is open source and we welcome contributions. Check out our GitHub repository to get started.',
      },
    ],
  },
  {
    category: 'Advanced',
    questions: [
      {
        question: 'Can I customize rate limiting thresholds?',
        answer: 'Yes, you can configure failure thresholds, delay durations, timeout periods, and more in the plugin settings.',
      },
      {
        question: 'Does Saurity support CIDR notation for IP ranges?',
        answer: 'Yes, both whitelist and blacklist support CIDR notation for managing IP ranges efficiently.',
      },
      {
        question: 'Can I integrate Saurity with external security services?',
        answer: 'Saurity is designed to work standalone, but it can coexist with external security services like Cloudflare or Sucuri firewall.',
      },
      {
        question: 'Does Saurity have an API?',
        answer: 'Currently, Saurity does not expose a public API, but this may be added in future versions based on community demand.',
      },
    ],
  },
]

export default function FAQ() {
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
        name: 'FAQ',
        item: 'https://www.saurity.com/faq',
      },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.flatMap(category =>
      category.questions.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      }))
    ),
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />
      
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl opacity-90">
              Everything you need to know about Saurity WordPress security plugin
            </p>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 px-4 bg-white border-b">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Quick Navigation</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {faqs.map((category, index) => (
                <a
                  key={index}
                  href={`#${category.category.toLowerCase().replace(/ /g, '-')}`}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                >
                  {category.category}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {faqs.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                id={category.category.toLowerCase().replace(/ /g, '-')}
                className="scroll-mt-20"
              >
                <h2 className="text-3xl font-bold mb-8 text-blue-600">
                  {category.category}
                </h2>
                <div className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <div
                      key={faqIndex}
                      className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-xl font-bold mb-3 text-slate-800">
                        {faq.question}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Still Have Questions?</h2>
            <p className="text-xl text-slate-600 mb-8">
              We are here to help! Check out our documentation or reach out to the community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/docs"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                View Documentation
              </Link>
              <a
                href="https://github.com/saurity/saurity"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
              >
                GitHub Community
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Download Saurity and protect your WordPress site in minutes.
            </p>
            <Link
              href="/download"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-slate-100 transition-colors font-semibold text-lg"
            >
              Download v1.0.0 Free
            </Link>
            <p className="mt-6 text-sm opacity-75">
              No credit card required • 100% free forever • Open source MIT license
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
