import mongoose, { Schema } from "mongoose";

const postSchema=new Schema({
    title:String,
    message:String,
    name:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    comments:{type:[String],default:[]},
    likes:{
        type:[String],
        default:[],
    },
    createdAt:{
        type:Date,
        default:new Date(),
    }
})

const PostMessage=mongoose.model("PostMessage",postSchema);
export default PostMessage;