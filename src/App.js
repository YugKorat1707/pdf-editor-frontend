import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import {
  Merge,
  Scissors,
  Minimize2,
  FileText,
  Image,
  FileEdit,
  Clock,
  FileSpreadsheet,
  Table,
  Presentation,
  MonitorPlay,
  Code2,
  Lock,
  UnlockKeyhole
} from "lucide-react";

import Navbar from "./components/Navbar";
import ToolCard from "./components/ToolCard";

import MergePage from "./pages/MergePage";
import SplitPage from "./pages/SplitPage";
import CompressPage from "./pages/CompressPage";
import PdfToWord from "./pages/PdfToWord";
import ImagesToPdf from "./pages/ImagesToPdf";
import EditPdf from "./pages/EditPdf";
import ExcelToPdf from "./pages/ExcelToPdf";
import PdfToExcel from "./pages/PdfToExcel";
import PptToPdf from "./pages/PptToPdf";
import PdfToPpt from "./pages/PdfToPpt";
import WordToPdf from "./pages/WordToPdf";
import HtmlToPdf from "./pages/HtmlToPdf";
import UnlockPdf from "./pages/UnlockPdf";
import ProtectPdf from "./pages/ProtectPdf";
import CropPdf from "./pages/CropPdf";
import EditTextPdf from "./pages/EditTextPdf";
//import PrivacyPolicy from "./pages/PrivacyPolicy";
//import Terms from "./pages/Terms";
import AllPdfTools from "./pages/AllPdfTools";
import Signup from './pages/Signup';
import Login from './pages/Login'; // Create Login.js similarly
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";


