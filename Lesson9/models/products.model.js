import mongoose from "mongoose";

const productSchema = {
    name: { type: String, require: true },
    price: { type: Number, require: true },
    quantity: { type: Number, require: true }
}

const productModel = mongoose.model('products', productSchema)
export default productModel