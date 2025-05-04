import productModel from "../Models/product.model.js"

const productControllers = {
    getProducts: async (req, res) => {
        try {
            const product = await productModel.find({})
            console.log(product)
            res.status(200).json(product)
        } catch (err) {
            console.error(err.message)
            res.status(500).json({ message: err.message })
        }
    }
}

export default productControllers