import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        unique: true,
        require:true

    },
    password: {
        type: String,
        require:true

    },
    role: {
        type: String,
        require:true
    }
})
const User = model("User", userSchema)
export default User
