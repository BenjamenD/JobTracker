import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'


const app = express();
dotenv.config()

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    
});

app.listen(PORT, () => {
    connectDB();
    console.log(`server started at http://localhost:${PORT}`);
});