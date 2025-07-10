import express from "express";
import auth from "../middleware/auth.js";
import { getDashboard } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/dashboard", auth, getDashboard);


export default router;