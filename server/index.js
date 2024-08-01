import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import Link from './model/Link.js'
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


app.post("/link", async(req,res)=>{
    const {target,title,slug} = req.body;
    const link = new Link({target,title,slug})
    
    const savedLink = await link.save();
    res.json({
        success:true,
        data:savedLink,
        message:"Link saved successfully"
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})



