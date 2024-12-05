import { Router } from 'express';
import { deleteAttachment, getAttachmentById, uploadAttachment } from '../controllers/attachment.controller';

const router = Router();

// CRUD Routes
router.post('/', uploadAttachment);
router.get('/:id', getAttachmentById);
router.delete('/:id', deleteAttachment);

export default router;
