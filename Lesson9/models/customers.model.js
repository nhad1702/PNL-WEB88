import mongoose from "mongoose";

const customerSchema = {
    name: { type: String, require: true },
    email: { type: String, retquire: true, unique: true },
    age: { type: Number, require: true },
    password: { type: String, require: true }
}

const customerModel = mongoose.model('customers', customerSchema)
export default customerModel