import OrderModel from "../models/order.model.js";

const OrderController = {
  // get list orders by customer id
  getListOrder: async (req, res) => {
    try {
      const orders = await OrderModel.find({});
      //   res.json(customers);
      if (!orders) throw new Error("Order not found!");

      res.status(200).send({
        data: orders,
        message: "Get order successful!",
        success: true,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: null,
        success: false,
      });
    }
  },
  // create new order
  creatNewOrder: async (req, res) => {
    try {
      const { orderId, cusId, quantity, totalPrice } = req.body;
      if (!orderId) throw new Error("orderId is required!");
      if (!cusId) throw new Error("customerId is required!");
      if (!quantity) throw new Error("quantity is required!");
      if (!totalPrice) throw new Error("totalPrice is required!");

      const createdOrder = await OrderModel.create({
        orderId,
        cusId,
        quantity,
        totalPrice,
      });
      res.status(201).send({
        data: createdOrder,
        message: "Register successful!",
        success: true,
      });
    } catch (error) {
      res.status(403).send({
        message: error.message,
        data: null,
        success: false,
      });
    }
  },


};

export default OrderController;