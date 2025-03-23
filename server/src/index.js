import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import connectDB from "./db"
import { router as RoomRoutes } from "./routes/room.routes.js"
import { router as UserRoutes } from "./routes/user.routes.js"

dotenv.config()
const app=express()
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ["GET", "POST"]
    }
});
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb"}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true
}))
app.use(express.static("public"))

app.use("/room",RoomRoutes)
app.use("/user",UserRoutes)

const port=process.env.PORT

connectDB()
.then(()=>{
    server.listen(port,()=>console.log(`Server running on port ${port}`))
})
.catch((error)=>console.error(`${error} Failed start server`))

io.on("connection",(socket)=>{
    console.log(`Socket ${socket.id} connected`)
    socket.on('sendMessage',(message)=>{
        io.emit("message",message)
    })
    socket.on("disconnect",()=>{
        console.log(`Scoket ${socket.id} disconnected`)
    })
})