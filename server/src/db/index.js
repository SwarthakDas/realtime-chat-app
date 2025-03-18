import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const connectDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
    } catch (error) {
        console.error("DB connection failed ",error)
        process.exit
    }
}

export default connectDB