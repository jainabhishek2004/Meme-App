import { Story } from "../models/Story.model.js";

const TrendingStories = async (req, res) => {
  try {
    
    let page = parseInt(req.query.page) || 1;
    let limit = 10; 
    let skip = (page - 1) * limit; 

    const stories = await Story.aggregate([
      {
        $addFields: {
          weightedscore: {
            $add: [
              { $multiply: ["$aiscore", 0.5] },
              { $multiply: ["$upvotes", 0.5] }
            ]
          }
        }
      },
      { $sort: { weightedscore: -1, createdAt: -1 } }, // Sort by trending + recent
      { $skip: skip },
      { $limit: limit }
    ]);

    res.status(200).json({ page, stories });
  } catch (error) {
    console.error("Error fetching trending stories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {TrendingStories};
