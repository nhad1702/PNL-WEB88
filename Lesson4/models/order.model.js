import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        res: 'products',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
})

const orderModel = mongoose.model('orders', orderSchema)

export default orderModel