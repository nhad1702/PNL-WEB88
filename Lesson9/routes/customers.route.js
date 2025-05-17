import customerController from "../controllers/customers.controller.js";
import { authLogin, validateCustomer } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const customerRouter = Router()

customerRouter.post('/register', validateCustomer, customerController.customerRegister)
customerRouter.post('/login', authLogin, customerController.customerLogin)

export default customerRouter