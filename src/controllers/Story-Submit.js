import { Story } from "../models/Story.model.js";
import { getBadmashiScore } from "./badmashi-score.js";
import { User } from "../models/user.model.js";

const submitstory = async(req,res) => {
    try{
        const {title,story,UserId} = req.body;
        if(!title){
            return res.status(400).json({error : " Title is Required"})
        }
        if(!story) {
            return res.status(400).json({error : " Story is Required"})
        }
        console.log(UserId);
         
        const badmashiscore = await getBadmashiScore (title,story);
        const newstory = await Story.create({
            title,
            story,
            aiscore : badmashiscore.score,
            remark : badmashiscore.remark,
            author : UserId
    
    
        })
       const user = await User.findById(UserId);
       if(!user){   
        return res.status(400).json({error : "User not found"})
       }
         user.badmashiScore = (user.badmashiScore + badmashiscore.score)/2;
         await user.save();
        console.log(user);
      

        console.log(badmashiscore)
        res.status(201).json({ message: "Story submitted successfully!", story: newstory });
    } catch (error) {
        console.error("Error submitting story:", error);
        res.status(500).json({ error: "Internal Server Error" });

    }
   
   
}

export{submitstory};







