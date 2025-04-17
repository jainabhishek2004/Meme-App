import { Story } from "../models/Story.model.js";


const getstory = async (req,res) => {

    try{

        const {StoryId} = req.query;
        if(!StoryId){
            return res.status(400).json({error:"Send Story id with request"});
        }
        const story = await Story.findById(StoryId);
        if(!story){
            return res.status(400).json({error:"story not found"});
        }

        return res.status(201).json({story});

    }
    catch(error){

        console.log(error);
        
        
        return res.status(400).json({error:"Error while fetching story"});


    }
    
}

export{getstory};