import { Request, Response } from 'express';
import AttachmentModel from '../models/attachment';

// Upload a new attachment
export const uploadAttachment = async (req: Request, res: Response) => {
  try {
    const attachment = await AttachmentModel.create(req.body);
    res.status(201).json(attachment);
  } catch (error) {
    res.status(400).json({ message: 'Error uploading attachment', error });
  }
};

// Get an attachment by ID
export const getAttachmentById = async (req: Request, res: Response) => {
  try {
    const attachment = await AttachmentModel.findById(req.params.id);
    if (!attachment) {
      return res.status(404).json({ message: 'Attachment not found' });
    }
    res.status(200).json(attachment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attachment', error });
  }
};

// Delete an attachment
export const deleteAttachment = async (req: Request, res: Response) => {
  try {
    const attachment = await AttachmentModel.findByIdAndDelete(req.params.id);
    if (!attachment) {
      return res.status(404).json({ message: 'Attachment not found' });
    }
    res.status(200).json({ message: 'Attachment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attachment', error });
  }
};

