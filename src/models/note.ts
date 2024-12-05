import { Schema, model } from 'mongoose';
import { Note } from '../types/models';

const noteSchema = new Schema<Note>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], required: true },
  category: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
  attachments: { type: [String], required: true },
  version: { type: Number, required: true }
});

const NoteModel = model<Note>('Note', noteSchema);

export default NoteModel;