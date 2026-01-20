import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
//import "pdfjs-dist/build/pdf.worker.entry";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


export default function PdfViewer({ file, onCrop }) {
  const canvasRef = useRef();
  const overlayRef = useRef();

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const pdf = await pdfjsLib.getDocument({ data: reader.result }).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  // Drag crop box
  let startX, startY, isDown = false;

  const onMouseDown = e => {
    isDown = true;
    startX = e.nativeEvent.offsetX;
    startY = e.nativeEvent.offsetY;
  };

  const onMouseMove = e => {
    if (!isDown) return;
    const overlay = overlayRef.current;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    overlay.style.left = Math.min(x, startX) + "px";
    overlay.style.top = Math.min(y, startY) + "px";
    overlay.style.width = Math.abs(x - startX) + "px";
    overlay.style.height = Math.abs(y - startY) + "px";
  };

  const onMouseUp = () => {
    isDown = false;
    const box = overlayRef.current.getBoundingClientRect();
    onCrop(box);
  };

  return (
    <div style={{ position: "relative" }}>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      />
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          border: "2px dashed red",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