/* ---------------- HOME ---------------- */
const Home = ({ tools }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("pdf_history") || "[]"));
  }, []);

  return (
    <>
      <header className="py-16 text-center bg-white border-b">
        <h1 className="text-4xl font-bold">Every tool you need to work with PDFs</h1>
        <p className="text-gray-600 mt-2"> PDF editor </p>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, i) => (
            <Link key={i} to={tool.path}>
              <ToolCard {...tool} />
            </Link>
          ))}
        </div>

        {history.length > 0 && (
          <div className="mt-12 bg-white p-6 rounded-xl shadow">
            <div className="flex items-center mb-4">
              <Clock className="mr-2 text-blue-600" />
              <h2 className="text-xl font-bold">Recent Activity</h2>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {history.map((h, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{h.tool}</td>
                    <td className="py-2">{h.file}</td>
                    <td className="py-2 text-right">{h.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
};

/* ---------------- APP ---------------- */
export default function App() {
  // const tools = [
  //   { title: "Merge PDF", path: "/merge", desc: "Combine PDFs", icon: Merge },
  //   { title: "Split PDF", path: "/split", desc: "Split pages", icon: Scissors },
  //   { title: "Compress PDF", path: "/compress", desc: "Reduce size", icon: Minimize2 },
  //   { title: "PDF to Word", path: "/pdf-to-word", desc: "Convert PDF", icon: FileText },
  //   { title: "Images to PDF", path: "/images-to-pdf", desc: "Images → PDF", icon: Image },
  //   { title: "Edit PDF", path: "/edit-pdf", desc: "Edit text & crop", icon: FileEdit },
  //   { title: "Excel to PDF", path: "/excel-to-pdf", desc: "XLS → PDF", icon: FileSpreadsheet },
  //   { title: "PDF to Excel", path: "/pdf-to-excel", desc: "Extract tables", icon: Table },
  //   { title: "PPT to PDF", path: "/ppt-to-pdf", desc: "Slides → PDF", icon: MonitorPlay },
  //   { title: "PDF to PPT", path: "/pdf-to-ppt", desc: "PDF → Slides", icon: Presentation },
  //   { title: "Word to PDF", path: "/word-to-pdf", desc: "DOC → PDF", icon: FileText },
  //   { title: "HTML to PDF", path: "/html-to-pdf", desc: "HTML → PDF", icon: Code2 },
  //   { title: "Unlock PDF", path: "/unlock-pdf", desc: "Remove password", icon: UnlockKeyhole },
  //   { title: "Protect PDF", path: "/protect-pdf", desc: "Add password", icon: Lock },
  // ];

  const tools = [
  {
    title: "Merge PDF",
    path: "/merge",
    description: "Combine PDFs",
    icon: Merge,
    color: "bg-red-500",
  },
  {
    title: "Split PDF",
    path: "/split",
    description: "Split pages",
    icon: Scissors,
    color: "bg-orange-500",
  },
  {
    title: "Compress PDF",
    path: "/compress",
    description: "Reduce size",
    icon: Minimize2,
    color: "bg-blue-500",
  },
  {
    title: "PDF to Word",
    path: "/pdf-to-word",
    description: "Convert PDF",
    icon: FileText,
    color: "bg-indigo-500",
  },
  {
    title: "Images to PDF",
    path: "/images-to-pdf",
    description: "Images → PDF",
    icon: Image,
    color: "bg-yellow-500",
  },
  {
    title: "Edit PDF",
    path: "/edit-pdf",
    description: "Edit text & crop",
    icon: FileEdit,
    color: "bg-purple-500",
  },
  {
    title: "Excel to PDF",
    path: "/excel-to-pdf",
    description: "XLS → PDF",
    icon: FileSpreadsheet,
    color: "bg-green-600",
  },
  {
    title: "PDF to Excel",
    path: "/pdf-to-excel",
    description: "Extract tables",
    icon: Table,
    color: "bg-emerald-600",
  },
  {
    title: "PPT to PDF",
    path: "/ppt-to-pdf",
    description: "Slides → PDF",
    icon: MonitorPlay,
    color: "bg-orange-600",
  },
  {
    title: "PDF to PPT",
    path: "/pdf-to-ppt",
    description: "PDF → Slides",
    icon: Presentation,
    color: "bg-orange-700",
  },
  {
    title: "Word to PDF",
    path: "/word-to-pdf",
    description: "DOC → PDF",
    icon: FileText,
    color: "bg-blue-600",
  },
  {
    title: "HTML to PDF",
    path: "/html-to-pdf",
    description: "HTML → PDF",
    icon: Code2,
    color: "bg-gray-700",
  },
  {
    title: "Unlock PDF",
    path: "/unlock-pdf",
    description: "Remove password",
    icon: UnlockKeyhole,
    color: "bg-teal-600",
  },
  {
    title: "Protect PDF",
    path: "/protect-pdf",
    description: "Add password",
    icon: Lock,
    color: "bg-red-600",
  },
  {
  title: "Edit Text PDF",
  path: "/edit-text",
  description: "Edit existing PDF text",
  icon: FileEdit,
  color: "bg-purple-600",
},

];


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home tools={tools} />} />
        <Route path="/merge" element={<MergePage />} />
        <Route path="/split" element={<SplitPage />} />
        <Route path="/compress" element={<CompressPage />} />
        <Route path="/pdf-to-word" element={<PdfToWord />} />
        <Route path="/images-to-pdf" element={<ImagesToPdf />} />
        <Route path="/edit-pdf" element={<EditPdf />} />
        <Route path="/excel-to-pdf" element={<ExcelToPdf />} />
        <Route path="/pdf-to-excel" element={<PdfToExcel />} />
        <Route path="/ppt-to-pdf" element={<PptToPdf />} />
        <Route path="/pdf-to-ppt" element={<PdfToPpt />} />
        <Route path="/word-to-pdf" element={<WordToPdf />} />
        <Route path="/html-to-pdf" element={<HtmlToPdf />} />
        <Route path="/unlock-pdf" element={<UnlockPdf />} />
        <Route path="/protect-pdf" element={<ProtectPdf />} />
        <Route path="/crop" element={<CropPdf />} />
        <Route path="/edit-text" element={<EditTextPdf />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/all-tools" element={<AllPdfTools tools={tools} />}/>
        <Route path="/about" element={<AboutUs />} />
<Route path="/contact" element={<Contact />} />
        

<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
