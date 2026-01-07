export const metadata = {
  title: 'Terms of Service | Saurity',
  description: 'Terms of service for using Saurity WordPress security plugin.',
  alternates: {
    canonical: 'https://saurity.com/terms',
  },
}

export default function TermsPage() {
  return (
    <div className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          
          <p className="text-gray-600 mb-8">
            Last Updated: January 7, 2026
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mt-8 mb-4">License</h2>
            <p className="text-gray-700 mb-4">
              Saurity is licensed under the GNU General Public License v2 (or later). 
              You are free to use, modify, and distribute the plugin under the terms of this license.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Warranty Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
              INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
              PURPOSE AND NONINFRINGEMENT.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>In plain English:</strong> Saurity is provided free of charge. While we strive for quality 
              and reliability, we cannot guarantee it will work perfectly in all environments or prevent all security threats.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
              LIABILITY ARISING FROM THE USE OF THIS SOFTWARE.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>What this means:</strong> We are not responsible for any damages, data loss, or security breaches 
              that may occur while using Saurity. Always maintain backups and use security as part of a layered defense strategy.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">User Responsibilities</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Test the plugin on a staging site before deploying to production</li>
              <li>Keep WordPress, PHP, and all plugins updated</li>
              <li>Save the emergency bypass URL provided on activation</li>
              <li>Use strong passwords for all WordPress user accounts</li>
              <li>Maintain regular backups of your WordPress site</li>
              <li>Monitor activity logs regularly</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Security Limitations</h2>
            <p className="text-gray-700 mb-4">
              Saurity v0.1 provides login security and basic firewall protection. It does NOT:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Scan for malware or backdoors</li>
              <li>Monitor file integrity</li>
              <li>Provide 2FA or OAuth (planned for future versions)</li>
              <li>Replace the need for other security measures</li>
              <li>Guarantee prevention of all attacks</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Support</h2>
            <p className="text-gray-700 mb-4">
              Saurity is open-source software. Support is provided on a best-effort basis through:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>GitHub Issues: <a href="https://github.com/saurity/saurity/issues" className="text-primary-600 hover:text-primary-700">Report bugs and request features</a></li>
              <li>Documentation: Available on this website</li>
              <li>Community: No official support guarantee</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may update these terms as the plugin evolves. Continued use of the plugin constitutes 
              acceptance of any changes.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
            <p className="text-gray-700 mb-4">
              Questions about these terms? Open an issue on GitHub or review the full GPL v2 license 
              included with the plugin.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-lg mb-3">Important Reminders</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Saurity is free and open source (GPL v2)</li>
                <li>• No warranty or liability guarantees</li>
                <li>• Test before deploying to production</li>
                <li>• Save your emergency bypass URL</li>
                <li>• Use as part of layered security strategy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}