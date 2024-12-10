import express from "express";
import { parseReceipt } from "../controllers/ocr.controller";

const router = express.Router();

router.post("/parse-receipt", parseReceipt);

export default router;