import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    }
})

const userModel = mongoose.model('user', userSchema)

export default userModel