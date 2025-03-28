import mongoose, { Schema } from "mongoose";
const certificateSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, 
                ref: "User",
                 required: true
                
              }, 
      averagebadmashiScore: { type: Number, 
                 default: 0 ,
                 required : true},
      funremark: {
             type :String,
             required : true
      } ,
      Totalupvotes : {
        type : Number,
        required : true,
        default : 0


      }          
    

    },
    {
        timestamps : true
    }
    
)
export const Certificate = mongoose.model("Certificate", certificateSchema)