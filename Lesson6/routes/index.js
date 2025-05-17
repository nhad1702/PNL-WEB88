import { Router } from "express";
import CustomerRouter from "./customer.route.js";
import OrderRouter from "./order.route.js";

const RootRouter = Router();
RootRouter.use('/customers', CustomerRouter);
RootRouter.use('/orders', OrderRouter);

export default RootRouter;