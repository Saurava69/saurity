import Link from 'next/link'
import JsonLd, { generateBreadcrumbSchema, generateFAQSchema } from '@/components/JsonLd'

export const metadata = {
  title: 'WordPress Firewall Protection | Web Application Firewall | Saurity v1.0.0',
  description: 'Enterprise-grade WordPress firewall with SQL injection detection, XSS protection, XML-RPC blocking, and multi-layer attack prevention. Lightweight and fail-safe.',
  alternates: {
    canonical: 'https://www.saurity.com/firewall',
  },
  openGraph: {
    title: 'WordPress Web Application Firewall (WAF) | Saurity v1.0.0',
    description: 'Lightweight firewall blocks SQL injection, XSS, XML-RPC attacks, and malicious bots without slowing down your WordPress site.',
    url: 'https://www.saurity.com/firewall',
    images: ['/HomePage1200_600.webp'],
  },
}

const breadcrumbs = [
  { name: 'Home', url: 'https://www.saurity.com' },
  { name: 'Firewall', url: 'https://www.saurity.com/firewall' },
]

const faqs = [
  {
    question: 'What is a WordPress web application firewall?',
    answer: 'A web application firewall (WAF) inspects incoming HTTP requests to WordPress and blocks malicious patterns like SQL injection, XSS attacks, and brute force attempts before they reach your site. It acts as a protective layer between the internet and your WordPress installation.',
  },
  {
    question: 'How does Saurity detect SQL injection attacks?',
    answer: 'Saurity uses multi-layer pattern detection with URL decoding to identify SQL injection attempts. It detects common patterns like UNION SELECT, OR 1=1, DROP TABLE, and encoded variations that attackers use to bypass simple filters.',
  },
  {
    question: 'Will the firewall slow down my WordPress site?',
    answer: 'No. Saurity&apos;s firewall runs before WordPress fully loads, with lightweight pattern matching that adds less than 5ms overhead per request. It&apos;s designed for performance while maintaining security.',
  },
  {
    question: 'What is XML-RPC and why should I block it?',
    answer: 'XML-RPC is a WordPress API that enables remote publishing and pingbacks. However, it&apos;s frequently abused for brute force attacks and DDoS amplification. Saurity blocks XML-RPC by default since most modern sites don&apos;t need it.',
  },
  {
    question: 'Can the firewall cause false positives?',
    answer: 'Saurity is designed to minimize false positives through intelligent pattern detection and allowlisting. However, if you experience issues, you can add your IP to the allowlist or adjust firewall rules in Settings → SAURITY.',
  },
]

