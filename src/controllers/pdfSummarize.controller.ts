import { Request, Response, NextFunction } from "express";
import { summarizeTextWithGPT } from "../services/gpt.service";
import AttachmentModel from '../models/attachment';

export const summarizePDF = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const attachment = await AttachmentModel.findById(id);

    if (!attachment || !attachment.extractedData?.text) {
      res.status(400).json({ message: "PDF text data not found." });
      return;
    }

    const summary = await summarizeTextWithGPT(attachment.extractedData?.text);

    res.status(200).json({ summary });
  } catch (error) {
    next(error);
    console.error("Error processing PDF text extraction", error);
    res.status(500).json({ message: "Server issue" });
  }
};