import React, { useState } from 'react';
import axios from 'axios';
import { Minimize, File, Loader2 } from 'lucide-react';

const CompressPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleCompressSubmit = async () => {
    if (!file) return alert("Please select a PDF file.");
    
    setLoading(true);
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:5000/compress', formData, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'compressed_result.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Error compressing PDF. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Compress PDF</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">Reduce file size while optimizing for maximal PDF quality.</p>
      
      <div className="w-full max-w-2xl bg-white border-2 border-dashed border-blue-400 rounded-lg p-12 flex flex-col items-center justify-center relative hover:bg-blue-50 transition-colors">
        <input type="file" accept="application/pdf" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
        <Minimize size={64} className="text-blue-500 mb-4" />
        <button className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-xl shadow-lg">Select PDF file</button>
      </div>

      {file && (
        <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center p-3 bg-gray-50 rounded border">
            <File className="text-blue-500 mr-3" size={20} />
            <span className="text-sm text-gray-700 truncate">{file.name}</span>
          </div>
          <button onClick={handleCompressSubmit} disabled={loading} className={`w-full mt-6 py-4 rounded-lg font-bold text-white text-lg flex justify-center items-center transition-all ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {loading ? <Loader2 className="animate-spin" /> : 'COMPRESS PDF'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CompressPage;