import mongoose, { Document } from 'mongoose'

export interface IUser extends Document {
    email: string,
    password: string,
    fullName: string,
    DOB: Date,
    age: number,
    role: string
}

const userSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    DOB: { type: Date, required: true },
    age: { type: Number },
    role: { type: String, enum: ["boss, manager, employee"], default: 'employee', required: true }
})

const userModel = mongoose.model<IUser>('user', userSchema)
export default userModel