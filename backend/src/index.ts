import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import { addNote, generateNewId, getAllNotes } from "./data/notes";
import { errorHandler } from "./middleware/error_handler";
import { NotesPayload } from "./types/notes_payload";

const app = express();
app.use(express.json());

app.get("/api/notes", (_req, res, next) => {
  try {
    res.json(getAllNotes());
  } catch (error) {
    return next(error);
  }
});

app.post(
  "/api/note",
  (
    req: Request<Record<string, never>, Record<string, never>, NotesPayload>,
    res: Response,
    next: NextFunction
  ) => {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Missing title or content" });
    }

    const id = generateNewId();
    try {
      addNote({
        id,
        title,
        content,
      });
    } catch (error) {
      return next(error);
    }

    return res.status(201).json({ id });
  }
);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