export default function FirewallPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={generateFAQSchema(faqs)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-50 to-white py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Enterprise WordPress Firewall Protection
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Lightweight web application firewall blocks SQL injection, XSS, XML-RPC attacks, and malicious bots. 
              Enterprise security without the enterprise overhead.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://github.com/saurity/saurity/releases" 
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Free Plugin
              </a>
              <a 
                href="https://github.com/saurity/saurity#firewall-protection" 
                className="btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Web Application Firewalls */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Understanding Web Application Firewalls</h2>
            <p className="section-subheading">
              A WAF protects your WordPress site from application-layer attacks that traditional network firewalls miss.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="text-2xl font-semibold mb-4">What WAFs Protect Against</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">⚠</span>
                    <span><strong>SQL Injection:</strong> Attackers manipulating database queries to steal or modify data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">⚠</span>
                    <span><strong>Cross-Site Scripting (XSS):</strong> Injecting malicious scripts to hijack user sessions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">⚠</span>
                    <span><strong>XML-RPC Abuse:</strong> Exploiting WordPress APIs for amplification attacks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">⚠</span>
                    <span><strong>Path Traversal:</strong> Accessing sensitive files outside webroot</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xl">⚠</span>
                    <span><strong>Malicious Bots:</strong> Automated scanners looking for vulnerabilities</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">How WAFs Work</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">1. Request Inspection</h4>
                    <p className="text-blue-800 text-sm">Every HTTP request is analyzed before reaching WordPress</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">2. Pattern Matching</h4>
                    <p className="text-green-800 text-sm">Malicious patterns (SQL keywords, XSS vectors) are detected</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-semibold text-purple-900 mb-2">3. Block or Allow</h4>
                    <p className="text-purple-800 text-sm">Legitimate requests pass through, attacks are blocked immediately</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Saurity Firewall Features */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Saurity Firewall Protection Layers</h2>
            <p className="section-subheading">
              Multi-layer defense system with intelligent pattern detection and fail-safe architecture.
            </p>

            <div className="space-y-12 mt-12">
              {/* Layer 1: Core Firewall */}
              <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-md">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-red-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Core Firewall Rules</h3>
                    <p className="text-gray-700 mb-4">
                      Essential protections against common WordPress attack vectors, active from installation.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold text-gray-900 mb-2">🛡️ XML-RPC Blocking</h4>
                        <p className="text-sm text-gray-600">Blocks xmlrpc.php to prevent DDoS amplification and brute force attacks via Pingback API</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold text-gray-900 mb-2">⚡ POST Flood Protection</h4>
                        <p className="text-sm text-gray-600">Rate limits POST requests to prevent comment spam and form abuse</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold text-gray-900 mb-2">📁 Sensitive Path Protection</h4>
                        <p className="text-sm text-gray-600">Blocks direct access to wp-config.php, .htaccess, and other critical files</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold text-gray-900 mb-2">🔒 HTTP Method Abuse</h4>
                        <p className="text-sm text-gray-600">Restricts dangerous HTTP methods (TRACE, DELETE, PUT) not used by WordPress</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 2: SQL Injection Detection */}
              <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-md">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">SQL Injection Detection</h3>
                    <p className="text-gray-700 mb-4">
                      Multi-layer pattern detection with URL decoding catches encoded and obfuscated SQL injection attempts.
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto mb-4">
                      <div className="text-gray-400">{'//'} Blocked patterns:</div>
                      <div className="text-red-400">UNION SELECT * FROM wp_users</div>
                      <div className="text-red-400">OR 1=1 --</div>
                      <div className="text-red-400">DROP TABLE wp_posts;</div>
                      <div className="text-red-400">%27%20UNION%20SELECT%20 (encoded)</div>
                      <div className="text-gray-400 mt-2">{'//'} Also detects:</div>
                      <div className="text-yellow-400">CONCAT, BENCHMARK, SLEEP, LOAD_FILE</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded p-4">
                      <p className="text-sm text-blue-900">
                        <strong>Technical:</strong> Uses multi-pass URL decoding to catch nested encoding attacks (e.g., double or triple URL encoding that simpler filters miss).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 3: XSS Protection */}
              <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-md">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-yellow-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Cross-Site Scripting (XSS) Protection</h3>
                    <p className="text-gray-700 mb-4">
                      Detects malicious JavaScript injection attempts in URLs, forms, and headers.
                    </p>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded font-mono text-sm overflow-x-auto mb-4">
                      <div className="text-gray-400">{'//'} Blocked patterns:</div>
                      <div className="text-red-400">&lt;script&gt;alert(&apos;XSS&apos;)&lt;/script&gt;</div>
                      <div className="text-red-400">&lt;img src=x onerror=alert(1)&gt;</div>
                      <div className="text-red-400">javascript:void(document.cookie)</div>
                      <div className="text-red-400">&lt;iframe src=evil.com&gt;</div>
                      <div className="text-gray-400 mt-2">{'//'} Event handlers:</div>
                      <div className="text-yellow-400">onerror, onload, onclick, onmouseover</div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                      <p className="text-sm text-yellow-900">
                        <strong>Note:</strong> XSS protection works alongside WordPress&apos;s built-in escaping functions for defense in depth.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 4: User Agent & Referer Filtering */}
              <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-md">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-purple-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Malicious Bot Detection</h3>
                    <p className="text-gray-700 mb-4">
                      Blocks known malicious user agents and suspicious referer patterns used by scrapers and vulnerability scanners.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">🤖 User Agent Blocking</h4>
                        <ul className="text-sm space-y-1 text-gray-700">
                          <li>• Vulnerability scanners (Nikto, sqlmap)</li>
                          <li>• Content scrapers (HTTrack, wget abuse)</li>
                          <li>• Spam bots (SemrushBot abuse)</li>
                          <li>• Malware distribution tools</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">🔗 Referer Checking</h4>
                        <ul className="text-sm space-y-1 text-gray-700">
                          <li>• Blocks spam referers</li>
                          <li>• Prevents external POST abuse</li>
                          <li>• Detects CSRF attempts</li>
                          <li>• Validates comment submissions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 5: Comment Spam Protection */}
              <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-md">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-green-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Comment Spam Protection</h3>
                    <p className="text-gray-700 mb-4">
                      Multi-factor spam detection analyzes comment content, patterns, and behavior.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold text-gray-900 mb-2">📊 Link Analysis</h4>
                        <p className="text-sm text-gray-600">Blocks comments with excessive links (configurable threshold)</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold text-gray-900 mb-2">🔤 Pattern Detection</h4>
                        <p className="text-sm text-gray-600">Identifies spam keywords and pharmaceutical terms</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold text-gray-900 mb-2">📢 CAPS Detection</h4>
                        <p className="text-sm text-gray-600">Flags excessive uppercase text typical of spam</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <h4 className="font-semibold text-gray-900 mb-2">📧 Email Validation</h4>
                        <p className="text-sm text-gray-600">Blocks temporary/disposable email addresses</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layer 6: Advanced Security */}
              <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-md">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-2xl font-bold">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3">Advanced Security Features</h3>
                    <p className="text-gray-700 mb-4">
                      Additional layers of protection for sophisticated attacks and persistent threats.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-indigo-50 p-4 rounded">
                        <h4 className="font-semibold text-indigo-900 mb-2">🐌 Tarpitting</h4>
                        <p className="text-sm text-indigo-800">Intentionally slows down suspected attackers to waste their resources</p>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded">
                        <h4 className="font-semibold text-indigo-900 mb-2">🌐 Subnet Blocking</h4>
                        <p className="text-sm text-indigo-800">Blocks entire IP ranges used by botnets and VPS abuse</p>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded">
                        <h4 className="font-semibold text-indigo-900 mb-2">🍯 Honeypot Detection</h4>
                        <p className="text-sm text-indigo-800">Hidden form fields catch automated bots (zero false positives)</p>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded">
                        <h4 className="font-semibold text-indigo-900 mb-2">⏱️ Timing Analysis</h4>
                        <p className="text-sm text-indigo-800">Detects bots through abnormal form submission speeds</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance & Efficiency */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Lightweight & High-Performance</h2>
            <p className="section-subheading">
              Enterprise security without the enterprise overhead. Saurity&apos;s firewall is optimized for speed.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">&lt;5ms</div>
                <p className="text-gray-700 font-semibold mb-2">Request Overhead</p>
                <p className="text-sm text-gray-600">Firewall adds less than 5 milliseconds per request</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">0</div>
                <p className="text-gray-700 font-semibold mb-2">Database Queries</p>
                <p className="text-sm text-gray-600">All checks run before WordPress loads, no DB overhead</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                <div className="text-5xl font-bold text-purple-600 mb-2">~50KB</div>
                <p className="text-gray-700 font-semibold mb-2">Memory Usage</p>
                <p className="text-sm text-gray-600">Minimal memory footprint for firewall rules</p>
              </div>
            </div>

            <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                How It Stays Fast
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Early Execution:</strong> Firewall runs before WordPress fully loads, reducing overhead</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Optimized Regex:</strong> Pattern matching uses efficient algorithms, not brute force</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Short-Circuit Logic:</strong> Stops checking once a threat is identified</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>No External Calls:</strong> All checks are local, no API lookups or remote databases</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* IP Allowlist & Blocklist */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">IP Management</h2>
            <p className="section-subheading">
              Fine-grained control with allowlists and blocklists supporting individual IPs and CIDR ranges.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white rounded-lg p-8 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-semibold">Allowlist</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Trusted IPs that bypass all firewall checks and rate limiting. Perfect for:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Office IP addresses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Your personal static IP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Monitoring services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Trusted API clients</span>
                  </li>
                </ul>
                <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-xs">
                  <div>192.168.1.100 (Home IP)</div>
                  <div>10.0.0.0/24 (Office Network)</div>
                  <div>203.0.113.5 (Monitoring Service)</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-8 border-2 border-red-200">
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  <h3 className="text-2xl font-semibold">Blocklist</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Permanently banned IPs that cannot access your site. Ideal for:
                </p>
                <ul className="space-y-2 text-gray-700 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">×</span>
                    <span>Known attacker IPs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">×</span>
                    <span>Botnet IP ranges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">×</span>
                    <span>Spam sources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">×</span>
                    <span>Abusive scrapers</span>
                  </li>
                </ul>
                <div className="bg-gray-900 text-gray-100 p-3 rounded font-mono text-xs">
                  <div>198.51.100.42 (Brute forcer)</div>
                  <div>185.220.0.0/16 (Tor exit nodes)</div>
                  <div>45.142.212.0/22 (VPS abuse)</div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-2">CIDR Range Support</h4>
              <p className="text-gray-700 mb-3">
                Both allowlist and blocklist support CIDR notation for blocking entire subnets. This is useful for:
              </p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <code className="bg-gray-200 px-2 py-1 rounded">/24</code> = 256 IPs (common for office networks)</li>
                <li>• <code className="bg-gray-200 px-2 py-1 rounded">/22</code> = 1,024 IPs (common for VPS/hosting providers)</li>
                <li>• <code className="bg-gray-200 px-2 py-1 rounded">/16</code> = 65,536 IPs (large networks or botnet ranges)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Configuration Options */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Firewall Configuration</h2>
            <p className="section-subheading">
              Every firewall feature can be enabled, disabled, or fine-tuned in Settings → SAURITY.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">🛡️ Core Protection</h3>
                <p className="text-gray-600 mb-3">Basic firewall rules (XML-RPC, POST flood, path protection)</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Default</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Enabled</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">💉 SQL Injection Detection</h3>
                <p className="text-gray-600 mb-3">Multi-layer SQLi pattern detection with URL decoding</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Default</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Enabled</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">🔐 XSS Protection</h3>
                <p className="text-gray-600 mb-3">Cross-site scripting detection in all request parameters</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Default</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Enabled</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">🤖 User Agent Filtering</h3>
                <p className="text-gray-600 mb-3">Block malicious bots and vulnerability scanners</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Default</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Enabled</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">📝 Comment Spam Protection</h3>
                <p className="text-gray-600 mb-3">Multi-factor spam detection with configurable thresholds</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Default</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Enabled</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">⚡ General Request Throttling</h3>
                <p className="text-gray-600 mb-3">DoS protection with configurable rate limits</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Default</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Optional</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">🐌 Tarpitting</h3>
                <p className="text-gray-600 mb-3">Intentionally slow down suspected attackers</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Default</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Optional</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-2">🌐 Subnet Blocking</h3>
                <p className="text-gray-600 mb-3">Block entire IP ranges used by botnets</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Default</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Optional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Frequently Asked Questions</h2>
            
            <div className="space-y-6 mt-12">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fail-Safe Architecture */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-heading">Fail-Safe Architecture</h2>
            <p className="section-subheading">
              The firewall is designed to fail open, never blocking legitimate traffic even if errors occur.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="text-xl font-semibold">Allowlist Priority</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Allowlisted IPs bypass all firewall checks, ensuring admins always have access even during attack mitigation.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
                  </svg>
                  <h3 className="text-xl font-semibold">Kill Switch</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  One-click disable in admin settings turns off all firewall enforcement instantly without deactivating the plugin.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h3 className="text-xl font-semibold">Fail-Open Logic</h3>
                </div>
                <p className="text-gray-700 text-sm">
                  If the firewall encounters any error or uncertainty, it allows the request through rather than blocking access.
                </p>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Security Philosophy
              </h4>
              <p className="text-gray-700">
                Saurity prioritizes site availability over aggressive blocking. A blocked legitimate user is worse than a missed attack. 
                The firewall uses conservative patterns and multiple fail-safes to ensure false positives are extremely rare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Protect Your WordPress Site Today
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Enterprise-grade firewall protection that&apos;s lightweight, fail-safe, and completely free. 
              Stop SQL injection, XSS, and bot attacks in under 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://github.com/saurity/saurity/releases" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Plugin
              </a>
              <a 
                href="https://github.com/saurity/saurity#firewall-protection" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md text-white hover:bg-red-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Documentation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Learn More</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/login-security" className="feature-card group">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600">
                  Login Security
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Learn how progressive rate limiting protects against brute force attacks without admin lockouts.
                </p>
                <span className="text-primary-600 text-sm font-medium">Read more →</span>
              </Link>

              <Link href="/features" className="feature-card group">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600">
                  All Features
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Complete overview of Saurity&apos;s security features, configuration options, and technical details.
                </p>
                <span className="text-primary-600 text-sm font-medium">Explore features →</span>
              </Link>

              <a 
                href="https://github.com/saurity/saurity/issues" 
                className="feature-card group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-600">
                  Get Support
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Have questions about firewall configuration? Get help from the community on GitHub.
                </p>
                <span className="text-primary-600 text-sm font-medium">Open issue →</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
