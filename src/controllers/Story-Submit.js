import { Story } from "../models/Story.model";
import { getBadmashiScore } from "./badmashi-score";
import { User } from "../models/user.model";

const submitstory = async(req,res) => {
    try{
        const {title,story,UserId} = req.body;
        if(!title){
            return res.status(400).json({error : " Title is Required"})
        }
        if(!story) {
            return res.status(400).json({error : " Story is Required"})
        }
         
        const badmashiscore = await getBadmashiScore (title,story);
        const newstory = await Story.create({
            title,
            story,
            aiscore : badmashiscore.aiscore,
            remark : badmashiscore.remark,
            author : user._id
    
    
        })
        res.status(201).json({ message: "Story submitted successfully!", story: newStory });
    } catch (error) {
        console.error("Error submitting story:", error);
        res.status(500).json({ error: "Internal Server Error" });

    }
   
   
}







