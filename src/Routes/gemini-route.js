import { Router } from "express";
import { geminiscore } from "../controllers/gemini-score.js";

const router = Router();
router.get("/test", (req, res) => {
    console.log("✅ /api/test route is working!");
    res.json({ message: "Route is working!" });
  });
  

router.route("/ai-score").post(geminiscore);

export default router;
