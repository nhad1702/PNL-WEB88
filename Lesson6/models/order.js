import mongoose from "mongoose";

// khởi tạo schema (định nghĩa các field cho các document và kiểu dữ liệu của field đó)
const orderSchema = new mongoose.Schema({
  customerId: {type: mongoose.Schema.Types.ObjectId, ref: "Customers"},
  productId: {type: mongoose.Schema.Types.ObjectId, ref: "Products"},
  quantity: String,
  totalPrice: String,
});

// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const OrderModel = mongoose.model("orders", orderSchema);
export default OrderModel;