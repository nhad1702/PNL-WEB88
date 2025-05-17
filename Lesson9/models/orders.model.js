import mongoose from "mongoose";

const orderSchema = {
    customerId: { type: mongoose.Types.ObjectId, req: 'customers', require: true },
    productId: { type: mongoose.Types.ObjectId, req: 'products', require: true },
    quantity: { type: Number, require: true },
    totalPrice: { type: Number, require: true }
}

const orderModel = mongoose.model('orders', orderSchema)
export default orderModel