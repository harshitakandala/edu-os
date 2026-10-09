import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext(null);

const load = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

export function AppProvider({ children }) {
  const [notes, setNotes] = useState(() => load("eduos_notes", []));
  const [history, setHistory] = useState(() => load("eduos_history", []));

  useEffect(() => {
    localStorage.setItem("eduos_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("eduos_history", JSON.stringify(history));
  }, [history]);

  const addNote = (note) => setNotes((prev) => [note, ...prev]);
  const removeNote = (id) => setNotes((prev) => prev.filter((n) => n.id !== id));
  const addHistory = (entry) => setHistory((prev) => [entry, ...prev]);
  const clearHistory = () => setHistory([]);

  return (
    <AppContext.Provider
      value={{ notes, addNote, removeNote, history, addHistory, clearHistory }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);