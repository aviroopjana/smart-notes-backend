import { Request, Response, NextFunction } from 'express';
import AttachmentModel, { IAttachment } from '../models/attachment';
import { handleError, handleSuccess } from '../utils/responseUtils';
import { Logger } from '../utils/logger';
import { extractDataFromFile } from '../services/dataextraction.service';
import { uploadFileToStorage } from '../services/filestorage.service';

// Upload a new attachment
export const uploadAttachment = async (req: Request, res: Response, next: NextFunction) => {
  try {

    if (!req.file) {
      return handleError(res, 'No file uploaded', 400);
    }

    const { originalname, mimetype, size } = req.file;

    console.log('File details:', { originalname, mimetype, size }); // Log file details

    // Save file using the file storage service
    const filePath = await uploadFileToStorage(req.file);

    console.log('Generated filePath:', filePath);

    if (!filePath) {
      return handleError(res, 'Failed to save file', 500);
    }

    // Extract metadata or content from the file
    const extractedData = await extractDataFromFile(req.file);

    const existingFile = await AttachmentModel.findOne({ fileName: originalname });
    const versionNumber = existingFile ? existingFile.versionNumber + 1 : 1;

    const attachment: IAttachment = await AttachmentModel.create({
      fileName: originalname,
      fileType: mimetype,
      fileSize: size,
      path: filePath,
      versionNumber,
      extractedData,
    });

    Logger.info(`Attachment uploaded successfully: ${originalname} (Version: ${versionNumber})`);
    return handleSuccess(res, attachment, 201);
  } catch (error) {
    Logger.error(`Error uploading attachment: ${(error as Error).message}`);
    return next(error);
  }
};

// Fetch an attachment by ID
export const getAttachmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attachment = await AttachmentModel.findById(req.params.id);
    if (!attachment) {
      return handleError(res, 'Attachment not found', 404);
    }
    return handleSuccess(res, attachment);
  } catch (error) {
    return next(error);
  }
};

// Delete an attachment by ID
export const deleteAttachment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attachment = await AttachmentModel.findByIdAndDelete(req.params.id);
    if (!attachment) {
      return handleError(res, 'Attachment not found', 404);
    }
    return handleSuccess(res, { message: 'Attachment deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
