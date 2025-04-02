import { User } from "../models/user.model.js";
import { Story } from "../models/Story.model.js";

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

    
        if (!stories.length) {
            return res.status(200).json({ response: "Write some stories first" });
        }

      
        const totalUpvotes = stories.reduce((sum, story) => sum + story.upvotes, 0);

       
        const averageBadmashiScore =
            stories.length > 0
                ? stories.reduce((sum, story) => sum + story.aiscore, 0) / stories.length
                : 0;

      
        const certificate = {
            fullName: user.fullname,
            totalUpvotes: totalUpvotes,
            averageBadmashiScore: averageBadmashiScore.toFixed(2),
        };

        res.status(200).json(certificate);
    } catch (error) {
        console.error("Error issuing certificate:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { issueCertificate };
