import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { teachers } from "../data/teachers.js";

export default function Teachers() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("All");
  const [onlineOnly, setOnlineOnly] = useState(false);

  const subjects = ["All", ...new Set(teachers.map((t) => t.subject))];
  const filtered = teachers.filter(
    (t) => (subject === "All" || t.subject === subject) && (!onlineOnly || t.online)
  );

  return (
    <div>
      <h2>Teachers</h2>

      <div className="filters">
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          {subjects.map((s) => <option key={s}>{s}</option>)}
        </select>
        <label className="check">
          <input type="checkbox" checked={onlineOnly} onChange={(e) => setOnlineOnly(e.target.checked)} />
          Online only
        </label>
      </div>

      <div className="grid-3">
        {filtered.map((t) => (
          <div key={t.id} className="card teacher">
            <div className="avatar">{t.name[0]}</div>
            <h3>{t.name}</h3>
            <p className="muted">{t.subject}</p>
            <p>{t.bio}</p>
            <p><strong>★ {t.rating}</strong> · ${t.rate}/session</p>
            <p className={t.online ? "status on" : "status off"}>{t.online ? "Online" : "Offline"}</p>
            <button className="btn" onClick={() => navigate(`/workspace?teacher=${t.id}`)}>
              Request help
            </button>
          </div>
        ))}
        {filtered.length === 0 && <p className="muted">No teachers match your filters.</p>}
      </div>
    </div>
  );
}