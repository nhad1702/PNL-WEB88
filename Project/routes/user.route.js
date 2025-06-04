import userController from "../controllers/user.controller.js";
import { validateRegister, validateLogin, authUser } from "../middlewares/auth.middleware.js";
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/register', validateRegister, userController.userRegister)
userRouter.post('/login', validateLogin, userController.userLogin)
userRouter.get('/me', authUser, userController.checkUser)
userRouter.get('/', userController.getUser)
userRouter.get('/profile', authUser, userController.getUserProfile)
userRouter.get('/stats', authUser, userController.getUserStats)

export default userRouter