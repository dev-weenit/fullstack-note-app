import { type Note } from "../types/note.type";

type NoteCardProps = {
  note: Note;
};
const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
};

export default NoteCard;
