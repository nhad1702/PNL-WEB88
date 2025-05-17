import orderController from "../controllers/orders.controller.js";
import { authCustomer, validateOrder, validateUpdateOrder } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const orderRouter = Router()

orderRouter.post('/', authCustomer, validateOrder, orderController.createOrder)
orderRouter.get('/', authCustomer, orderController.getOrder)
orderRouter.put('/:id', authCustomer, validateUpdateOrder, orderController.updateOrder)
orderRouter.delete('/:id', authCustomer, orderController.deleteOrder)

export default orderRouter