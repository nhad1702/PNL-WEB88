import accountModel from "../models/accounts.model.js"

export const validateRegister = async (req, res) => {
    const { email, password, role } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Missing information' })
}