import express from "express";
import { parseReceipt } from "../controllers/ocr.controller";
import { aiRateLimiter } from "../middlewares/rateLimiter.middleware";

const router = express.Router();

router.post("/parse-receipt", aiRateLimiter, parseReceipt);

export default router;