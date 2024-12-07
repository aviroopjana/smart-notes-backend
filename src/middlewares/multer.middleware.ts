import multer from 'multer';

export const multerMiddleware = multer({
  storage: multer.memoryStorage(), // File will be buffered in memory
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // No error, accept the file
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname) as unknown as null, false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size: 5MB
  },
}).single('file');
