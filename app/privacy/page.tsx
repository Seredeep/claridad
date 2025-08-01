export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 2024</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          <p className="mb-6 text-gray-700">
            We collect information you provide directly to us, such as when you create an account, join our waitlist, or
            contact us for support.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
          <ul className="mb-6 list-disc pl-6 text-gray-700">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our service</li>
            <li>To monitor usage of our service</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
          <p className="mb-6 text-gray-700">
            We implement appropriate security measures to protect your personal information. However, no method of
            transmission over the internet is 100% secure.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Location Data</h2>
          <p className="mb-6 text-gray-700">
            We may collect location data to provide relevant safety information for your area. This data is anonymized
            and used only for safety analytics.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
          <p className="mb-6 text-gray-700">
            We do not sell, trade, or rent your personal information to third parties. We may share aggregated,
            anonymized data for research purposes.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
          <p className="mb-6 text-gray-700">
            You have the right to access, update, or delete your personal information. Contact us at
            privacy@claridad.com to exercise these rights.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at privacy@claridad.com
          </p>
        </div>
      </div>
    </div>
  )
}
