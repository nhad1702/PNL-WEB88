import customerRouter from "./customers.route.js";
import productRouter from "./products.route.js";
import orderRouter from "./orders.route.js";
import { Router } from "express";

const rootRouter = Router()

rootRouter.use('/customers', customerRouter)
rootRouter.use('/products', productRouter)
rootRouter.use('/orders', orderRouter)

export default rootRouter