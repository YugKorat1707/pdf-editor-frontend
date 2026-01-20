export default function RotateTool() {
  const handleRotate = async () => {
    const file = document.getElementById("rotateFile").files[0];
    if (!file) return alert("Upload PDF");

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("angle", 90);

    const res = await fetch("http://localhost:5000/rotate-pdf", {
      method: "POST",
      body: formData
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <>
      <input id="rotateFile" type="file" accept="application/pdf" />
      <button onClick={handleRotate}>Rotate 90°</button>
    </>
  );
}
