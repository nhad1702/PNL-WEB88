import mongoose from "mongoose"

const customerSchema = {
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    address: { type: String, require: true },
    accountId: { type: mongoose.Types.ObjectId, ref: 'accounts' }
}

const customerModel = mongoose.model('customers', customerSchema)
export default customerModel