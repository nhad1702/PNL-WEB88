import productController from "../controllers/products.controller.js";
import { Router } from "express";

const productRouter = Router()

productRouter.get('/', productController.getProduct)
productRouter.post('/create', productController.createProduct)

export default productRouter