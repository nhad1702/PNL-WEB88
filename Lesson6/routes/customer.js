import { Router } from "express";
import CustomerController from "../controllers/customer.controller.js";
import authMiddleware from "../middlewares/Customer.middleware.js";

const CustomerRouter = Router();

CustomerRouter.get("/getApikey/:id", CustomerController.getApiKey);
CustomerRouter.get("/", authMiddleware, CustomerController.getListCustomer);
CustomerRouter.get("/:id", authMiddleware, CustomerController.getCustomerById);

// CustomerRouter.get("/:id/orders", CustomerController.getListOrderByCustomerId);

export default CustomerRouter;