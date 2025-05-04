import orderModel from "../Models/order.model.js"

const orderControllers = {
    getOrders: async (req, res) => {
        try {
            const order = await orderModel.find({})
            console.log(order)
            res.status(200).json(order)
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: err.message })
        }
    }
}

export default orderControllers