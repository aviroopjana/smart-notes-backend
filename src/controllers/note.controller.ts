import { Request, Response, NextFunction } from 'express';
import NoteModel from '../models/note';
import { Note } from '../types/models';
import { handleError, handleSuccess } from '../utils/responseUtils';

// Get a note by ID
export const getNoteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const note = await NoteModel.findById(id).lean();
    if (!note) {
      handleError(res, 'Note not found', 404);
      return;
    }

    handleSuccess(res, note);
  } catch (error) {
    next(error);
  }
};

// Create a new note
export const createNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, title, content, tags, category, createdBy, attachments, version }: Note = req.body;

    if (!id || !title || !content || !tags || !category || !createdBy) {
      handleError(res, 'Missing required fields', 400);
      return;
    }

    const newNote = new NoteModel({
      id,
      title,
      content,
      tags,
      category,
      createdBy,
      attachments: attachments || [],
      version: version || 0,
    });

    const savedNote = await newNote.save();
    handleSuccess(res, savedNote, 201);
  } catch (error) {
    next(error);
  }
};

// Update an existing note
export const updateNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const updatedNote = await NoteModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).lean();
    if (!updatedNote) {
      handleError(res, 'Note not found', 404);
      return;
    }

    handleSuccess(res, updatedNote);
  } catch (error) {
    next(error);
  }
};

// Delete a note
export const deleteNote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedNote = await NoteModel.findByIdAndDelete(id).lean();
    if (!deletedNote) {
      handleError(res, 'Note not found', 404);
      return;
    }

    handleSuccess(res, { message: 'Note deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Get all notes
export const getAllNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const notes = await NoteModel.find().lean();
    handleSuccess(res, notes);
  } catch (error) {
    next(error);
  }
};

// Search notes
export const searchNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const query = req.query.query as string;

    if (!query) {
      handleError(res, 'Query parameter is required', 400);
      return;
    }

    const notes = await NoteModel.find({ $text: { $search: query } }).lean();
    handleSuccess(res, notes);
  } catch (error) {
    next(error);
  }
};
