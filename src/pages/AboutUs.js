import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us – Free PDF Tools</title>
        <meta
          name="description"
          content="About our free online PDF tools for merging, splitting and editing PDF files."
        />
      </Helmet>

      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>

        <p className="text-gray-700 leading-relaxed">
          We provide fast, free and secure online PDF tools. Our mission is to
          make PDF editing simple for everyone without installing software.
        </p>
      </div>
    </>
  );
}
