import userController from "../controllers/user.controller.js";
import { validateRegister, validateLogin, authUser, authAdmin } from "../middlewares/auth.middleware.js";
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/register', validateRegister, userController.userRegister)
userRouter.post('/login', validateLogin, userController.userLogin)
userRouter.post('/forgot-password', userController.forgotPassword)
userRouter.post('/reset-password/:token', userController.resetPassword)
userRouter.get('/', authUser, userController.getUser)
userRouter.get('/me', authUser, userController.checkUser)
userRouter.get('/profile', authUser, userController.getUserProfile)
// userRouter.get('/stats', authUser, userController.getUserStats)
userRouter.put('/change-role/:userId', authUser, authAdmin, userController.updateRole)
userRouter.delete('/delete/:userId', authUser, authAdmin, userController.deleteUser)

export default userRouter