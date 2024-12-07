import path from 'path';
import fs from 'fs';
import { env } from '../config/environment';

export const uploadFileToStorage = async (file: Express.Multer.File): Promise<string> => {
  const filePath = path.join(env.FILE_STORAGE_PATH, file.filename);

  // Check if directory exists
  if (!fs.existsSync(env.FILE_STORAGE_PATH)) {
    fs.mkdirSync(env.FILE_STORAGE_PATH);
  }

  // Mock file save (for simplicity)
  fs.writeFileSync(filePath, file.buffer);
  
  return filePath; 
};
