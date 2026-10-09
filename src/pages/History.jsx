import { useState } from "react";
import { useApp } from "../context/AppContext.jsx";

export default function History() {
  const { history, clearHistory } = useApp();
  const [filter, setFilter] = useState("all");

  const items = history.filter((h) => filter === "all" || h.action === filter);

  return (
    <div>
      <div className="page-head">
        <h2>Learning History</h2>
        {history.length > 0 && (
          <button className="btn small danger" onClick={clearHistory}>Clear all</button>
        )}
      </div>

      <div className="filters">
        {["all", "explain", "rag", "practice", "teacher"].map((f) => (
          <button
            key={f}
            className={filter === f ? "chip active" : "chip"}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="card">
        {items.length === 0 && <p className="muted">No activity to show.</p>}
        <ul className="list rows">
          {items.map((h) => (
            <li key={h.id}>
              <div>
                <span className={`tag ${h.action}`}>{h.action}</span>
                <strong> {h.message}</strong>
                <p className="muted">
                  {h.noteName}{h.teacherName ? ` · ${h.teacherName}` : ""} · {new Date(h.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}