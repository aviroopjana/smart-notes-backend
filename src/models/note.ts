import mongoose, { Schema, Document } from 'mongoose';

const NoteSchema: Schema = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], index: true },
  category: { type: String, required: true },
  createdBy: { type: String, required: true, index: true },
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attachment' }],
  version: { type: Number, default: 0 },
}, {
  timestamps: true,
});

// Add a compound index (for advanced search)
NoteSchema.index({ createdBy: 1, category: 1 });

// Add a text index for full-text search on title and content
NoteSchema.index({ title: 'text', content: 'text' });

export default mongoose.model<Document>('Note', NoteSchema);
