import { NextFunction, Request, Response } from "express";
import { performOCR } from "../services/ocr.service";
import { parseReceiptData } from "../services/parseReceipt.service";

export const parseReceipt = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { imagePath } = req.body;

    if (!imagePath) {
      res.status(400).json({ message: "No image path provided." });
      return;
    }

    const extractedText = await performOCR(imagePath);
    const parsedData = await parseReceiptData(extractedText);

    res.status(200).json({ extractedText, parsedData });
  } catch (error) {
    next(error);
    console.error("Error processing receipt parsing:", error);
    res.status(500).json({ message: "Server issue" });
  }
};
