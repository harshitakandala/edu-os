import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { teachers } from "../data/teachers.js";

export default function Dashboard() {
  const { notes, history } = useApp();
  const online = teachers.filter((t) => t.online).length;

  return (
    <div>
      <h2>Welcome back</h2>
      <p className="muted">Upload notes, then learn with AI or a real teacher.</p>

      <div className="stats">
        <div className="card stat"><h3>{notes.length}</h3><p>Notes uploaded</p></div>
        <div className="card stat"><h3>{history.length}</h3><p>Requests made</p></div>
        <div className="card stat"><h3>{online}</h3><p>Teachers online</p></div>
      </div>

      <div className="grid-2">
        <section className="card">
          <h3>Recent notes</h3>
          {notes.length === 0 && <p className="muted">No notes yet.</p>}
          <ul className="list">
            {notes.slice(0, 5).map((n) => (
              <li key={n.id}>{n.name}</li>
            ))}
          </ul>
          <Link className="btn" to="/notes">Manage notes</Link>
        </section>

        <section className="card">
          <h3>Recent activity</h3>
          {history.length === 0 && <p className="muted">Nothing here yet.</p>}
          <ul className="list">
            {history.slice(0, 5).map((h) => (
              <li key={h.id}>
                <span className={`tag ${h.action}`}>{h.action}</span> {h.message}
              </li>
            ))}
          </ul>
          <Link className="btn" to="/workspace">Open workspace</Link>
        </section>
      </div>
    </div>
  );
}