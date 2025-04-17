import { User } from "../models/user.model.js";

const getuserprofile = async(req,res) => {
    try{
        const {UserId} = req.query;
        if(!UserId){
            return res.status(400).json({error:"sent user id with your request"})
        }

        const user = await User.findById(UserId).select("-password");
        if(!user){
            return res.status(400).json({error:"User not Founds"})
        }
        return res.status(201).json(user);



    }
    catch(error){
        
        
        
        return res.status(400).json({error:"Error while fetching user"});

    }
}

export {getuserprofile}