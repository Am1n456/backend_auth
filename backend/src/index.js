import express from "express";
import router from "./routes/auth.route.js"
import { connectDb } from "./utils/db.js";
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(express.json())

app.use("/api/auth", router)

app.listen(3000, () => {
    console.log(`Server Connected Successfully at port 3000`)
    connectDb()
})

