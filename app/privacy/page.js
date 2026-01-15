export const metadata = {
  title: 'Privacy Policy | Saurity v1.0.0',
  description: 'Saurity v1.0.0 privacy policy. Learn how we handle data for our WordPress security plugin - no external data collection, everything stays on your server.',
  alternates: {
    canonical: 'https://www.saurity.com/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          
          <p className="text-gray-600 mb-8">
            Last Updated: January 11, 2026 • Version 1.0.0
          </p>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mt-8 mb-4">Overview</h2>
            <p className="text-gray-700 mb-4">
              Saurity is a WordPress security plugin that operates entirely on your server. 
              We do not collect, transmit, or store any data from your WordPress installation.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Collection</h2>
            <p className="text-gray-700 mb-4">
              <strong>Saurity Plugin (v1.0.0):</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Does NOT send any data to external servers</li>
              <li>Does NOT collect telemetry or analytics</li>
              <li>Does NOT require account creation</li>
              <li>Does NOT use cookies or tracking</li>
              <li>All data stays on your WordPress server</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Stored Locally</h2>
            <p className="text-gray-700 mb-4">
              The Saurity plugin stores the following data in your WordPress database:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Activity Logs:</strong> Login attempts (username, IP address, timestamp, success/failure)</li>
              <li><strong>Rate Limit Counters:</strong> Temporary records of failed attempts per IP (stored in WordPress transients)</li>
              <li><strong>Configuration Settings:</strong> Your chosen rate limit thresholds and preferences</li>
              <li><strong>Block Records:</strong> Temporary IP blocks (stored in WordPress transients)</li>
            </ul>

            <p className="text-gray-700 mb-4">
              This data is stored <strong>only on your server</strong> and is never transmitted to Saurity or any third party.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Data Retention</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Activity Logs:</strong> Automatically limited to last 1,000 entries</li>
              <li><strong>Rate Limit Counters:</strong> Auto-expire after the configured time window (default: 10 minutes)</li>
              <li><strong>Block Records:</strong> Auto-expire after block duration (default: 1 hour)</li>
              <li><strong>All Data:</strong> Completely removed when plugin is uninstalled</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Website Analytics</h2>
            <p className="text-gray-700 mb-4">
              <strong>This Website (saurity.com):</strong>
            </p>
            <p className="text-gray-700 mb-4">
              Currently, this website does not use any analytics or tracking. 
              If we add analytics in the future, we will:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Use privacy-friendly analytics (no cookies)</li>
              <li>Not collect personally identifiable information</li>
              <li>Not share data with third parties</li>
              <li>Update this policy to reflect the change</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              Saurity does not integrate with or send data to any third-party services. 
              The plugin operates entirely within your WordPress installation.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">IP Addresses</h2>
            <p className="text-gray-700 mb-4">
              The plugin logs IP addresses for security purposes (rate limiting and blocking). 
              This data is:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Stored only in your WordPress database</li>
              <li>Used solely for security enforcement</li>
              <li>Automatically cleaned up (last 1,000 log entries)</li>
              <li>Never transmitted off your server</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">User Rights</h2>
            <p className="text-gray-700 mb-4">
              Since all data is stored on your own server:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>You have complete control over the data</li>
              <li>You can view all logs in the plugin admin panel</li>
              <li>You can delete logs manually via the admin interface</li>
              <li>You can uninstall the plugin to remove all data</li>
              <li>No data is shared with Saurity or third parties</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">GDPR Compliance</h2>
            <p className="text-gray-700 mb-4">
              Saurity is designed with privacy in mind:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li><strong>Data Minimization:</strong> Collects only what is necessary for security</li>
              <li><strong>Purpose Limitation:</strong> Data used only for rate limiting and logging</li>
              <li><strong>Storage Limitation:</strong> Automatic cleanup of old data</li>
              <li><strong>Data Portability:</strong> You own all data, stored on your server</li>
              <li><strong>Right to Erasure:</strong> Uninstall plugin to remove all data</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For privacy-related questions:
            </p>
            <ul className="list-none mb-4 text-gray-700 space-y-2">
              <li><strong>GitHub:</strong> <a href="https://github.com/saurity/saurity/issues" className="text-primary-600 hover:text-primary-700">github.com/saurity/saurity</a></li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy as the plugin evolves. 
              Any changes will be posted on this page with an updated revision date.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Summary</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
              <h3 className="font-semibold text-lg mb-3 text-green-900">Key Points</h3>
              <ul className="space-y-2 text-green-900">
                <li>✓ No data sent to external servers</li>
                <li>✓ No telemetry or analytics in the plugin</li>
                <li>✓ All data stays on your WordPress server</li>
                <li>✓ You have complete control over your data</li>
                <li>✓ Clean uninstall removes everything</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
