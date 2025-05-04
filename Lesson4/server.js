import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
// import userModel from './models/user.model.js'
import customerModel from './models/customer.model.js'
import orderModel from './models/order.model.js'
import productModel from './models/product.model.js'

const app = express()
const PORT = 8080

app.use(express.json())

//Connect to MongoDB
const mongoDBConnect = async () => {
    try {
        // const URL = `mongodb+srv://anhducnh:nhad1702@cluster0.nxsf6yt.mongodb.net/Lesson4`
        const URL = process.env.MONGO_URL
        await mongoose.connect(URL)
        console.log('MongoDB Database connected')
    } catch (err) {
        console.log("Database error: ", err)
        process.exit()
    }
}

// app.get('/users', async (req, res) => {
//     try {
//         const users = await userModel.find()
//         res.status(200).json(users)
//     } catch (err) {
//         console.error('Get failed: ', err.mesage )
//         res.status(400).json({ mesage: err.mesage })
//     }
// })

// app.get('/users/:id', async (req, res) => {
//     const userId = req.params.id

//     try {
//         const user = await userModel.findById(userId)

//         if (!user) {
//             res.status(404).json({ message: 'User not found' })
//         } else {
//             res.status(200).json(user)
//         }
//     } catch (err) {
//         console.error('Get failed: ', err.mesage )
//         res.status(400).json({ mesage: err.mesage })
//     }
// })

// app.post('/users', async (req, res) => {
//     const { userName, email, fullName, address, gender } = req.body

//     const user = new userModel({
//         userName,
//         email,
//         fullName,
//         address,
//         gender
//     })

//     try {
//         const createUser = await user.save()
//         res.status(201).json({ message: 'User created', user: createUser })
//     } catch (err) {
//         console.error('Cannot crate user: ', err?.message)
//         res.status(404).json({ mesage: err.mesage })
//     }
// })

app.get('/customers', async (req, res) => {
    try {
        const customers = await customerModel.find({})
        console.log(customers)
        res.status(200).json(customers)
    } catch (err) {
        console.error('Error: ', err.message)
        res.status(400).json({ message: err.message })
    }
})

app.get('/customers/:id', async (req, res) => {
    const id = req.params.id

    try {
        const customer = await customerModel.findById(id)

        if (!customer) {
            res.status(404).json({ message: 'Customer not found' })
        } else {
            res.status(200).json(customer)
        }
    } catch (err) {
        console.error('Error: ', err.message)
        res.status(400).json({ message: err.message })
    }
})

app.get('/customers/:id/orders', async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({ message: 'Invalid customer ID' })
    }

    try {
        const order = await orderModel.find({ customerId: id }).lean()

        if (!order || order.length === 0) {
            res.status(404).json({ message: 'Order not found' })
        }
        res.status(200).json(order)
    } catch (err) {
        console.error('Error: ', err.message)
        res.status(400).json({ message: err.message })
    }
})

app.post('/customers', async (req, res) => {
    const { name, email, age } = req.body
    const customer = new customerModel({
        name,
        email,
        age
    })
    
    try {
        const createCustomer = await customer.save()
        if (!name || !email || !age) {
            res.status(401).json({ message: 'Missing information: name, email, age' })
        } else {
            res.status(201).json({ message: 'Customer added successfully', customer: createCustomer })
        }
    } catch (err) {
        console.error('Error: ', err.message)
        res.status(400).json({ message: err.message })
    }
})

app.get('/orders', async (req, res) => {
    try {
        const orders = await orderModel.find({})
        // console.log(orders)
        res.status(200).json(orders)
    } catch (err) {
        console.error('Error: ', err.message)
        res.status(400).json({ message: err.message })
    }
})

app.get('/products', async(req ,res) => {
    try {
        const products = await productModel.find({})
        console.log(products)
        res.status(200).json(products)
    } catch (err) {
        console.error('Error: ', err.message)
        res.status(400).json({ message: err.message })
    }
})

//Start server
const runServer = async () => {
    await mongoDBConnect()
    app.listen(PORT, () => {
        console.log(`Server is running in port ${PORT}`)
    })
}

runServer()