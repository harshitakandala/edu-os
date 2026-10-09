import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/notes", label: "My Notes" },
  { to: "/workspace", label: "Workspace" },
  { to: "/teachers", label: "Teachers" },
  { to: "/history", label: "History" },
];

export default function Layout() {
  return (
    <div className="shell">
      <aside className="sidebar">
        <h1 className="logo">Edu<span>OS</span></h1>
        <nav>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <p className="sidebar-foot">Learn with AI or a real teacher.</p>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}