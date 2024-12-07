import { Schema, model, Document } from 'mongoose';

export interface IAttachment extends Document {
  fileName: string;
  fileType: string;
  fileSize: number;
  path: string;
  versionNumber: number;
  extractedData?: any;
  uploadedAt: Date;
}

const AttachmentSchema = new Schema<IAttachment>({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  path: { type: String, required: true },
  versionNumber: { type: Number, default: 1 },
  extractedData: { type: Schema.Types.Mixed },
  uploadedAt: { type: Date, default: Date.now },
});

export default model<IAttachment>('Attachment', AttachmentSchema);
