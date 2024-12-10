import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import noteRoutes from './routes/v1/note.route';
import attachmentRoutes from './routes/v1/attachment.route';
import aiRoutes from './routes/v1/ai.route';
import { aiRateLimiter, crudRateLimiter } from './middlewares/rateLimiter.middleware';

dotenv.config();

const app: Application = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/notes', crudRateLimiter, noteRoutes);
app.use('/api/v1/attachments', crudRateLimiter, attachmentRoutes);
app.use('/api/v1/ai', aiRateLimiter, aiRoutes);

app.get('/', (req, res) => {
  res.send('Smart Notes Backend is running!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

connectDB();