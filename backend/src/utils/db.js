import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`MongoDb Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("MongoDb Connection Error: ",error)
    }
}