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

export const addUser=async(res,req)=>{
    try {
        const {id,username}=req.body
        const room=await Room.findOne({id:id})
        const userExists = room.users.some(user => user.username === username);
        if (userExists) {
            return res.status(400).json({ error: "User already exists in the room" });
        }
        room.users.push({username,messages:[]})
        await room.save()
        return res.status(200).json({ message: "User added successfully", room });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const removeUser=async(res,req)=>{
    try {
        const {id,username}=req.body
        const room=await Room.findOne({id:id})
        const userExists = room.users.some(user => user.username === username);
        if (!userExists) {
            return res.status(400).json({ error: "User doesnot exist in the room" });
        }
        room.users=room.users.filter((user)=>user.username!==username)
        await room.save()
        return res.status(200).json({ message: "User removed successfully", room });
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}