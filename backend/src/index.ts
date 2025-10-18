import cors from "cors";
import express from "express";
import config from "./config";
import { errorHandler } from "./middleware/error.middleware";
import noteRoutes from "./routes/note.routes";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/notes", noteRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
