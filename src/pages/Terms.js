export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto p-8 text-gray-700">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

      <p className="mb-4">
        By accessing and using PDF Editor Online, you agree to comply with the
        following terms and conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Service</h2>
      <p className="mb-4">
        This website provides free online PDF tools. You agree not to misuse the
        services or attempt to disrupt the platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">File Responsibility</h2>
      <p className="mb-4">
        Users are responsible for the files they upload. We are not liable for
        any data loss or damages resulting from use of our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Service Availability</h2>
      <p className="mb-4">
        We do not guarantee uninterrupted availability of the service and may
        modify or discontinue features at any time.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Limitation of Liability</h2>
      <p className="mb-4">
        PDF Editor Online shall not be held responsible for any indirect or
        consequential damages arising from use of the website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to update these terms at any time without notice.
      </p>

      <p className="mt-8 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
