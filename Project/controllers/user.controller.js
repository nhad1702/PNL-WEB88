import userModel from "../models/user.model.js"
import calculateAge from "../utils/dateOfBirth.util.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const userController = {
    userRegister: async (req, res) => {
        const { email, password, confirmPassword, firstName, lastName, DOB, gender } = req.body
        if (!email || !password || !firstName || !lastName || !DOB || !gender) return res.status(400).json({ message: 'Missing information' })

        if (password !== confirmPassword) return res.status(400).json({ message: 'Password not match' })

        const dobDate = new Date(DOB);

        // Check for valid date
        if (isNaN(dobDate.getTime())) {
            return res.status(400).json({ message: "Invalid DOB format. Use YYYY-MM-DD" });
        }

        const age = calculateAge(dobDate);
        if (age === null) {
            return res.status(400).json({ message: "Invalid age calculated from DOB" });
        }

        const hashPassword = await bcrypt.hash(password, 10)
        
        const newUser = new userModel({ firstName, lastName, email, password: hashPassword, DOB: dobDate, age, gender })
        try {
            const createUser = await newUser.save()
            return res.status(201).json({ message: 'Registered successfully', user: createUser })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    userLogin: async (req, res) => {
        try {
            const user = req.user
            const token = jwt.sign(
                { 
                    id: user._id, 
                    email: user.email, 
                    role: user.role 
                }, 
                process.env.JWT_SECRET_KEY
            )
            return res.status(200).json({ message: 'Login successfully', user: { email: user.email, role: user.role, token: token } })
        } catch (error) {
            return res.status(500).json({ message: err.message })
        }
    },
    getUser: async (req, res) => {
        try {
            const users = await userModel.find({})
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    checkUser: async (req, res) => {
        return res.status(200).json({ user: req.user })
    },
    getUserProfile: async (req, res) => {
        try {
            const user = await userModel.findOne({ email: req.user.email })
            if (!user) return res.status(404).json({ message: 'User not found' })
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    getUserStats: async (req, res) => {
        try {
            const userStats = await userModel.findOne({ email: req.user.email }).select('stats')
            if (!userStats) return res.status(404).json({ message: 'User not found' })
            return res.status(200).json(userStats.stats)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export default userController