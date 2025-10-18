import axios from "axios";
import { type Note } from "../types/note.type";

// TODO: replace with vite config
const API_URL = "http://localhost:3000";

async function getAllNotes(): Promise<Note[]> {
  const response = axios.get(`${API_URL}/api/notes`);

  return response
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export { getAllNotes };
