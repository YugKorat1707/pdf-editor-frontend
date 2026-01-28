import React, { useState } from 'react';
import axios from 'axios';
import { Presentation, Loader2, Download, FileUp } from 'lucide-react';
import { addToHistory } from '../utils/history';

const PdfToPpt = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleConvert = async () => {
        if (!file) return alert("Please select a PDF file.");
        setLoading(true);
        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const res = await axios.post('https://api.pdfeditor.live/pdf-to-ppt', formData, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted_slides.pptx');
            document.body.appendChild(link);
            link.click();
            addToHistory("PDF to PPT", file.name);
        } catch (err) {
            alert("Conversion failed. Ensure backend 'pptxgenjs' is installed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
            <div className="bg-white p-10 rounded-2xl shadow-lg border max-w-lg w-full text-center">
                <Presentation size={64} className="text-orange-700 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">PDF to PPT</h1>
                <p className="text-gray-500 mb-8">Transform your PDF content into editable PowerPoint slides.</p>
                
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 mb-6 bg-gray-50 hover:bg-gray-100 transition-colors relative">
                    <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <FileUp size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">{file ? file.name : "Click to select PDF file"}</p>
                </div>

                <button onClick={handleConvert} disabled={loading || !file} className="w-full bg-orange-700 hover:bg-orange-800 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all disabled:opacity-50 shadow-md">
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2" />}
                    {loading ? "Extracting Slides..." : "Convert to PPT"}
                </button>
            </div>
        </div>
    );
};

export default PdfToPpt;