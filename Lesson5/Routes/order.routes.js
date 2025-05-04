import { Router } from "express"
const orderRouter = Router()

import orderControllers from "../Controllers/order.controller.js"

orderRouter.get('/', orderControllers.getOrders)

export default orderRouter