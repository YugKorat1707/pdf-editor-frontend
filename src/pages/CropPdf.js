import { useState } from "react";
import axios from "axios";
import PdfViewer from "../components/PdfViewer";

export default function CropPdf() {
  const [file, setFile] = useState(null);
  const [cropBox, setCropBox] = useState(null);

  const crop = async () => {
    const form = new FormData();
    form.append("pdf", file);
    form.append("x", cropBox.x);
    form.append("y", cropBox.y);
    form.append("width", cropBox.width);
    form.append("height", cropBox.height);

    const res = await axios.post(
      "http://localhost:5000/crop-pdf",
      form,
      { responseType: "blob" }
    );

    download(res.data, "cropped.pdf");
  };

  return (
    <>
      <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} />
      {file && <PdfViewer file={file} onCrop={setCropBox} />}
      {cropBox && <button onClick={crop}>Crop PDF</button>}
    </>
  );
}

function download(blob, name) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}
