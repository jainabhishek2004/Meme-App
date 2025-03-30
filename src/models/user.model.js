
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({

    fullname : {
        type: String,
        required: true,
        unique : true,
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

   export const User = mongoose.model ("User",userSchema)