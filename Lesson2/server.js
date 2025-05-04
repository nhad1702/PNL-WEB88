import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { customers, orders, products } from './mockData.js'

const app = express()
const PORT = 3001

app.use(express.json())

app.get('/customers', (req, res) => {
    res.status(200).json(customers)
})

app.post('/customers', (req, res) => {
    const { name, email, age } = req.body
    const existEmail = customers.find((c) => c.email === email)
    const newCustomer = {
        id: uuidv4(),
        name,
        email,
        age
    }
    
    if(!name || !email || !age) {
        res.status(403).json({ message: 'Missing information (id, name, email, age)' })
    } else if (existEmail) {
        res.status(409).json({ message: 'Email has been use' })
    } else {
        res.status(200).json({ message: 'Customer added successfully', customer: newCustomer })
    }

    customers.push(newCustomer)
})

app.get('/customers/:id', (req, res) => {
    const { id } = req.params
    const customer = customers.find((c) => c.id === id)
    // const customer = customers.find((c) => c.id === req.params.id)
    
    if (customer) {
        res.status(200).json(customer)
    } else {
        res.status(404).json({ message: 'Customer not found' })
    }
})

app.delete('/customers/:id', (req, res) => {
    const { id } = req.params
    const existCustomer = customers.findIndex((c) => c.id === id)
    if (existCustomer === -1) {
        res.status(404).json({ message: 'No customer found' })
    } else {
        customers.splice(existCustomer, 1)
        res.status(200).json({ message: 'Customer deleted successfully' })
    }
})

app.get('/customers/:id/orders', (req, res) => {
    const { id } = req.params
    const orderList = orders.filter((o) => o.customerId === id)
    if (orderList.length > 0) {
        res.status(200).json(orderList)
    } else {
        res.status(402).json({ message: `Customer's order not found` })
    }
})

app.get('/orders', (req, res) => {
    res.status(200).json(orders)
})

app.get('/orders/:orderId', (req, res) => {
    const { orderId } = req.params
    const order = orders.find((o) => o.orderId === orderId)
    if (order === -1) {
        res.status(404).json({ message: 'Order not found' })
    } else {
        res.status(200).json(order)
    }
})

app.post('/orders', (req, res) => {
    const { customerId, productId, quantity } = req.body
    const product = products.find((p) => p.id === productId)
    const customer = customers.find((c) => c.id === customerId)
    const newOrder = {
        orderId: `o0${orders.length + 1}`,
        customerId,
        productId,
        quantity,
        totalPrice: product.price * quantity
    }
    orders.push(newOrder)

    if (!customerId || !productId || !quantity) {
        res.status(403).json({ message: 'Missing information (customerId, productId, quantity)' })
    } else if (product.quantity < quantity) {
        res.status(400).json({ message: 'Insufficient quantity' })
    } else if (!product) {
        res.status(404).json({ message: 'Product not found' })
    } else if (!customer) {
        res.status.json({ messag: 'Customer not found' })
    } else {
        res.status(200).json({ message: 'Order placed', order: newOrder })
    }
})

app.put('/orders/:orderId', (req, res) => {
    const { quantity } = req.body
    const { orderId } = req.params 
    const existOrder = orders.findIndex((o) => o.orderId === orderId)
    const currentOrder = orders[existOrder]
    const product = products.find((p) => p.id === currentOrder.productId)

    if (existOrder === -1) {
        res.status(404).json({ message: 'Order not found' })
    } else if (!product) {
        res.status(404).json({ message: 'Product not found' })
    } else if (product.quantity < quantity) {
        res.status(409).json({ message: 'insufficient quantity' })
    } else {
        const updateOrder = {
            ...currentOrder,
            quantity: quantity,
            totalPrice: product.price * quantity
        }
        orders[existOrder] = updateOrder
        res.status(200).json({ message: 'Order updated successfully', order: updateOrder })
    }
})

app.get('/orders/highvalue', (req, res) => {
    const highValueOrderList = orders.filter((o) => o.totalPrice > 10000000)
    if (highValueOrderList.length > 0) {
        res.status(200).json(highValueOrderList)
    } else {
        res.status(400).json({ message: 'There is no order that higher than 10000000' })
    }
})

app.get('/products', (req, res) => {
    const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : null
    const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : null

    if (minPrice || maxPrice) {
        const rangePriceProduct = products.filter((p) => {
            if (minPrice && maxPrice) {
                return minPrice <= p.price && p.price <= maxPrice
            } else if (minPrice) {
                return minPrice <= p.price
            } else {
                return p.price <= maxPrice
            }
        })

        if (rangePriceProduct.length > 0) {
            res.status(200).json(rangePriceProduct)
        }
    } else {
        res.status(200).json(products)
    }
})



app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})