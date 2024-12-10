import express from 'express';
import { createNote, deleteNote, getAllNotes, getNoteById, searchNotes, updateNote } from '../../controllers/note.controller';

const router = express.Router();

// Search Route
router.get('/search', searchNotes);

// CRUD Routes
router.post('/', createNote);
router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
 

export default router;