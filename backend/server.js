import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'
import jobRoutes from './routes/job.route.js'
import authRoutes from './routes/auth.route.js'
import applicationRoutes from './routes/application.route.js'
import userRoutes from './routes/user.route.js'
import bookmarkRoutes from './routes/bookmark.route.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
dotenv.config()

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/application", applicationRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bookmark", bookmarkRoutes);

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    if(process.env.NODE_ENV === "development"){
        console.log(`server started at http://localhost:${PORT}`);
    } else {
        console.log(`server started at ${process.env.VITE_PROD_URL}`)
    }
});