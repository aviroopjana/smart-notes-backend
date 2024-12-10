import express from "express";
import { summarizePDF } from "../controllers/pdfSummarize.controller";
import { aiRateLimiter } from "../middlewares/rateLimiter.middleware";

const router = express.Router();

router.post("/summarize-pdf/:id", aiRateLimiter, summarizePDF);

export default router;
