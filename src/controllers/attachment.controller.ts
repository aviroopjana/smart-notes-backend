import { Request, Response, NextFunction } from 'express';
import AttachmentModel from '../models/attachment';
import { handleError, handleSuccess } from '../utils/responseUtils';

// Upload a new attachment
export const uploadAttachment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileName, fileType, fileSize, path } = req.body;

    if (!fileName || !fileType || !fileSize || !path) {
      return handleError(res, 'Missing required fields', 400);
    }

    const attachment = await AttachmentModel.create(req.body);
    return handleSuccess(res, attachment, 201);
  } catch (error) {
    return next(error);
  }
};

// Get an attachment by ID
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

// Delete an attachment
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
