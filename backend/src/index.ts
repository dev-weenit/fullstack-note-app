
import express from "express";
import config from "./config";
import notes from "./data/notes";

const app = express();

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});
