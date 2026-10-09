const actions = [
  { id: "explain", title: "Explain", desc: "Get a clear AI explanation" },
  { id: "rag", title: "Ask my notes", desc: "AI answers using your notes only" },
  { id: "practice", title: "Practice", desc: "Generate questions to test yourself" },
  { id: "teacher", title: "Ask a teacher", desc: "Send to a real teacher" },
];

export default function ActionSelector({ value, onChange }) {
  return (
    <div className="actions">
      {actions.map((a) => (
        <button
          key={a.id}
          type="button"
          className={value === a.id ? "action-card selected" : "action-card"}
          onClick={() => onChange(a.id)}
        >
          <strong>{a.title}</strong>
          <span>{a.desc}</span>
        </button>
      ))}
    </div>
  );
}