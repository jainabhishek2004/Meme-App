import { User } from "../models/user.model.js";
import { Story } from "../models/Story.model.js";
import { airemark } from "./Certificate-remark.js";

const issueCertificate = async (req, res) => {
    try {
        const UserId = req.query.UserId;

        if (!UserId) {
            return res.status(400).json({ error: "User ID not found" });
        }

        const user = await User.findById(UserId);
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const stories = await Story.find({ author: UserId });

        if (stories.length === 0) {
            return res.status(200).json({ response: "Write some stories first" });
        }

       
        const totalUpvotes = stories.reduce((sum, story) => sum + story.upvotes, 0);

       
        const averageBadmashiScore =
            stories.length > 0
                ? stories.reduce((sum, story) => sum + story.aiscore, 0) / stories.length
                : 0;

        
        let remark;
        try {
            remark = await airemark(totalUpvotes, averageBadmashiScore);
        } catch (error) {
            console.error("Error generating AI remark:", error);
            remark = "Stay badmash, keep shining!"; 
        }

        const certificate = {
            fullName: user.fullname,
            totalUpvotes,
            averageBadmashiScore: averageBadmashiScore.toFixed(2),
            remark,
        };

        res.status(200).json(certificate);
    } catch (error) {
        console.error("Error issuing certificate:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { issueCertificate };
