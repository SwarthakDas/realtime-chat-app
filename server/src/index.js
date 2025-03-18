import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { Server } from 'socket.io';
import { createServer } from 'node:http';

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

const port=process.env.PORT
server.listen(port,()=>console.log(`Server running on port ${port}`))

io.on("connection",(socket)=>{
    console.log(`Socket ${socket.id} connected`)
    socket.on('sendMessage',(message)=>{
        io.emit("message",message)
    })
    socket.on("disconnect",()=>{
        console.log(`Scoket ${socket.id} disconnected`)
    })
})