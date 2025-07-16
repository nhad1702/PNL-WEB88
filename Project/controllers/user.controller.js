import userModel from "../models/user.model.js"
import calculateAge from "../utils/dateOfBirth.util.js"
import { sendResetEmail } from "../utils/resetEmail.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
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
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            console.log("Received email:", email)

            const user = await userModel.findOne({ email: new RegExp(`^${email}$`, 'i') })

            if (!user) {
                console.log("User not found in DB")
                return res.status(404).json({ message: 'User not found' })
            }

            const token = crypto.randomBytes(32).toString('hex')
            const hash = crypto.createHash('sha256').update(token).digest('hex')

            user.resetToken = hash
            user.resetTokenExpiration = Date.now() + 3600000 // 1 hour

            await user.save()

            // const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`
            // await sendResetEmail(user.email, resetLink)

            await sendResetEmail(user.email, token)

            return res.status(200).json({ message: 'Reset email sent successfully' })
        } catch (error) {
            console.error('Forgot Password Error:', error)
            return res.status(500).json({ message: 'Server error. Please try again later.' })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { token } = req.params
            const { password } = req.body

            const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

            const user = await userModel.findOne({
                resetToken: hashedToken,
                resetTokenExpiration: { $gt: Date.now() },
            })

            if (!user) {
                return res.status(400).json({ message: 'Invalid or expired token' })
            }

            user.password = await bcrypt.hash(password, 10)
            user.resetToken = undefined
            user.resetTokenExpiration = undefined
            await user.save()

            res.status(200).json({ message: 'Password reset successful' })
        } catch (error) {
            res.status(500).json({ message: error.message })
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
    // getUserStats: async (req, res) => {
    //     try {
    //         const userStats = await userModel.findOne({ email: req.user.email }).select('stats')
    //         if (!userStats) return res.status(404).json({ message: 'User not found' })
    //         return res.status(200).json(userStats.stats)
    //     } catch (error) {
    //         return res.status(500).json({ message: error.message })
    //     }
    // },
    updateRole: async (req, res) => {
        try {
            const { userId } = req.params
            const { role } = req.body

            if (!userId || !role) return res.status(400).json({ message: 'Missing information' })

            const validRoles = ['employee', 'manager', 'admin']
            if (!validRoles.includes(role)) return res.status(400).json({ message: 'Invalid role' })

            const updatedUser = await userModel.findByIdAndUpdate(userId, { role }, { new: true })
            if (!updatedUser) return res.status(404).json({ message: 'User not found' })

            return res.status(200).json({ message: 'Role updated successfully', user: updatedUser })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params
            if (!userId) return res.status(400).json({ message: 'User ID is required' })

            const deletedUser = await userModel.findByIdAndDelete(userId)
            if (!deletedUser) return res.status(404).json({ message: 'User not found' })

            return res.status(200).json({ message: 'User deleted successfully' })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export default userController