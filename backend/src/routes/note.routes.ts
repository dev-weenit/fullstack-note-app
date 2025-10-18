import { Router } from "express";
import {
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  updateNoteHandler,
} from "../controller/notes.controller";

const router = Router();

router.get("/", getAllNotesHandler);

router.post("/", createNoteHandler);

router.delete("/:id", deleteNoteHandler);

router.patch("/:id", updateNoteHandler);

export default router;
