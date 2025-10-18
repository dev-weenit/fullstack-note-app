import { NextFunction, Request, Response, Router } from "express";
import { addNote, generateNewId, getAllNotes } from "../data/notes";
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

export default router;
