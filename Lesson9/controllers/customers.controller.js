import customerModel from "../models/customers.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const customerController = {
    customerRegister: async (req, res) => {
        const { name, email, age, password } = req.body
        if (!name | !email | !age | !password) return res.status(400).json({ message: 'Missing information (name, email, age, password)' })
        
        const hashPassword = await bcrypt.hash(password, 10)
        const newCustomer = new customerModel({ name, email, age, password: hashPassword })
        try {
            const createCustomer = await newCustomer.save()
            res.status(201).json({ message: 'Customer registered successfully', customer: createCustomer })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    customerLogin: async (req, res) => {
        try {
            const customer = req.body
            const token = jwt.sign({ id: customer._id, email: customer.email }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION_TIME })
            res.status(200).json({ message: 'Login successfully', customer: { id: customer._id, token: token } })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
}

export default customerController