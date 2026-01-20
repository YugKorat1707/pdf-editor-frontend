import { useRef, useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import { PDFDocument, rgb } from "pdf-lib";
import { Helmet } from "react-helmet";



pdfjsLib.GlobalWorkerOptions.workerSrc =
  window.location.origin + "/pdf.worker.js";

export default function EditTextPdf() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const [file, setFile] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [boxes, setBoxes] = useState([]);
  const [addTextMode, setAddTextMode] = useState(false);

  /* ---------- LOAD PDF ---------- */
  useEffect(() => {
    if (!file) return;

    const load = async () => {
      const url = URL.createObjectURL(file);
      const loadedPdf = await pdfjsLib.getDocument(url).promise;
      setPdf(loadedPdf);
      renderPage(loadedPdf, 1);
    };

    load();
  }, [file]);

  /* ---------- RENDER PAGE ---------- */
  const renderPage = async (pdfDoc, num) => {
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;
  };

  /* ---------- PAGE CHANGE ---------- */
  const changePage = (dir) => {
    if (!pdf) return;
    const newPage = pageNum + dir;
    if (newPage < 1 || newPage > pdf.numPages) return;
    setPageNum(newPage);
    renderPage(pdf, newPage);
    setBoxes([]);
  };

  /* ---------- ADD TEXT ---------- */
  const handleClick = (e) => {
    if (!addTextMode) return;

    const rect = containerRef.current.getBoundingClientRect();
    setBoxes([
      ...boxes,
      {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        text: "",
        size: 16,
      },
    ]);
  };

  /* ---------- SAVE PDF ---------- */
  const savePdf = async () => {
    const bytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(bytes);
    const page = pdfDoc.getPages()[pageNum - 1];

    boxes.forEach((b) => {
      page.drawRectangle({
        x: b.x,
        y: page.getHeight() - b.y,
        width: b.text.length * b.size * 0.6,
        height: b.size + 4,
        color: rgb(1, 1, 1),
      });

      page.drawText(b.text, {
        x: b.x,
        y: page.getHeight() - b.y,
        size: b.size,
        color: rgb(0, 0, 0),
      });
    });

    const out = await pdfDoc.save();
    const blob = new Blob([out], { type: "application/pdf" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "edited.pdf";
    a.click();
  };


  return (
    
    
    <div className="p-4">
      <>
        <Helmet>
  <title>Edit PDF Text Online – Free PDF Editor</title>
  <meta
    name="description"
    content="Edit PDF text online. Add, remove and modify PDF text easily."
  />
</Helmet>
      </>
      <h2 className="text-xl font-bold mb-2">Edit PDF Text</h2>

      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />

      <div className="my-3 flex gap-2">
        <button onClick={() => setAddTextMode(!addTextMode)} className="bg-blue-600 text-white px-3 py-1">
          {addTextMode ? "Click on PDF" : "Add Text"}
        </button>

        <button onClick={() => changePage(-1)}>⬅ Prev</button>
        <span>Page {pageNum}</span>
        <button onClick={() => changePage(1)}>Next ➡</button>

        <button onClick={savePdf} className="bg-green-600 text-white px-3 py-1">
          Save & Download
        </button>
      </div>

      <div
        ref={containerRef}
        onClick={handleClick}
        className="relative border inline-block"
      >
        <canvas ref={canvasRef} />

        {boxes.map((b) => (
          <textarea
            key={b.id}
            value={b.text}
            onChange={(e) =>
              setBoxes(
                boxes.map((x) =>
                  x.id === b.id ? { ...x, text: e.target.value } : x
                )
              )
            }
            style={{
              position: "absolute",
              left: b.x,
              top: b.y,
              fontSize: b.size,
              border: "1px dashed blue",
              background: "transparent",
              resize: "both",
            }}
          />
        ))}
      </div>
    </div>
  );
}
