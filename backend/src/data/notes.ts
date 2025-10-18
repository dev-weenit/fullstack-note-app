import { Note } from "../types/notes.types";

const notes: Note[] = [
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

export { addNote, generateNewId, getAllNotes };
