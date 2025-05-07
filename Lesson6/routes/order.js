import { Router } from "express";
import OrderController from "../controllers/order.controller.js";

const OrderRouter = Router();

OrderRouter.get("/", OrderController.getListOrder)
OrderRouter.post("/", OrderController.creatNewOrder)

export default OrderRouter;