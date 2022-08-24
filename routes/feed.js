import express from "express";
import { auth } from "../middlewares/auth.js";
import { getFeed, createFeed, updateFeed } from "../controllers/feed.js";

const router = express.Router();

router.use(auth);
router.get("/", getFeed);
router.post("/", createFeed);
router.patch("/update/:id", updateFeed);

export default router;
