import React, { useState } from "react";
import axios from "axios";
import { Lock, Download, Loader2, FileUp, AlertCircle, CheckCircle2, ShieldCheck } from "lucide-react";
import { addToHistory } from "../utils/history"; 

export default function ProtectPdf() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const protect = async () => {
    if (!file || !password) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("password", password); 

    try {
      const res = await axios.post(
        "http://localhost:5000/protect-pdf",
        formData,
        { responseType: "blob" }
      );

      // Create a download link for the protected PDF
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.name.replace(/\.[^/.]+$/, "")}_protected.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      
      setSuccess(true);
      // Save to local activity history
      addToHistory("Protect PDF", file.name); 
    } catch (err) {
      console.error(err);
      setError("Protection failed. Ensure the file is not already encrypted.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-gray-50 flex flex-col items-center justify-center py-12 px-4 font-sans">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 max-w-lg w-full text-center">
        
        {/* Header Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-red-50 p-6 rounded-[1.5rem] transition-transform hover:scale-110 duration-300">
            <Lock size={52} className="text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Protect PDF</h1>
        <p className="text-gray-500 mb-8 font-medium">
          Secure your sensitive documents with strong encryption.
        </p>

        {/* Upload Container */}
        <div 
          className={`border-2 border-dashed rounded-[2rem] p-10 mb-6 transition-all relative group ${
            file ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100 hover:border-red-300'
          }`}
        >
          <input
            type="file"
            accept=".pdf"
            id="pdf-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={(e) => {
                setFile(e.target.files[0]);
                setError(null);
                setSuccess(false);
            }}
          />
          <div className="flex flex-col items-center">
            <div className={`p-4 rounded-full mb-3 transition-colors ${file ? 'bg-red-200 text-red-600' : 'bg-gray-200 text-gray-400 group-hover:text-red-400'}`}>
                <FileUp size={32} />
            </div>
            <p className="text-sm font-bold text-gray-800 break-all px-4">
              {file ? file.name : "Select PDF file to protect"}
            </p>
          </div>
        </div>

        {/* Password Input Area */}
        <div className="mb-6 text-left">
          <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Set Password</label>
          <div className="relative">
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all font-mono"
            />
            <ShieldCheck className={`absolute right-4 top-4 ${password.length > 6 ? 'text-green-500' : 'text-gray-300'}`} size={20} />
          </div>
        </div>

        {/* Feedback Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center text-red-600 text-sm font-bold animate-in fade-in slide-in-from-top-2 text-left">
            <AlertCircle size={18} className="mr-3 shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center text-green-700 text-sm font-bold animate-in fade-in slide-in-from-top-2 text-left">
            <CheckCircle2 size={18} className="mr-3 shrink-0" />
            PDF Encrypted! Your download has started.
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={protect}
          disabled={loading || !file || !password}
          className="w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-black py-5 rounded-2xl flex items-center justify-center transition-all disabled:opacity-40 disabled:active:scale-100 shadow-xl shadow-red-200"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-3" size={24} />
              <span className="text-lg">Securing PDF...</span>
            </>
          ) : (
            <>
              <Lock className="mr-3" size={20} />
              <span className="text-lg uppercase">Protect PDF</span>
            </>
          )}
        </button>

        {/* Legal Links */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex justify-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <a href="/privacy" className="hover:text-red-500 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-red-500 transition-colors">Terms of Use</a>
        </div>
      </div>
    </div>
  );
}