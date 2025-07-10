import express from "express";
import auth from "../middleware/auth.js"
import { applyToJob, unApplyToJob, getAppliedJobs } from "../controllers/application.controller.js";

const router = express.Router()

router.post("/apply/:jobId", auth, applyToJob);

router.post("/unapply/:jobId", auth, unApplyToJob);

router.get("/getApplied", auth, getAppliedJobs);

export default router;