import customerModel from "../models/customers.model.js"
import productModel from "../models/products.model.js"
import orderModel from "../models/orders.model.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const validateCustomer = async (req, res, next) => {
    try {
        const { name, email, age, password } = req.body
        if (!name || !email || !age || !password) return res.status(400).json({ message: 'Missing information (name, email, age, password)' })

        const existEmail = await customerModel.findOne({ email })
        if (existEmail) return res.status(400).json({ message: 'Email has been registered' })

        const emailRegex = /^\S+@\S+\.\S+$/
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

        if(!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email type' })
        if(!passwordRegex.test(password)) return res.status(400).json({ message: 'Password must be at least 8 characters including uppercase, lowercase, number and a special character' })
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const authLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ message: 'Missing information (email, password)' })
    
        const findEmail = await customerModel.findOne({ email })
        if (!findEmail) return res.status(404).json({ message: 'Email not found' })

        const emailRegex = /^\S+@\S+\.\S+$/
        if(!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email type' })
            
        const matchPassword = bcrypt.compare(password, findEmail.password)
        if (!matchPassword) return res.status(401).json({ message: 'Invatlid password' })

        req.customer = findEmail
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const authCustomer = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'No token provided' })

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const existCustomer = await customerModel.findOne({ email: decoded.email })
        if (!existCustomer) return res.status(401).json({ message: 'Invalid token: User not found' })

        req.customer = existCustomer
        next()
    } catch (error) {
        return res.status(500).json({ message: err.message })
    }
}

export const validateOrder = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body
        if (!productId || !quantity) return res.status(400).json({ message: 'Missing information (customerId, productId, quantity)' })

        // const existCustomer = await customerModel.findOne({ customerId })
        // if (!existCustomer) return res.status(404).json({ message: 'Customer not found' })

        const customerId = req.customer?._id
        if (!customerId) return res.status(401).json({ message: 'Unauthorized: Customer not found in request' })

        const existProduct = await productModel.findById(productId)
        if (!existProduct) return res.status(404).json({ message: 'Product not found' })

        if (quantity <= 0) return res.status(400).json({ message: 'You cannot place order' })
        if (quantity > existProduct.quantity) return res.status(400).json({ message: 'Insufficient quantity' })

        if (!req.customer || !req.customer._id) return res.status(401).json({ message: "Unauthorized: customer not found in request" })
        
        req.product = existProduct
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const validateUpdateOrder = async (req, res, next) => {
    try {
        const { id: orderId } = req.params;
        const { productId, quantity } = req.body;

        const customerId = req.customer?._id;
        if (!customerId) return res.status(401).json({ message: 'Unauthorized: Customer not found in request' });

        const existOrder = await orderModel.findById(orderId);
        if (!existOrder) return res.status(404).json({ message: `Customer's order not found` });

        // 🔐 Ensure the customer owns the order
        if (String(existOrder.customerId) !== String(customerId)) {
            return res.status(403).json({ message: 'Forbidden: You do not own this order' });
        }

        const existProduct = await productModel.findById(productId);
        if (!existProduct) return res.status(404).json({ message: 'Product not found' });

        if (quantity <= 0) return res.status(400).json({ message: 'Quantity must be greater than 0' });
        if (quantity > existProduct.quantity) return res.status(400).json({ message: 'Insufficient product quantity' });

        req.order = existOrder;
        req.product = existProduct;

        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
