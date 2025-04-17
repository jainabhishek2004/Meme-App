import mongoose, { Schema } from "mongoose";

const storySchema = new Schema({
    title : {
        type: String,
        required : true,
        trim : true,
        lowercase : true,


    },

    story : {
        type :String,
        required : true,
        trim : true,
        lowercase : true,
    },
    aiscore : {
        type:Number,
        default:0,
        required :true
    },
    upvotes :{
        type :Number,
        default:0,
        required:true
    },
    remark : {
        type :String,
        required : true,
        trim : true,
        lowercase : true,

    },
    author :{
        
            type: Schema.Types.ObjectId,
            ref: "User",
            required:true
        
    },
    UpvotedBy : [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],  

},
{
    timestamps: true
}

    


)
export const Story = mongoose.model("Story", storySchema)