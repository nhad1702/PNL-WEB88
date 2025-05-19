import mongoose from "mongoose"

const depositOrderSchema = {
    customerId: { type: mongoose.Types.ObjectId, ref: 'customers' },
    propertyId: { type: mongoose.Types.ObjectId, ref: 'properties' },
    depositAmount: { type: Number, require: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['paid', 'pending', 'cancelled'] }
}

const depositOrderModel = mongoose.model('depositOrders', depositOrderSchema)
export default depositOrderModel