import express, { json, response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import IoRedis from 'ioredis'
import User from './model/User.js'
import { postLink, getslug, signup, signin, getuserlinks, deletelink } from './controllers/link.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const dbconnection = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URL)
    if (connect) {
        console.log("Mongodb Connected")
        console.log(`Redis Response ${await redis.ping()}`)
    }
    else {
        console.log("Mongodb Not Connected")
    }
}
dbconnection();

const redis = new IoRedis(`${process.env.REDIS_URL}`)


app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "server is running..."
    })
}
)

app.get("/links", getuserlinks)

app.get("/users", async (req, res) => {
    const cachedusers = await redis.get("users")

    if (cachedusers) {
        return res.json({
            success: true,
            message: "Users From Redis",
            data: JSON.parse(cachedusers)
        })
    } else {
        const users = await User.find()

        redis.set("users", JSON.stringify(users))
        return res.json({
            success: true,
            message: "Users from MongoDB",
            data: users
        })
    }
})

app.post("/link", postLink)

// app.get("/links", getAllLinks)

app.get("/:slug", getslug)

app.post("/signup", signup)

app.post("/signin", signin)

app.delete("/link/:linkid", deletelink)

app.get("/invalidateusers", async (req, res) => {
    await redis.del("users")
    res.json({
        success: true,
        message: "User's Redis cache invalidated"
    })
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})




