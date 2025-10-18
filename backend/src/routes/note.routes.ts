import { NextFunction, Request, Response, Router } from "express";
import {
  addNote,
  deleteNote,
  generateNewId,
  getAllNotes,
  hasNote,
  patchNote,
} from "../data/notes";
import { NotesPayload } from "../types/notes_payload.types";

const router = Router();

router.get("/", (_req, res, next) => {
  try {
    res.json(getAllNotes());
  } catch (error) {
    return next(error);
  }
});

router.post(
  "/",
  (
    req: Request<Record<string, never>, Record<string, never>, NotesPayload>,
    res: Response,
    next: NextFunction
  ) => {
    const { title, content } = req.body;

    if (!title?.trim() || !content?.trim()) {
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

router.delete(
  "/:id",
  (
    req: Request<{ id: string }, Record<string, never>, Record<string, never>>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    try {
      if (typeof id === "string" && id) {
        if (!hasNote(id)) {
          return res.status(404).json({ error: "Note not found" });
        }
        deleteNote(id);
        return res.sendStatus(204);
      } else {
        return res.status(400).json({ error: "Invalid id" });
      }
    } catch (error) {
      return next(error);
    }
  }
);

router.patch(
  "/:id",
  (
    req: Request<{ id: string }, Record<string, never>, Partial<NotesPayload>>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    try {
      if (typeof id === "string" && id) {
        if (!hasNote(id)) {
          return res.status(404).json({ error: "Note not found" });
        }
        const { title, content } = req.body;
        if (!title?.trim() && !content?.trim()) {
          return res.status(400).json({ error: "Nothing to update" });
        }

        patchNote(id, { title, content });

        return res.sendStatus(204);
      } else {
        return res.status(400).json({ error: "Invalid id" });
      }
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
