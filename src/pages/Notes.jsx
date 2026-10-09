import { Link } from "react-router-dom";
import NoteUploader from "../components/NoteUploader.jsx";
import { useApp } from "../context/AppContext.jsx";

const formatSize = (b) => (b < 1024 * 1024 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1024 / 1024).toFixed(1)} MB`);

export default function Notes() {
  const { notes, removeNote } = useApp();

  return (
    <div>
      <h2>My Notes</h2>
      <NoteUploader />

      <div className="card" style={{ marginTop: 20 }}>
        <h3>Uploaded ({notes.length})</h3>
        {notes.length === 0 && <p className="muted">Upload a file to get started.</p>}
        <ul className="list rows">
          {notes.map((n) => (
            <li key={n.id}>
              <div>
                <strong>{n.name}</strong>
                <p className="muted">
                  {formatSize(n.size)} · {new Date(n.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="row-actions">
                <Link className="btn small" to={`/workspace?note=${n.id}`}>Study</Link>
                <button className="btn small danger" onClick={() => removeNote(n.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}