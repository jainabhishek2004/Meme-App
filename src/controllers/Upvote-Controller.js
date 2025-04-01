import { Story } from "../models/Story.model";

const incrementUpvote = async (req, res) => {
    try {
        const StoryId = req.query.StoryId || req.query.story_id; 

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

        // Return success response
        res.status(200).json({ message: "Upvote added successfully", story: updatedStory });
    } catch (error) {
        console.error("Error in incrementUpvote:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const decrementupvote = async (req,res) => {
    const {StoryId} = req.query;
    if(!StoryId) {
        res.status(400).json({error :" StoryIdnotFound"})
    }

    const Story = await Story.findById(StoryId);
    if(!Story){
        res.status(400).json({error :" Story not Found"})
    
    }
    const updatedStory = await Story.findByIdAndUpdate(StoryId,
        {upvotes: Story.upvotes -1},
        {
            new:true
        }
      
    )
    res.status(200).json({ message: "Upvote added successfully", story: updatedStory })

}

export { incrementUpvote };
export { decrementupvote}
