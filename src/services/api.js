const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Phase 1: fake responses. Later this calls the backend.
export async function submitRequest({ action, note, message, teacher }) {
  await delay(1000);

  switch (action) {
    case "explain":
      return {
        action,
        content: `(Mock LLM) Here's a simple explanation of "${message}" based on "${note.name}". In Phase 3 this will come from Gemini.`,
      };

    case "rag":
      return {
        action,
        content: `(Mock RAG) I searched "${note.name}" for "${message}" and found 2 relevant passages. Real retrieval comes in Phase 5.`,
        sources: ["Page 1, paragraph 3", "Page 4, paragraph 1"],
      };

    case "practice":
      return {
        action,
        content: `(Mock) Practice questions generated from "${note.name}":`,
        questions: [
          "Q1. Define the core concept discussed in your notes.",
          "Q2. Give one real-world example of it.",
          "Q3. What common mistakes do students make here?",
        ],
      };

    case "teacher":
      return {
        action,
        content: `Your request was sent to ${teacher?.name}. They will respond within 24 hours.`,
        status: "pending",
      };

    default:
      throw new Error("Unknown action");
  }
}