import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'
import jobRoutes from './routes/job.route.js'


const app = express();
dotenv.config()

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobRoutes);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)

app.listen(PORT, () => {
    connectDB();
    if(process.env.NODE_ENV === "development"){
        console.log(`server started at http://localhost:${PORT}`);
    } else {
        console.log(`server started at ${process.env.PROD_URL}`)
    }
});