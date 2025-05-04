import mongoose from "mongoose"
import customerModel from "../Models/customer.model.js"
import orderModel from "../Models/order.model.js"

const customerControllers = {
    getCustomers: async (req, res) => {
        try {
            const customer = await customerModel.find({})
            if (!customer) {
                res.status(404).json({ message: 'Customer list not found' })
            } else {
                console.log(customer)
                res.status(200).json(customer)
            }
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: err.message })
        }
    },
    getCustomer: async (req, res) => {
        const { id } = req.params
        
        try {
            const existCustomer = await customerModel.findById(id)

            if(!existCustomer) {
                res.status(404).json({ message: 'Customer not found' })
            } else {
                res.status(200).json(existCustomer)
            }
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: err.message })
        }
    },
    getCustomerOrder: async (req, res) => {
        const { customerId } = req.params

        try {
            const existCustomer = await customerModel.exists({ _id: new mongoose.Types.ObjectId(customerId) })
            if(!existCustomer) {
                res.status(404).json({ message: 'Customer not found' })
            }

            const existOrder = await orderModel.find({ customerId: new mongoose.Types.ObjectId(customerId) }).lean()
            console.log(existOrder)

            if(!existOrder || existOrder.length === 0) {
                res.status(404).json({ message: `Customer's order not found (${customerId})` })
            } else {
                res.status(200).json(existOrder)
            }
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: err.message })
        }
    }
}

export default customerControllers