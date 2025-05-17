import orderModel from '../models/orders.model.js'
import productModel from '../models/products.model.js'

const orderController = {
    createOrder: async (req, res) => {
        const product = req.product
        const { productId, quantity } = req.body
        if (!productId || !quantity) return res.status(400).json({ message: 'Missing information (customerId, productId, quantity)' })

        // const customerId = req.customer?._id
        // if (!customerId) return res.status(401).json({ message: 'Unauthorized: Customer not found in request' })

        // const existProduct = await productModel.findById(productId)
        // if (!existProduct) return res.status(404).json({ message: 'Product not found' })
        
        // if (quantity > existProduct.quantity) return res.status(400).json({ message: 'Insufficient quantity' })

        try {
            const newOrder = new orderModel({ customerId, productId, quantity, totalPrice: existProduct.price * quantity })
            const createOrder = await newOrder.save()

            product.quantity -= quantity
            await product.save()
            res.status(201).json({ message: 'Order placed successfully', order: createOrder })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    getOrder: async (req, res) => {
        try {
            const customerId = req.customer._id
            const existOrder = await orderModel.find({ customerId }).populate('productId')
            if (existOrder.length === 0) return res.status(404).json({ message: `Customer's order not found` })
            res.status(200).json(existOrder)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    updateOrder: async (req, res) => {
        const order = req.order
        const product = req.product
        const { productId, quantity } = req.body
        try {
            order.productId = productId || order.productId
            order.quantity = quantity || order.quantity
            order.totalPrice = product.price * quantity
            const updatedOrder = await order.save()

            product.quantity -= quantity
            await product.save()
            res.status(200).json({ message: 'Order updated successfully', order: updatedOrder })
        } catch (error) {
            return res.status(500).json({ message: err.message })
        }
    },
    deleteOrder: async (req, res) => {
    try {
        const { id: orderId } = req.params;
        const customerId = req.customer._id;

        const order = await orderModel.findById(orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Check if the customer owns the order
        if (String(order.customerId) !== String(customerId)) {
            return res.status(403).json({ message: 'Forbidden: You do not own this order' });
        }

        // Optional: Restock the product quantity if needed
        const product = await productModel.findById(order.productId);
        if (product) {
            product.quantity += order.quantity;
            await product.save();
        }

        await orderModel.findByIdAndDelete(orderId);

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
}

export default orderController