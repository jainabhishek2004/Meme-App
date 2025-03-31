
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
const userSchema = new Schema({

    fullname : {
        type: String,
        required: true,
       
        lowercase : true,
        trim : true
        
    },
    email: {
        type :String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    password : {
        type :String,
        required : true

    },
    badmashiScore: { type: Number, default: 0 }, 
    totalUpvotes: { type: Number, default: 0 }
  
},
{
    timestamps:true
   })

   userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

   export const User = mongoose.model ("User",userSchema)