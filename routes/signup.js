import { Router } from "express";
import { signUp } from "../controllers/feed.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.post("/", signUp);

export default router;
