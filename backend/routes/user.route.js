import express from "express";
import auth from "../middleware/auth.js";
import { getDashboard, getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/dashboard", auth, getDashboard);

router.get("/getUser", getUser);


export default router;