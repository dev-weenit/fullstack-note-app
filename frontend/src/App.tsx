import { useEffect, useState } from "react";
import "./App.css";
import { getAllNotes } from "./apis/notes.api";

import ErrorBanner from "./components/ErrorBanner";
import NoteCard from "./components/NoteCard";
import PageHeader from "./components/PageHeader";
import { type Note } from "./types/note.type";

function App() {
  const [error, setError] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getAllNotes()
      .then((notes) => setNotes(notes))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <>
      <PageHeader />
      <ErrorBanner error={error} />
      {notes.map((note: Note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </>
  );
}

export default App;
