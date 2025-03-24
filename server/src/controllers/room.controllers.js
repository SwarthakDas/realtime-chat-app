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

export const fetchMessages = async (req, res) => {
    try {
        const {id} = req.body;
        const room = await Room.findOne({id:id});

        const time = new Date();
        time.setHours(time.getHours() - 24);

        let messages = [];
        room.users.forEach((user)=>{
            user.messages.forEach((msg)=>{
                if(new Date(msg.createdAt)>=time){
                    messages.push({username:user.username,message:msg.message,createdAt:msg.createdAt})
                }
            })
        })

        messages.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt))
        return res.status(200).json({ messages });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const fetchRooms=async(res)=>{
    try {
        const rooms=await Room.find()
        const roomIds=rooms.map(room=>{
            room.id
        })
        return res.status(200).json({rooms:roomIds})
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { id, username, message } = req.body;

        const room = await Room.findOne({ id: id });
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }

        const user = room.users.find(user => user.username === username);
        if (!user) {
            user = { username, messages: [] };
            room.users.push(user);
        }

        user.messages.push({ message, createdAt: new Date() });
        await room.save();

        return res.status(200).json({ message: "Message sent successfully", room });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
