import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ActionSelector from "../components/ActionSelector.jsx";
import { useApp } from "../context/AppContext.jsx";
import { teachers } from "../data/teachers.js";
import { submitRequest } from "../services/api.js";

export default function Workspace() {
  const { notes, addHistory } = useApp();
  const [params] = useSearchParams();

  const [noteId, setNoteId] = useState(params.get("note") || "");
  const [teacherId, setTeacherId] = useState(params.get("teacher") || "");
  const [action, setAction] = useState(params.get("teacher") ? "teacher" : "explain");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");

    const note = notes.find((n) => n.id === noteId);
    const teacher = teachers.find((t) => t.id === teacherId);

    if (!note) return setError("Please select a note first.");
    if (!message.trim()) return setError("Type a question or topic.");
    if (action === "teacher" && !teacher) return setError("Choose a teacher.");

    const userMsg = { id: crypto.randomUUID(), role: "user", text: message, action };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const result = await submitRequest({ action, note, message: userMsg.text, teacher });
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", ...result }]);
      addHistory({
        id: crypto.randomUUID(),
        action,
        message: userMsg.text,
        noteName: note.name,
        teacherName: teacher?.name || null,
        createdAt: new Date().toISOString(),
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Workspace</h2>

      <div className="card">
        <label className="field">
          <span>1. Choose a note</span>
          <select value={noteId} onChange={(e) => setNoteId(e.target.value)}>
            <option value="">Select a note…</option>
            {notes.map((n) => (
              <option key={n.id} value={n.id}>{n.name}</option>
            ))}
          </select>
        </label>

        <span className="label">2. Choose how you want help</span>
        <ActionSelector value={action} onChange={setAction} />

        {action === "teacher" && (
          <label className="field">
            <span>Teacher</span>
            <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
              <option value="">Select a teacher…</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.subject}) {t.online ? "· online" : "· offline"}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="card chat">
        {messages.length === 0 && <p className="muted">Your conversation will appear here.</p>}

        {messages.map((m) => (
          <div key={m.id} className={`bubble ${m.role}`}>
            {m.role === "user" ? (
              <p>{m.text}</p>
            ) : (
              <>
                <span className={`tag ${m.action}`}>{m.action}</span>
                <p>{m.content}</p>
                {m.questions && (
                  <ul>{m.questions.map((q) => <li key={q}>{q}</li>)}</ul>
                )}
                {m.sources && (
                  <p className="muted">Sources: {m.sources.join(" · ")}</p>
                )}
              </>
            )}
          </div>
        ))}

        {loading && <div className="bubble assistant"><p className="muted">Thinking…</p></div>}
      </div>

      <form className="composer" onSubmit={handleSend}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question or enter a topic…"
        />
        <button className="btn" disabled={loading}>Send</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}