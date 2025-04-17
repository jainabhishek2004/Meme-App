import { Router } from "express";
import { geminiscore } from "../controllers/gemini-score.js";
import { RegisterUser } from "../controllers/Login-Controller.js";
import { submitstory } from "../controllers/Story-Submit.js";
import { issueCertificate } from "../controllers/issue-certificate.js";
import { topUsers } from "../controllers/topusers.js";
import { LoginUser } from "../controllers/Login-Controller.js";
import { incrementUpvote } from "../controllers/Upvote-Controller.js";
import { decrementupvote } from "../controllers/Upvote-Controller.js";
import { getstory } from "../controllers/getStory.js";
import { getuserprofile } from "../controllers/getuserprofile.js";
import { yt } from "../controllers/test.js";

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
router.route("/upvote").patch(incrementUpvote);
router.route("/decrementupvote").patch(decrementupvote);
router.route("/getstory").get(getstory);
router.route("/getuser").get(getuserprofile);
router.route("/teststory").get(yt);

export default router;
