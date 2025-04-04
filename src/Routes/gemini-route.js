import { Router } from "express";
import { geminiscore } from "../controllers/gemini-score.js";
import { RegisterUser } from "../controllers/Login-Controller.js";
import { submitstory } from "../controllers/Story-Submit.js";
import { issueCertificate } from "../controllers/issue-certificate.js";
import { topUsers } from "../controllers/topusers.js";
import { LoginUser } from "../controllers/Login-Controller.js";

const router = Router();
router.get("/test", (req, res) => {
    console.log("✅ /api/test route is working!");
    res.json({ message: "Route is working!" });
  });
  

router.route("/ai-score").post(geminiscore);
router.route("/Register").post(RegisterUser);
router.route("/Submit-story").post(submitstory);
router.route("/certificate").post(issueCertificate);
router.route("/leaderboard").post(topUsers);
router.route("/Login").post(LoginUser);

export default router;
