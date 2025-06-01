import userController from "../controllers/user.controller.js";
import { validateRegister, validateLogin } from "../middlewares/auth.middleware.js";
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/register', validateRegister, userController.userRegister)
userRouter.post('/login', validateLogin, userController.userLogin)
userRouter.get('/', userController.getUser)

export default userRouter