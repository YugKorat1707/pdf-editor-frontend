import { useState } from "react";
import EditPdfMenu from "../components/EditPdfMenu";
import { Helmet } from "react-helmet";

export default function EditPdf() {
  const [activeTool, setActiveTool] = useState("rotate");
  const [file, setFile] = useState(null);

  const [watermarkText, setWatermarkText] = useState("SAMPLE");
  const [opacity, setOpacity] = useState(0.3);
  const [pagePos, setPagePos] = useState("bottom-right");

  const [rotateAll, setRotateAll] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [angle, setAngle] = useState(90);

  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(100);
  const [cropHeight, setCropHeight] = useState(100);
  const [cropAll, setCropAll] = useState(true);

  const [editText, setEditText] = useState("");

  const API = "https://api.pdfeditor.live";

  // ---------- DOWNLOAD HANDLER ----------
  const downloadResult = async (url, formData) => {
    const res = await fetch(url, { method: "POST", body: formData });
    const blob = await res.blob();
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
  };

  return (
    <>
      {/* ✅ SEO META TAGS */}
      <Helmet>
        <title>Edit PDF Online Free | Rotate, Crop, Watermark PDF</title>
        <meta
          name="description"
          content="Edit PDF online for free. Rotate PDF pages, crop PDF, add watermark, add page numbers, and edit text easily."
        />
        <meta
          name="keywords"
          content="edit pdf, rotate pdf, crop pdf, watermark pdf, pdf editor online"
        />
        <link rel="canonical" href="https://yourdomain.com/edit-pdf" />
      </Helmet>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* LEFT MENU */}
        <EditPdfMenu active={activeTool} setActive={setActiveTool} />

        {/* RIGHT PANEL */}
        <div className="flex-1 p-8 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6 capitalize">
            {activeTool.replace(/([A-Z])/g, " $1")}
          </h1>

          {/* FILE INPUT */}
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-6 block"
          />

          {/* ROTATE */}
          {activeTool === "rotate" && (
            <div className="space-y-4">
              <label>
                <input
                  type="checkbox"
                  checked={rotateAll}
                  onChange={(e) => setRotateAll(e.target.checked)}
                />{" "}
                Rotate Whole PDF
              </label>

              {!rotateAll && (
                <input
                  type="number"
                  min="1"
                  value={pageNumber}
                  onChange={(e) => setPageNumber(e.target.value)}
                  placeholder="Page Number"
                  className="border px-3 py-2 rounded"
                />
              )}

              <input
                type="number"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                placeholder="Angle"
                className="border px-3 py-2 rounded"
              />

              <button
                onClick={() => {
                  if (!file) return alert("Upload PDF");
                  const fd = new FormData();
                  fd.append("pdf", file);
                  fd.append("angle", angle);
                  fd.append("rotateAll", rotateAll);
                  if (!rotateAll) fd.append("pageNumber", pageNumber);
                  downloadResult(`${API}/rotate-pdf`, fd);
                }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg"
              >
                Rotate
              </button>
            </div>
          )}

          {/* WATERMARK */}
          {activeTool === "watermark" && (
            <div className="space-y-4">
              <input
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="Watermark text"
                className="border px-3 py-2 rounded w-full"
              />

              <label>
                Opacity: {opacity}
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={opacity}
                  onChange={(e) => setOpacity(e.target.value)}
                />
              </label>

              <button
                onClick={() => {
                  if (!file) return alert("Upload PDF");
                  const fd = new FormData();
                  fd.append("pdf", file);
                  fd.append("text", watermarkText);
                  fd.append("opacity", opacity);
                  downloadResult(`${API}/watermark`, fd);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                Apply Watermark
              </button>
            </div>
          )}

          {/* PAGE NUMBERS */}
          {activeTool === "pageNumbers" && (
            <div className="space-y-4">
              <select
                value={pagePos}
                onChange={(e) => setPagePos(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="bottom-right">Bottom Right</option>
                <option value="bottom-center">Bottom Center</option>
              </select>

              <button
                onClick={() => {
                  if (!file) return alert("Upload PDF");
                  const fd = new FormData();
                  fd.append("pdf", file);
                  fd.append("position", pagePos);
                  downloadResult(`${API}/page-numbers`, fd);
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg"
              >
                Add Page Numbers
              </button>
            </div>
          )}

          {/* CROP */}
          {activeTool === "crop" && (
            <div className="space-y-4">
              <p>✂️ Crop PDF (pixels)</p>

              <input type="number" placeholder="X" onChange={(e) => setCropX(+e.target.value)} />
              <input type="number" placeholder="Y" onChange={(e) => setCropY(+e.target.value)} />
              <input type="number" placeholder="Width" onChange={(e) => setCropWidth(+e.target.value)} />
              <input type="number" placeholder="Height" onChange={(e) => setCropHeight(+e.target.value)} />

              <label>
                <input
                  type="checkbox"
                  checked={cropAll}
                  onChange={(e) => setCropAll(e.target.checked)}
                />{" "}
                Crop All Pages
              </label>

              <button
                onClick={() => {
                  if (!file) return alert("Upload PDF");
                  const fd = new FormData();
                  fd.append("pdf", file);
                  fd.append("x", cropX);
                  fd.append("y", cropY);
                  fd.append("width", cropWidth);
                  fd.append("height", cropHeight);
                  fd.append("cropAll", cropAll);
                  downloadResult(`${API}/crop-pdf`, fd);
                }}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg"
              >
                Crop
              </button>
            </div>
          )}

          {/* EDIT TEXT */}
          {activeTool === "edit" && (
            <div className="space-y-4">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Enter text"
                className="border w-full h-24 p-2"
              />

              <button
                onClick={() => {
                  if (!file) return alert("Upload PDF");
                  const fd = new FormData();
                  fd.append("pdf", file);
                  fd.append(
                    "edits",
                    JSON.stringify([{ type: "text", page: 1, x: 50, y: 100, content: editText }])
                  );
                  downloadResult(`${API}/apply-advanced-edits`, fd);
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Apply Edits
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
