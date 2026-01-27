import React, { useState } from 'react';
import axios from 'axios';
import { FileSpreadsheet, Loader2, Download } from 'lucide-react';

const ExcelToPdf = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleConvert = async () => {
        if (!file) return alert("Please select an Excel file.");
        setLoading(true);
        const formData = new FormData();
        formData.append('excel', file);

        try {
            const res = await axios.post('https://api.pdfeditor.live/office-to-pdf'
, formData, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted_spreadsheet.pdf');
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            alert("Conversion failed. Check your backend server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
            <div className="bg-white p-10 rounded-2xl shadow-lg border max-w-lg w-full text-center">
                <FileSpreadsheet size={64} className="text-green-600 mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">Excel to PDF</h1>
                <p className="text-gray-500 mb-8">Select a .xlsx file to convert it into a clean PDF table.</p>
                
                <input 
                    type="file" 
                    accept=".xlsx" 
                    onChange={(e) => setFile(e.target.files[0])}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 mb-6"
                />

                <button 
                    onClick={handleConvert}
                    disabled={loading || !file}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-all disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2" />}
                    {loading ? "Converting..." : "Convert to PDF"}
                </button>
            </div>
        </div>
    );
};

export default ExcelToPdf;