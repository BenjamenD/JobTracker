import express from "express";
import auth from "../middleware/auth.js"
import { bookmarkJob, unBookmarkJob, getBookmarkedJobs, isBookmarked } from "../controllers/bookmark.controller.js";

const router = express.Router()

router.post("/:jobId", auth, bookmarkJob);

router.post("/unbookmark/:jobId", auth, unBookmarkJob);

router.get("/getBookmarked", auth, getBookmarkedJobs);

router.get("/isBookmarked/:jobId", auth, isBookmarked);

export default router;