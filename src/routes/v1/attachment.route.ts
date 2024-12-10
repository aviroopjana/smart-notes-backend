import { Router } from 'express';
import { deleteAttachment, getAttachmentById, uploadAttachment } from '../../controllers/attachment.controller';
import { multerMiddleware } from '../../middlewares/multer.middleware';

const router = Router();

// CRUD Routes
router.post('/', multerMiddleware , uploadAttachment);
router.get('/:id', getAttachmentById);
router.delete('/:id', deleteAttachment);  

export default router;
