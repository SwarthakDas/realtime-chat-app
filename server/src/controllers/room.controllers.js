import Room from "../models/room.model.js"

export const createRoom=async(req,res)=>{
    try {
        const {id}=req.body
        const newRoom=new Room({id})
        await newRoom.save()
        res.status(201).json({message:"Room created successfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const checkRoom=async(req,res)=>{
    try {
        const {id}=req.body
        const room=await Room.findOne({id:id})
        if(room) res.status(201).json({message:"Room ID already exists"});
        else res.status(201).json({message:"Room ID available"});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}