import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';

import qaRoutes from './routes/qa.routes';
import cors from "cors";


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use("/api/qa",qaRoutes)

export default app;
