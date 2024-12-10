import express from "express";
import { parseReceipt } from "../../controllers/ocr.controller";
import { summarizePDF } from "../../controllers/pdfSummarize.controller";

const router = express.Router();

router.post("/parse-receipt", parseReceipt);

router.post("/summarize-pdf/:id", summarizePDF);

export default router;