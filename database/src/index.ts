import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import bookRouter from './routes/book.route';
import authRouter from './routes/auth.route';
import mechanismRouter from './routes/mechanism.route';
import cors from 'cors';
dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3030');
const MONGODB_URI: string = process.env.MONGODB_URI || '';

app.use(cors());
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  const serverTime = new Date().toLocaleString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false 
  });

  res.status(200).json({
    status: 'success',
    message: 'Selamat Datang di Kelompok P03 💫',
    data: {
      serverTime
    }
  });
});

app.use('/auth', authRouter);
app.use('/book', bookRouter);
app.use('/mechanism', mechanismRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    data: {}
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
    data: {}
  });
});

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(MONGODB_URI);
    console.log('📦 Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running on Port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  }
};

startServer();

export default app;
