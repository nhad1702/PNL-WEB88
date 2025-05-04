import { Router } from "express"
const productRouter = Router()

import productControllers from "../Controllers/product.controller.js"

productRouter.get('/', productControllers.getProducts)

export default productRouter