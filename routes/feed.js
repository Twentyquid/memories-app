import express from "express";
import { getFeed, createFeed, updateFeed } from "../controllers/feed.js";

const router = express.Router();

router.get("/", getFeed);
router.post("/", createFeed);
router.post("/update/:id", updateFeed);

export default router;
