import userModel from "../models/user.model.js"
import taskModel from "../models/task.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const validateRegister = async (req, res, next) => {
    try {
        const { email, password, confirmPassword, firstName, lastName, DOB, gender } = req.body
        if (!email || !password || !confirmPassword || !firstName || !lastName || !DOB || !gender) return res.status(400).json({ message: 'Missing information' })

        const existEmail = await userModel.findOne({ email })
        if (existEmail) return res.status(400).json({ message: 'Email has been used' })

        const emailRegex = /^\S+@\S+\.\S+$/
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email type' })
        if (!passwordRegex.test(password)) return res.status(400).json({ message: 'Password must be at least 8 characters including uppercase, lowercase, number and a special character' })

        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const validateLogin = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Missing information' })
    try {
        const existEmail = await userModel.findOne({ email })
        if (!existEmail) return res.status(404).json({ message: 'Email not exist' })

        const emailRegex = /^\S+@\S+\.\S+$/
        if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email type' })

        const matchPassword = await bcrypt.compare(password, existEmail.password)
        if (!matchPassword) return res.status(400).json({ message: 'Wrong password. Please try again' })

        req.user = existEmail
        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'No token provied' })

        const token = authHeader.split(' ')[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const existUser = await userModel.findOne({ email: decoded.email })
        if (!existUser) return res.status(401).json({ message: 'Error: Invalid token: User not found' })

        req.user = existUser
        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const authManager = async (req, res, next) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized: User not authenticated' });

        if (req.user.role !== 'manager') return res.status(403).json({ message: `Access denied: Manager's permission only` })

        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const validateTask = async (req, res, next) => {
    try {
        const { userId, content, rank, describe } = req.body
        if (!userId || !content || !rank) return res.status(400).json({ message: 'Missing information' })

        const existUser = await userModel.findOne({ _id: userId }) // Fix userId query
        if (!existUser) return res.status(404).json({ message: 'User not found' })

        req.task = existUser
        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const validateProject = async (req, res, next) => {
    try {
        const { projectName, describe } = req.body;

        if (!projectName) {
            return res.status(400).json({ message: 'Missing project name' });
        }

        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.project = req.user;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const authAdmin = async (req, res, next) => {
    try {
        if (!req.user) return res.status(401).json({ message: 'Unauthorized: User not authenticated' })

        if (req.user.role !== 'admin') return res.status(403).json({ message: `Access denied: Admin's permission only` })

        next()
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const userId = req.user._id;

        const task = await taskModel.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (task.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'Unauthorized: Task does not belong to this user' });
        }

        req.task = task;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};