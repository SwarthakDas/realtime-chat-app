import Room from "../models/room.model"
import User from "../models/user.model"

export const createUser=async(req,res)=>{
    try {
        const {username}=req.body
        const newUser=new User.save({username})
        await newUser.save()
        res.status(201).json({message:"User created successfully"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const checkUsername=async(req,res)=>{
    try {
        const {username}=req.body
        const user=await User.findOne({username:username})
        if(user) res.status(201).json({message:"username already exists"});
        else res.status(201).json({message:"username available"});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const fetchChat=async(req,res)=>{
    try {
        const {username}=req.body
        const rooms=await Room.find({"users.username":username},"id")
        const roomIds=rooms.map(room=>room.id)
        return res.status(200).json({ rooms: roomIds });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

