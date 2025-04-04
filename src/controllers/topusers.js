import { User } from "../models/user.model.js";

const topUsers = async (req, res) => {
  try {
    const topUsers = await User.aggregate([
      {
        $addFields: {
          scoringcreterion: {
            $add: [
              { $multiply: ["$badmashiScore", 0.5] },
              { $multiply: ["$totalUpvotes", 0.5] }
            ]
          }
        }
      },
      { $sort: { scoringcreterion: -1 } },
      { $limit: 10 },
      {$unset : "password"}
    ]);


    res.status(200).json(topUsers);
  } catch (error) {
    console.error("Error fetching top users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { topUsers};

