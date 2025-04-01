import {User} from "../models/user.model.js";



const issuecertificate = async (req,res) => {

    const UserId = req.query.UserId;
    if(!UserId) {
        res.status(400).json({error: "User Id not Found"})

    }

    const user = await User.findById(UserId);
    if(!user){
        res.status(400).json({error: "User not Found"})
    }
    //full name
    //averge score
    //total upvotes
    //Ai fun remark



}