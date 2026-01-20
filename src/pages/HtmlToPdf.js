import { useState } from "react";
import axios from "axios";

export default function HtmlToPdf() {
  const [html, setHtml] = useState("");

  const convert = async () => {
    if (!html) return alert("Enter HTML content");

    try {
      const res = await axios.post(
        "http://localhost:5000/html-to-pdf",
        { html },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "page.pdf";
      a.click();
    } catch {
      alert("Conversion failed");
    }
  };

  return (
    <div className="tool-page">
      <h1>HTML to PDF</h1>
      <textarea
        rows="10"
        placeholder="<h1>Hello</h1>"
        onChange={e => setHtml(e.target.value)}
      />
      <button onClick={convert}>Convert</button>
    </div>
  );
}
