import { Router } from "express"
const customerRouter = Router()

import customerControllers from "../Controllers/customer.controller.js"

customerRouter.get('/', customerControllers.getCustomers)
customerRouter.get('/:id', customerControllers.getCustomer)
customerRouter.get('/:id/orders', customerControllers.getCustomerOrder)

export default customerRouter