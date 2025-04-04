import { Story } from "../models/Story.model.js"; 
import { User } from "../models/user.model.js";// Adjust the import path as necessary

const incrementUpvote = async (req, res) => {
    try {
        const StoryId = req.query.StoryId 

        if (!StoryId) {
            return res.status(400).json({ error: "Story ID is required" });
        }

        const story = await Story.findById(StoryId);
        if (!story) {
            return res.status(404).json({ error: "Story not found" });
        }

     
        const updatedStory = await Story.findByIdAndUpdate(
            StoryId,
            { upvotes: story.upvotes + 1 }, 
            { new: true } 
        );
        const user = await User.findById(story.author);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.totalUpvotes = user.totalUpvotes + 1;
        await user.save(); // Save the updated user document

        // Return success response
        res.status(200).json({ message: "Upvote added successfully", story: updatedStory });
    } catch (error) {
        console.error("Error in incrementUpvote:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const decrementupvote = async (req,res) => {
    const StoryId = req.query.StoryId 
    if(!StoryId) {
        res.status(400).json({error :" StoryIdnotFound"})
    }

    const story = await Story.findById(StoryId);
    if(!story) {
        return res.status(400).json({error :" Story not Found"})
    
    }
    if(story.upvotes <= 0) {
        return res.status(400).json({error :" Upvotes are already zero"})
    }
    const updatedStory = await Story.findByIdAndUpdate(StoryId,
        {upvotes: story.upvotes -1},
        {
            new:true
        }
      
    )
    const user = await User.findById(story.author);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.totalUpvotes = user.totalUpvotes - 1;
        await user.save(); 
    res.status(200).json({ message: "Upvote added successfully", story: updatedStory })

}

export { incrementUpvote };
export { decrementupvote}
