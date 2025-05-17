import productModel from '../models/products.model.js'

const productController = {
    createProduct: async (req, res) => {
        const { name, price, quantity } = req.body
        if (!name || !price || !quantity) return res.status(400).json({ message: 'Missing information (name, price, quantity)' })

        if (price <= 0) return res.status(400).json({ message: 'Price of the product cannot be less or equal than 0' })
        if (quantity <= 0) return res.status(400).json({ message: 'Quantity of the product cannot be less or equal than 0' })

        const newProduct = new productModel({ name, price, quantity })
        try {
            const createProduct = await newProduct.save()
            res.status(201).json({ message: 'Product created successfully', product: createProduct })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    getProduct: async (req, res) => {
        try {
            const products = await productModel.find({})
            res.status(200).json(products)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

export default productController