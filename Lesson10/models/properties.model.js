import mongoose from "mongoose"

const propertySchema = {
    address: { type: String, require: true },
    price: { type: Number, require: true },
    area: { type: Number, require: true },
    status: { type: String, enum: ['on sale', 'sold', 'stop selling'], require: true },
    employeeId: { type: mongoose.Types.ObjectId, ref: 'employees' }
}

const propertyModel = mongoose.model('properties', propertySchema)
export default propertyModel