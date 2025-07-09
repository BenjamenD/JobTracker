import express from 'express';
import { getJob, getJobs } from '../controllers/job.controller';

const router = express.Router();

router.get("/", getJobs);

router.get("/:id", getJob);