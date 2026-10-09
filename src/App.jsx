import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Notes from "./pages/Notes.jsx";
import Workspace from "./pages/Workspace.jsx";
import Teachers from "./pages/Teachers.jsx";
import History from "./pages/History.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}