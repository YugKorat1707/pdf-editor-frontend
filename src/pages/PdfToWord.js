import React, { useState } from 'react';
import axios from 'axios';
import Toast from '../components/Toast'; 
import { FileText, File, Loader2 } from 'lucide-react';
import { addToHistory } from '../utils/history';

const PdfToWord = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false); 

  const handleConvertSubmit = async () => {
    if (!file) return alert("Select a PDF first");
    setLoading(true);
    const formData = new FormData();
    formData.append('pdf', file);
//axios.post("https://your-backend-domain.onrender.com/...")https://your-backend-domain.onrender.com

    try {
      const res = await axios.post('https://api.pdfeditor.live/pdf-to-word', formData, { 
        responseType: 'blob' 
      });
      
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace('.pdf', '.docx');
      document.body.appendChild(a); 
      a.click();
      a.remove(); 

      // 1. Add to local history for the Home page table
      addToHistory("PDF to Word", file.name);

      // 2. Trigger the success notification toast
      setShowToast(true); 

    } catch (err) {
      console.error(err);
      alert("Conversion failed. Check your backend console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">PDF to Word</h1>
      <p className="text-xl text-gray-600 mb-8 text-center">Convert PDF to editable DOCX documents.</p>
      
      <div className="w-full max-w-2xl bg-white border-2 border-dashed border-blue-600 rounded-lg p-12 flex flex-col items-center justify-center relative hover:bg-blue-50 transition-colors">
        <input 
          type="file" 
          accept="application/pdf" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
        <FileText size={64} className="text-blue-600 mb-4" />
        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-xl shadow-lg">Select PDF file</button>
      </div>

      {file && (
        <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex items-center p-3 bg-gray-50 rounded border">
            <File className="text-blue-600 mr-3" size={20} />
            <span className="text-sm text-gray-700 truncate">{file.name}</span>
          </div>
          <button 
            onClick={handleConvertSubmit} 
            disabled={loading} 
            className={`w-full mt-6 py-4 rounded-lg font-bold text-white text-lg flex justify-center items-center ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 transition-all active:scale-95'}`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                CONVERTING...
              </>
            ) : (
              'CONVERT TO WORD'
            )}
          </button>
        </div>
      )}

      {/* Conditional rendering of the Toast */}
      {showToast && (
        <Toast 
          message="Success! Your Word file has been downloaded." 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
};

export default PdfToWord;