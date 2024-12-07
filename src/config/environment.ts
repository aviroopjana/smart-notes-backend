import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  FILE_STORAGE_PATH: process.env.FILE_STORAGE_PATH || './uploads'
};
