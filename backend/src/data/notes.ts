import { Note } from "../types/notes.types";

let notes: Note[] = [
  {
    id: "1",
    title: "This is a note",
    content: "Content of the note",
  },
];

function addNote(note: Note) {
  notes.push(note);
}

function getAllNotes(): Note[] {
  return notes;
}

function generateNewId(): string {
  const notesList = getAllNotes();

  if (!notesList.length) return "1";

  const validIds = notesList
    .map((note) => Number(note.id))
    .filter((id) => Number.isFinite(id) && id > 0);

  if (!validIds.length) return "1";

  const maxId = Math.max(...validIds);

  return String(maxId + 1);
}

function deleteNote(id: string) {
  notes = notes.filter((note) => note.id !== id);
}

function patchNote(id: string, updatedNote: Partial<Note>) {
  notes = notes.map((note) =>
    note.id === id
      ? {
          title: updatedNote.title ?? note.title,
          content: updatedNote.content ?? note.content,
          id: note.id,
        }
      : note
  );
}

function hasNote(id: string): boolean {
  return notes.some((note) => note.id === id);
}

export { addNote, deleteNote, generateNewId, getAllNotes, hasNote, patchNote };
