import { Request, Response, NextFunction } from "express";
import NoteModel from "../models/note";
import { Note } from "../types/models";
import { handleError, handleSuccess } from "../utils/responseUtils";
import { Logger } from "../utils/logger";
import { validateQuery } from "../utils/validation";
import { SearchError } from "../errors/searchErrors";

// Get a note by ID
export const getNoteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const note = await NoteModel.findOne({ id }).lean();
    if (!note) {
      handleError(res, "Note not found", 404);
      return;
    }

    handleSuccess(res, note);
  } catch (error) {
    next(error);
  }
};

// Create a new note
export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      id,
      title,
      content,
      tags,
      category,
      createdBy,
      attachments,
      version,
    }: Note = req.body;

    if (!id || !title || !content || !tags || !category || !createdBy) {
      handleError(res, "Missing required fields", 400);
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
export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const updatedNote = await NoteModel.findOneAndUpdate({ id }, req.body, {
      new: true,
      runValidators: true,
    }).lean();
    if (!updatedNote) {
      handleError(res, "Note not found", 404);
      return;
    }

    handleSuccess(res, updatedNote);
  } catch (error) {
    next(error);
  }
};

// Delete a note
export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedNote = await NoteModel.findOneAndDelete({ id }).lean();
    if (!deletedNote) {
      handleError(res, "Note not found", 404);
      return;
    }

    handleSuccess(res, { message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Get all notes
export const getAllNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    const notes = await NoteModel.find().skip(skip).limit(limit).lean();

    const totalNotes = await NoteModel.countDocuments();

    res.status(200).json({
      success: true,
      data: notes,
      pagination: {
        totalNotes,
        currentPage: page,
        totalPages: Math.ceil(totalNotes / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Search notes
export const searchNotes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const query = req.query.query as string;
  const page = parseInt(req.query.page as string) || 1; 
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    // Validate query
    if (!query || query.trim().length === 0) {
      throw new SearchError('Query parameter is required and cannot be empty', 400);
    }

    if (!validateQuery(query)) { 
      throw new SearchError('Invalid query parameter format', 400);
    }

    // Log the query search
    Logger.info(`Search initiated with query: ${query}, page: ${page}, limit: ${limit}`);

    // Perform a text search on title and content
    const notes = await NoteModel.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } } 
    )
      .sort({ score: { $meta: 'textScore' } })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Check if notes are found
    if (notes.length === 0) {
      Logger.warn(`No notes found for query: "${query}"`);
      handleError(res, 'No notes found', 404);
      return;
    }

    // Log the found notes count and return response
    Logger.info(`Found ${notes.length} notes for query: "${query}"`);
    handleSuccess(res, { data: notes, page, limit });
  } catch (error) {
    if (error instanceof SearchError) {
      Logger.error(`Search error: ${error.message}`);
      handleError(res, error.message, error.status);
    } else {
      Logger.error(`Unexpected error during search: ${(error as Error).message}`);
      next(error);
    }
  }
};
