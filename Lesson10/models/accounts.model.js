import mongoose from "mongoose"

const accountSchema = {
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    isActive: { type: Boolean, default: true, enum: ['customer', 'manager', 'employee'], default: 'customer', require: true },
    role: { type: String }
}

const accountModel = mongoose.model('accounts', accountSchema)
export default accountModel