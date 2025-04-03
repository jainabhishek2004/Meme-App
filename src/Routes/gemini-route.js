import { Router } from "express";
import { geminiscore } from "../controllers/gemini-score.js";
import { RegisterUser } from "../controllers/Login-Controller.js";
import { submitstory } from "../controllers/Story-Submit.js";

const router = Router();
router.get("/test", (req, res) => {
    console.log("✅ /api/test route is working!");
    res.json({ message: "Route is working!" });
  });
  

router.route("/ai-score").post(geminiscore);
router.route("/Register").post(RegisterUser);
router.route("/Submit-story").post(submitstory);

export default router;
