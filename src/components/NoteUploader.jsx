import { useRef, useState } from "react";
import { useApp } from "../context/AppContext.jsx";

const MAX_MB = 5;

export default function NoteUploader() {
  const { addNote } = useApp();
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = (files) => {
    setError("");
    Array.from(files).forEach((file) => {
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`${file.name} is larger than ${MAX_MB}MB.`);
        return;
      }
      const isText = file.type.startsWith("text/") || file.name.endsWith(".md");
      const base = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        uploadedAt: new Date().toISOString(),
      };

      if (isText) {
        const reader = new FileReader();
        reader.onload = () => addNote({ ...base, content: reader.result });
        reader.readAsText(file);
      } else {
        // PDFs etc: the backend will parse these in Phase 2
        addNote({ ...base, content: "" });
      }
    });
  };

  return (
    <div
      className={dragging ? "dropzone dragging" : "dropzone"}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current.click()}
    >
      <p><strong>Drag and drop your notes here</strong></p>
      <p className="muted">or click to browse (.txt, .md, .pdf, max {MAX_MB}MB)</p>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".txt,.md,.pdf"
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}