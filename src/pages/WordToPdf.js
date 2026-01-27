import React, { useState } from "react";
import axios from "axios";
import { FileText, Download, Loader2, FileUp, AlertCircle } from "lucide-react";
import { addToHistory } from "../utils/history"; //

export default function WordToPdf() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const convert = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file); // Matches backend upload.single("file")

    try {
      const res = await axios.post(
        "https://api.pdfeditor.live/office-to-pdf",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.name.split(".")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      
      // Update local history
      addToHistory("Word to PDF", file.name);
    } catch (err) {
      console.error(err);
      setError("Conversion failed. Please ensure LibreOffice is running on the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full text-center">
        {/* ICON HEADER */}
        <div className="mb-6 flex justify-center">
          <div className="bg-blue-50 p-5 rounded-2xl">
            <FileText size={48} className="text-blue-600" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2">Word to PDF</h1>
        <p className="text-gray-500 mb-8">
          Make DOCX files easy to read by converting them to PDF.
        </p>

        {/* UPLOAD AREA */}
        <div 
          className={`border-2 border-dashed rounded-2xl p-10 mb-6 transition-all relative ${
            file ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <input
            type="file"
            accept=".docx,.doc"
            id="word-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={(e) => {
                setFile(e.target.files[0]);
                setError(null);
            }}
          />
          <FileUp size={32} className={`mx-auto mb-3 ${file ? 'text-blue-500' : 'text-gray-400'}`} />
          <p className="text-sm font-semibold text-gray-700">
            {file ? file.name : "Click or drag your Word file here"}
          </p>
          <p className="text-xs text-gray-400 mt-1">Supports .DOCX and .DOC</p>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center text-red-600 text-sm">
            <AlertCircle size={16} className="mr-2 shrink-0" />
            {error}
          </div>
        )}

        {/* ACTION BUTTON */}
        <button
          onClick={convert}
          disabled={loading || !file}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-black py-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 shadow-lg shadow-red-200"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Converting...
            </>
          ) : (
            <>
              <Download className="mr-2" size={20} />
              Convert to PDF
            </>
          )}
        </button>

        {/* FOOTER LINKS */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-4 text-xs font-bold text-gray-400 uppercase">
          <a href="/privacy" className="hover:text-gray-600">Privacy Policy</a>
          <a href="/terms" className="hover:text-gray-600">Terms of Use</a>
        </div>
      </div>
    </div>
  );
}