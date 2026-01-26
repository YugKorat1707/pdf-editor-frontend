import React, { useState } from "react";
import axios from "axios";
import { LockOpen, Loader2, FileUp, AlertCircle, CheckCircle2, ShieldOff } from "lucide-react";
import { addToHistory } from "../utils/history"; 

export default function UnlockPdf() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const unlock = async () => {
    if (!file || !password) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("password", password);

    try {
      const res = await axios.post(
        "http://localhost:5000/unlock-pdf",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `${file.name.replace(/\.[^/.]+$/, "")}_unlocked.pdf`;
      a.click();

      setSuccess(true);
      addToHistory("Unlock PDF", file.name); 
    } catch (err) {
      console.error(err);
      setError("Unlock failed. Please ensure the password is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full text-center">

        <LockOpen size={52} className="mx-auto text-emerald-500 mb-4" />

        <h1 className="text-3xl font-black mb-2">Unlock PDF</h1>
        <p className="text-gray-500 mb-6">Remove password from your PDF</p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        {error && (
          <div className="text-red-600 flex items-center gap-2 mb-3">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 flex items-center gap-2 mb-3">
            <CheckCircle2 size={18} /> PDF unlocked successfully
          </div>
        )}

        <button
          onClick={unlock}
          disabled={loading || !file || !password}
          className="w-full bg-red-500 text-white py-3 rounded flex justify-center items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <ShieldOff size={18} />}
          Unlock PDF
        </button>
      </div>
    </div>
  );
}
