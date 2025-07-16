import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    email: { type: String, require: true, uniqued: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    DOB: { type: Date, required: true },
    age: { type: Number, required: true },
    role: { type: String, enum: ['employee', 'manager', 'admin'], default: 'employee', required: true },
    position: { type: String },
    rank: { type: String, default: 'E', required: true },
    resetToken: { type: String },
    resetTokenExpiration: { type: Date },
    stats: {
        organization_skill: {
            type: Number,
            default: 0
        },
        technical_skill: {
            type: Number,
            default: 0
        },
        idea_contribution: {
            type: Number,
            default: 0
        },
        communication_skill: {
            type: Number,
            default: 0
        },
        product_optimization: {
            type: Number,
            default: 0
        }
    }
})

const userModel = mongoose.model('users', userSchema)
export default userModel