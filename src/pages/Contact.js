import { Helmet } from "react-helmet";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us – PDF Tools</title>
        <meta
          name="description"
          content="Contact us for support or business inquiries related to our PDF tools."
        />
      </Helmet>

      <div className="max-w-3xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <form className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Your Name"
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Your Email"
          />
          <textarea
            className="w-full border p-2 rounded"
            rows="5"
            placeholder="Your Message"
          />

          <button className="bg-red-500 text-white px-6 py-2 rounded">
            Send
          </button>
        </form>
      </div>
    </>
  );
}
