import pdf from 'pdf-parse';
import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import { Logger } from '../utils/logger';
import { UnsupportedFileTypeError } from '../errors/unsupportedFileTypeError';

export const extractDataFromFile = async (file: Express.Multer.File): Promise<any> => {
  try {
    if (file.mimetype === 'application/pdf') {
      // Extract text from PDF
      const pdfData = await pdf(file.buffer);
      return { text: pdfData.text, numPages: pdfData.numpages };
    }

    if (file.mimetype.startsWith('image/')) {
      // Pre-process image (optional: sharp for resizing, format conversion, etc.)
      const processedBuffer = await sharp(file.buffer).png().toBuffer();

      // Perform OCR on image
      const ocrResult = await Tesseract.recognize(processedBuffer, 'eng', {
        logger: (info) => Logger.info(`OCR Progress: ${(info.progress * 100).toFixed(2)}%`),
      });

      return { text: ocrResult.data.text, confidence: ocrResult.data.confidence };
    }

    // Throw error for unsupported file types
    throw new UnsupportedFileTypeError(`File type ${file.mimetype} is not supported`);
  } catch (error) {
    Logger.error(`Error during data extraction: ${(error as Error).message}`);
    throw error;
  }
};
