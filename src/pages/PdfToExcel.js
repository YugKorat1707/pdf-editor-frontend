import React, { useState } from 'react';
import axios from 'axios';
// ❌ remove Download
import { FileType, Loader2, Table } from "lucide-react";

//import { Table, Loader2, Download, FileType } from 'lucide-react';
import { addToHistory } from '../utils/history';

const PdfToExcel = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleConvert = async () => {
        if (!file) return alert("Please select a PDF file.");
        setLoading(true);
        const formData = new FormData();
        formData.append('pdf', file);

        try {
           
            const res = await axios.post('https://api.pdfeditor.live/office-to-pdf', formData, { 
                responseType: 'blob' 
            });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted_data.xlsx');
            addToHistory("PDF to Excel", file.name);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert("Conversion failed. Ensure your backend server is running and exceljs is installed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
            <div className="bg-white p-10 rounded-2xl shadow-lg border max-w-lg w-full text-center">
                <Table size={64} className="text-emerald-700 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">PDF to Excel</h1>
                <p className="text-gray-500 mb-8">Extract tabular data and text from your PDF into an editable Excel spreadsheet.</p>
                
                <input 
                    type="file" 
                    accept="application/pdf" 
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 mb-6"
                />

                <button 
                    onClick={handleConvert}
                    disabled={loading || !file}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <FileType className="mr-2" />}
                    {loading ? "Extracting Data..." : "Convert to Excel"}
                </button>
            </div>
        </div>
    );
};

export default PdfToExcel;