import mongoose from "mongoose";

const RoomSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    users:[
        {
            username:{type:String,required:true},
            messages:[{message:String}]
        }
    ]
},{timestamps:true})

const Room=mongoose.model("Room",RoomSchema)
export default Room