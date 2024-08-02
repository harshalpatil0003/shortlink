import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import {postLink,getslug} from './controllers/link.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const dbconnection = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URL)
    if (connect) {
        console.log("Mongodb Connected")
    }
    else {
        console.log("Mongodb Not Connected")
    }
}
dbconnection();

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "server is running..."
    })
}
)


app.post("/link",postLink)
app.get("/:slug",getslug)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})



