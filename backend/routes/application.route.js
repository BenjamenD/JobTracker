import express from "express";
import auth from "../middleware/auth.js"
import { applyToJob, unApplyToJob, getAppliedJobs, isApplied } from "../controllers/application.controller.js";

const router = express.Router()

router.post("/:jobId", auth, applyToJob);

router.post("/unapply/:jobId", auth, unApplyToJob);

router.get("/getApplied", auth, getAppliedJobs);

router.get("/isApplied/:jobId", auth, isApplied);

export default router;