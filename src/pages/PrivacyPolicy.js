export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-700">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At PDF Editor Online, your privacy is important to us. This Privacy Policy
        explains how we collect, use, and protect your information when you use
        our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4">
        We do not collect personal information such as name, email, or phone
        number. Uploaded files are processed temporarily and deleted automatically
        after processing.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Uploaded Files</h2>
      <p className="mb-4">
        Files uploaded to our servers are used only to perform the requested
        operation. Files are automatically removed after conversion or editing.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
      <p className="mb-4">
        We use cookies to improve user experience and display advertisements
        through Google AdSense. Google may use cookies to show ads based on your
        visits to this and other websites.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        We use third-party services such as Google AdSense for advertisements.
        These services may collect information according to their own privacy
        policies.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Consent</h2>
      <p className="mb-4">
        By using our website, you consent to our Privacy Policy.
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
