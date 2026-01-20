import React, { useState } from 'react';
import axios from 'axios';
import Toast from '../components/Toast';
import { Image, Loader2 } from 'lucide-react';

const ImagesToPdf = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleConvert = async () => {
    if (files.length === 0) return alert("Select images first");
    setLoading(true);
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('images', f));

    try {
      const res = await axios.post('http://localhost:5000/images-to-pdf', formData, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = "images_to_pdf.pdf";
      a.click();

      setShowToast(true); // Trigger Success Toast
    } catch (e) {
      alert("Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
      <h1 className="text-4xl font-bold mb-8">Images to PDF</h1>
      <div className="w-full max-w-2xl bg-white border-2 border-dashed border-yellow-500 rounded-lg p-12 flex flex-col items-center relative">
        <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFiles(e.target.files)} />
        <Image size={64} className="text-yellow-500 mb-4" />
        <button className="bg-yellow-500 text-white px-8 py-4 rounded-lg font-bold">Select Images</button>
      </div>

      {files.length > 0 && (
        <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded border shadow-sm text-center">
          <p className="mb-4">{files.length} images selected</p>
          <button onClick={handleConvert} disabled={loading} className="w-full bg-yellow-600 text-white py-4 rounded-lg font-bold">
            {loading ? <Loader2 className="animate-spin mx-auto" /> : 'CONVERT TO PDF'}
          </button>
        </div>
      )}

      {showToast && (
        <Toast message="Success! Your images are now a PDF." onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default ImagesToPdf;