import { User } from "../models/user.model.js";

const RegisterUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname) return res.status(400).json({ error: "Full name is required" });
    if (!email) return res.status(400).json({ error: "Email is required" });
    if (!password) return res.status(400).json({ error: "Password is required" });

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = await User.create({ fullname, email, password });

    if (!newUser) {
      return res.status(500).json({ error: "User not created" });
    }

    
    const userWithoutPassword = await User.findById(newUser._id).select("-password");

    return res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Error while creating user:", error);
    return res.status(500).json({ error: error.message });
  }
};

const LoginUser = async (req,res) => {
  const {email,password} =req.body;
  if(!email){
    return res.status(400).json({error:"Email not entered"})
  }
  if(!password){
    return res.status(400).json({error:"Password not entered"})
  }
  const user = await User.findOne({email:email})
  if(!user){
    return res.status(400).json({error:"User with this mail or password does not exist"})
    
  }
   
  const userWithoutPassword = await User.findById(user._id).select("-password");
  const passwordcheck = await user.isPasswordCorrect(password);
  if(!passwordcheck){
    return res.status(400).json({error:"Password not correct"})
  }

 
  
  
  

  return res.status(201).json({message :"login successfully",user:userWithoutPassword})
  
}

export {RegisterUser};
export {LoginUser};
