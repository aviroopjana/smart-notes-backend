import express from "express";
import { summarizePDF } from "../controllers/pdfSummarize.controller";

const router = express.Router();

router.post("/summarize-pdf/:id", summarizePDF);

export default router;
