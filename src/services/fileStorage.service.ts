import path from 'path';
import fs from 'fs';
import { env } from '../config/environment';

export const uploadFileToStorage = async (file: Express.Multer.File): Promise<string> => {
  const filePath = path.join(env.FILE_STORAGE_PATH, file.originalname);

  console.log('Directory Path:', env.FILE_STORAGE_PATH);
  console.log('Resolved File Path:', filePath);

  // Ensure directory exists
  if (!fs.existsSync(env.FILE_STORAGE_PATH)) {
    fs.mkdirSync(env.FILE_STORAGE_PATH, { recursive: true });
    console.log('Directory created successfully');
  }

  // Save the file
  fs.writeFileSync(filePath, file.buffer);

  return filePath;
};
