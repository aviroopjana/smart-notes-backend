import { Request, Response, NextFunction } from 'express';
import NoteModel from '../models/note';
import { Note } from '../types/models';

type NoteRequestBody = {
  title: string;
  content: string;
  tags: string[];
  category: string;
  createdBy: string;
  attachments?: string[];
};

// Get a note by ID
export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const note = await NoteModel.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).json(note);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: 'Error fetching note', error });
  }
};

// Update a note
export const updateNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await NoteModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).json(note);
  } catch (error) {
    return res.status(400).json({ message: 'Error updating note', error });
  }
};

// Delete a note
export const deleteNote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = await NoteModel.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting note', error });
  }
};

// // Create a note
// export const createNote = async (req: Request, res: Response) => {
//   // try {
//   //   const note = new NoteModel(req.body);
//   //   await note.save();
//   //   return res.status(201).json(note);
//   // } catch (error) {
//   //   return res.status(400).json({ message: 'Error creating note', error });
//   // }
// };

// Create a note
export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Extract the body with proper typing
    const { title, content, tags, category, createdBy, attachments }: NoteRequestBody = req.body;

    // Ensure the required fields are present
    if (!title || !content || !tags || !category || !createdBy) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new note instance
    const note = new NoteModel({
      title,
      content,
      tags,
      category,
      createdBy,
      attachments,
    });

    // Save the note to the database
    const savedNote = await note.save();

    // Return the saved note
    return res.status(201).json(savedNote);
  } catch (error) {
    // Handle errors
    next(error);
    return res.status(400).json({ message: 'Error creating note', error });
  }
};


// Get all notes
export const getAllNotes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const notes = await NoteModel.find();
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching notes', error });
  }
};

// Search notes
export const searchNotes = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { query } = req.query;
    const notes = await NoteModel.find({ $text: { $search: query as string } });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: 'Error searching notes', error });
  }
};