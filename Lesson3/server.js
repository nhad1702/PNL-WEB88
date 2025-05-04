import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const app = express()
const PORT = 8080

app.use(express.json())

app.get('/', (req, res) => {
    res.end('Hello world')
})

app.get('/customers', async (req, res) => {
    const endpoint = 'http://localhost:8081/customers'
    const response = await fetch(endpoint)
    const customersData = await response.json()

    res.status(200).json(customersData)
})

app.post('/customers', async (req, res) => {
    const { name, email, age } = req.body
    try {
        const endpoint = 'http://localhost:8081/customers'
        const response = await fetch(endpoint)
        const customerData = await response.json()
        const checkEmail = customerData.find((c) => c.email === email)
    
        const newCustomer = {
            id: uuidv4(),
            name,
            email,
            age
        }

        const newCustomerJson = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const newCustomerData = await newCustomerJson.json()
    
        if (!name || !email || !age) {
            res.status(400).json({ message: 'Missing information: name, email, age' })
        } else if (checkEmail) {
            res.status(409).json({ message: 'Email has been use' })
        } else {
            res.status(201).json({ message: 'New customer added', customer: newCustomerData })
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

app.get('/customers/:customerId', async (req, res) => {
    const { customerId } = req.params
    try {
        const endpoint = `http://localhost:8081/customers/${customerId}`
        const response = await fetch(endpoint)
        const customerData = await response.json()

        if (!response.ok) {
            res.status(404).json({ message: 'Customer not found' })
        } else {
            res.status(200).json(customerData)
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err })
    }
})

app.delete('/customers/:customerId', async (req, res) => {
    const { customerId } = req.params
    try {
        const endpoint = `http://localhost:8081/customers?customerId=${customerId}`
        const response = await fetch(endpoint)
        const customerData = await response.json()
    
        const deleteCustomerJson = await fetch(endpoint, {
            method: 'DELETE',
            body: JSON.stringify(customerData),
            headers: {
                'Content-type': 'application/json'
            }
        })
        if (!response.ok) {
            res.status(404).json({ message: 'Customer not found' })
        } else {
            res.status(200).json({ message: 'Customer deleted successfully' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }

})

app.get('/orders', async (req, res) => {
    const endpoint = 'http://localhost:8081/orders'
    const response = await fetch(endpoint)
    const ordersData = await response.json()

    res.status(200).json(ordersData)
})

app.post('/orders', async (req, res) => {
    const { customerId, productId, quantity } = req.body
    try {
        const OrderEndpoint = 'http://localhost:8081/orders'
        const orderResponse = await fetch(OrderEndpoint)
        const orderData = await orderResponse.json()
        
        const productEndpoint = 'http://localhost:8081/products'
        const productResponse = await fetch(productEndpoint)
        const productData = await productResponse.json()
        const product = productData.find((p) => p.id === productId)

        const customerEndpoint = 'http://localhost:8081/customers'
        const customerResponse = await fetch(customerEndpoint)
        const customerData = await customerResponse.json()
        const customer = customerData.find((c) => c.id === customerId)
        

        const newOrder = {
            orderId: `o0${orderData.length + 1}`,
            customerId,
            productId,
            quantity,
            totalPrice: product.price * quantity
        }

        const newOrderJson = await fetch(OrderEndpoint, {
            method: 'POST',
            body: JSON.stringify(newOrder),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const newOrderData = await newOrderJson.json()

        if (!customerId || !productId || !quantity) {
            res.status(409).json({ message: 'Missing information: customerId, productId, quantity' })
        } else if (productData.quantity < quantity) {
            res.status(400).json({ message: 'Insufficient quantity' })
        } else if (!product) {
            res.status(404).json({ message: 'Product not found' })
        } else if (!customer) {
            res.status(404).json({ message: 'Customer not found' })
        } else {
            res.status(201).json({ message: 'New order placed', order: newOrderData })
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

app.get('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params
    try {
        const endpoint = `http://localhost:8081/orders?orderId=${orderId}`
        const response = await fetch(endpoint)
        const orderData = await response.json()

        if(!response.ok) {
            res.status(404).json({ message: 'Order not found' })
        } else {
            res.status(200).json(orderData)
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' , error: err })
    }
})

app.put('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params
    const { quantity } = req.body
    try {
        const ordersEndpoint = 'http://localhost:8081/orders'
        const ordersResponse = await fetch(ordersEndpoint)
        const orders = await ordersResponse.json()
        const order = orders.find(o => o.orderId === orderId)
        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }

        const productEndpoint = `http://localhost:8081/products/${order.productId}`
        const productResponse = await fetch(productEndpoint)
        if (!productResponse.ok) {
            return res.status(404).json({ message: 'Product not found' })
        }
        const product = await productResponse.json()

        if (product.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient quantity' })
        }

        const updateOrder = {
            ...order,
            quantity: quantity,
            totalPrice: product.price * quantity
        }

        const updateResponse = await fetch(`${ordersEndpoint}/${order.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateOrder)
        })

        if (!updateResponse.ok) {
            return res.status(500).json({ message: 'Failed to update order' })
        }

        const updatedOrder = await updateResponse.json()
        return res.status(200).json({
            message: 'Order updated successfully',
            order: updatedOrder
        })
    } catch (err) {
        console.error('Error:', err)
        return res.status(500).json({ message: 'Internal server error' })
    }
})

app.get('/customers/:customerId/orders', async (req, res) => {
    try{
        const { customerId } = req.params
        const endpoint = `http://localhost:8081/orders?customerId=${customerId}`
        const response = await fetch(endpoint)
        const orderList = await response.json()

        if (orderList.length > 0) {
            res.status(200).json(orderList)
        } else {
            res.status(404).json({ message: `Customer's order not found` })
        }
    } catch (err) {
        res.status(500).json({ message: 'internal server error', error: err })
    }
})

app.get('/orders/highvalue', async (req, res) => {
    try {
        const endpoint = `http://localhost:8081/orders?totalPrice_gte=10000000`
        const response = await fetch(endpoint)
        const highValueFilter = await response.json()

        if (highValueFilter.length > 0) {
            res.status(200).json({highValueFilter})
        } else {
            res.status(404).json({ message: 'No order has the total price over 10000000' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

app.get('/products', async (req, res) => {
    try {
        const endpoint = 'http://localhost:8081/products'
        const response = await fetch(endpoint)
        const productsData = await response.json()

        const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : null
        const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : null

        if (minPrice || maxPrice) {
            const priceFilter = productsData.filter((p) => {
                if (minPrice || maxPrice) {
                    if (minPrice && maxPrice) {
                        return minPrice <= p.price && p.price <= maxPrice
                    } else if (minPrice) {
                        return minPrice <= p.price
                    } else {
                        return p.price <= maxPrice
                    }
                }
            })
            if (priceFilter.length > 0) {
                res.status(200).json(priceFilter)
            } else {
                res.status(200).json(productsData)
            }
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
})