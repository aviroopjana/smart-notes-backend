import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import noteRoutes from './routes/note.route';
import attachmentRoutes from './routes/attachment.route';
import { crudRateLimiter } from './middlewares/rateLimiter.middleware';

dotenv.config();

const app: Application = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/notes', crudRateLimiter, noteRoutes);
app.use('/api/attachments', crudRateLimiter, attachmentRoutes);

app.get('/', (req, res) => {
  res.send('Smart Notes Backend is running!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

connectDB();