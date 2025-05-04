import { Router } from "express"
import customerRouter from "./customer.routes.js"
import productRouter from "./product.routes.js"
import orderRouter from "./order.routes.js"

const rootRouter = Router()

rootRouter.use('/customers', customerRouter)
rootRouter.use('/products', productRouter)
rootRouter.use('/orders', orderRouter)

export default rootRouter