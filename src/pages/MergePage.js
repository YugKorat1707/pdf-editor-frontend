import React, { useState } from "react";
import axios from "axios";
import Toast from "../components/Toast";
import { Combine, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";

const MergePage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleMergeSubmit = async () => {
    if (files.length < 2) {
      alert("Select at least 2 PDF files");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("pdfs", file));

    try {
      const res = await axios.post(
        "https://api.pdfeditor.live/merge",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged_result.pdf";
      a.click();

      setShowToast(true);
    } catch (err) {
      alert("PDF merge failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ SEO META TAGS */}
      <Helmet>
        <title>Merge PDF Online Free | Combine PDF Files Easily</title>
        <meta
          name="description"
          content="Merge PDF files online for free. Combine multiple PDFs into one document quickly, securely, and easily."
        />
        <meta
          name="keywords"
          content="merge pdf, combine pdf, pdf merger online, join pdf files"
        />
        <link rel="canonical" href="https://pdfeditor.live/merge-pdf" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Merge PDF Files
        </h1>

        {/* Upload Box */}
        <div className="w-full max-w-2xl bg-white border-2 border-dashed border-red-500 rounded-lg p-12 flex flex-col items-center relative">
          <input
            type="file"
            multiple
            accept="application/pdf"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => setFiles(e.target.files)}
          />

          <Combine size={64} className="text-red-500 mb-4" />

          <button className="bg-red-500 text-white px-8 py-4 rounded-lg font-bold">
            Select PDF files
          </button>

          <p className="mt-4 text-gray-500 text-sm text-center">
            Select two or more PDF files to merge into one
          </p>
        </div>

        {/* Action Panel */}
        {files.length > 0 && (
          <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded border shadow-sm">
            <p className="text-center mb-4 font-medium">
              {files.length} PDF files selected
            </p>

            <button
              onClick={handleMergeSubmit}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-bold transition"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "MERGE PDF"
              )}
            </button>
          </div>
        )}

        {/* Success Toast */}
        {showToast && (
          <Toast
            message="Success! Your PDFs have been merged."
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </>
  );
};

export default MergePage;
