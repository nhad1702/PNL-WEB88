import mongoose from "mongoose";

// khởi tạo schema (định nghĩa các field cho các document và kiểu dữ liệu của field đó)
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

// định nghĩa model cần truyền với phương thức model và các tham số lần lượt: tên collections, schema của document
const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;