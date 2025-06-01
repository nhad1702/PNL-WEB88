import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    gender: { type: String, enum: ['Male', 'Female'], require: true },
    DOB: { type: Date, require: true },
    age: { type: Number, require: true },
    position: { type: String, require: true },
    role: { type: String, enum: ['employee', 'manager', 'admin'], default: 'employee', require: true },
    rank: { type: String, default: 'E' },
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