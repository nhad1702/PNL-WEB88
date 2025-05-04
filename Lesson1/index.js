//npx kill-port: Xoa port
//touch <ten file>.*: tao file

import express from 'express'
import { customers, orders, products } from './mockData.js'

const app = express()
const PATH = 8080

app.use(express.json())

app.get('/', (req, res) => {
    res.end('Hello world')
})

app.get('/customers', (req, res) => {
    res.status(200).json(customers)
})

app.post('/customers', (req, res) => {
    const body = req.body
    customers.push(body)
    res.status(200).json({ message: 'Customer added successfully' })
})

app.delete('/customers/:id', (req, res) => {
    const { id } = req.params
    const customer = customers.findIndex((c) => c.id === id)
    customers.splice(customer, 1)
    res.status(200).json({ message: 'Customer deleted successfully' })
})

// app.get('/customers/:id', (req, res) => {
//     const customer = customers.find((c) => c.id === req.params.id)
//     if (customer) {
//         res.status(200).json(customer)
//     } else {
//         res.status(404).json({ message: 'Customer not found' })
//     }
// })

app.get('/customers/:id', (req, res) => {
    const { id } = req.params
    const customer = customers.find((c) => c.id === id)
    
    if (customer) {
        res.status(200).json(customer)
    } else {
        res.status(404).json({ message: 'Customer not found' })
    }
})

app.get('/orders', (req, res) => {
    res.status(200).json(orders)
})

app.get('/customers/:id/orders', (req, res) => {
    const orderList = orders.filter((o) => o.customerId == req.params.id)
    if (orderList.length > 0) {
        res.status(200).json(orderList)
    } else {
        res.status(404).json({ message: `Customer's order not found` })
    }
})

app.get('/orders/highvalue', (req, res) => {
    const highValueOrder = orders.filter((o) => o.totalPrice > 10000000)
    if (highValueOrder.length > 0) {
        res.status(200).json(highValueOrder)
    } else {
        res.status(404).json({ message: 'No order has the total price over 10000000' })
    }
})

app.get('/products', (req, res) => {
    const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : null
    const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : null
    
    if (minPrice || maxPrice) {
        const rangeProductList = products.filter((p) => {
            if (minPrice && maxPrice) {
                return minPrice <= p.price && p.price <= maxPrice
            } else if (minPrice) {
                return minPrice <= p.price
            } else {
                return p.price <= maxPrice
            }
        })
        if (rangeProductList.length > 0) {
            res.status(200).json(rangeProductList)
        } else {
            res.status(404).json({ message: `No products found in this price range` })
        }
    } else {
        res.status(200).json(products)
    }
})

app.listen(PATH, () => {
    console.log(`App is running at port ${PATH}`)
})

// import http from 'http'
// import url from 'url'
// import { customers, orders, products } from './mockData.js'

// const app = http.createServer((req, res) => {
//     const endpoint = req.url
//     const id = endpoint.split('/')[2]
//     const parseUrl = url.parse(endpoint, true)
//     const pathname = parseUrl.pathname

//     const queryParams = parseUrl.query
//     const minPrice = queryParams.minPrice ? parseInt(queryParams.minPrice) : null
//     const maxPrice = queryParams.maxPrice ? parseInt(queryParams.maxPrice) : null

//     switch (pathname) {
//         case '/customers':
//             res.end(JSON.stringify(customers))
//             break

//         case '/customers/' + id:
//             res.end(JSON.stringify(customers.find((c) => c.id == id)))
//             break

//         case '/orders':
//             res.end(JSON.stringify(orders))
//             break

//         case '/customers/' + id + '/orders':
//             const listOrders = orders.filter((o) => o.customerId == id)
//             if (listOrders.length > 0) {
//                 res.end(JSON.stringify(listOrders))
//             } else {
//                 res.end(JSON.stringify({ message: `Customer's order not found` }))
//             }
//             break
        
//         case '/orders/highvalue':
//             const highValueFilter = orders.filter((o) => o.totalPrice > 10000000)
//             if (highValueFilter.length > 0) {
//                 res.end(JSON.stringify(highValueFilter))
//             } else {
//                 res.end(JSON.stringify({ message: 'No order has the total price over 10000000' }))
//             }
//             break

//         case '/products':
//             if (minPrice || maxPrice) {
//                 const productPriceFilter = products.filter((p) => {
//                     if (minPrice && maxPrice) {
//                         return minPrice <= p.price && p.price <= maxPrice
//                     } else if (minPrice) {
//                         return minPrice <= p.price
//                     } else {
//                         return p.price <= maxPrice
//                     }
//                 })
//                 if (productPriceFilter.length > 0) {
//                     res.end(JSON.stringify(productPriceFilter))
//                 }
//             } else {
//                 res.end(JSON.stringify(products))
//             }
//             break

//         default:
//             res.end(JSON.stringify({ message: 'Not found' }))
//             break
//     }
// })
// const PORT = 8000

// app.listen(PORT, () => {
//     console.log(`App is running at port ${PORT}`)
// })


