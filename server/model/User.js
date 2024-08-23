import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    name: {
        type: String,
        required:[true,'Enter Name']
    },
    email: {
        type: String,
        unique: true,
        required:[true,'Enter Email']

    },
    password: {
        type: String,
        required:[true,'Enter Password']

    },
    role: {
        type: String,
        required:[true,'Enter Role']
    }
})
const User = model("User", userSchema)
export default User
