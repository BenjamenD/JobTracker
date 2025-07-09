import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'


const app = express();
dotenv.config()

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)

app.listen(PORT, () => {
    connectDB();
    console.log(`server started at http://localhost:${PORT}`);
});