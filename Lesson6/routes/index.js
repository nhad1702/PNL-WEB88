import { Router } from "express";
import CustomerRouter from "./customer.js";
import OrderRouter from "./order.js";

const RootRouter = Router();
RootRouter.use('/customers', CustomerRouter);
RootRouter.use('/orders', OrderRouter);

export default RootRouter;