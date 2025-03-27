import { Router } from "express";
const router = Router();
router.route("/ai-score").post(geminiscore);