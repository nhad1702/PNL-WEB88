import userRouter from "./user.route.js"
import taskRouter from "./task.route.js"
import { Router } from "express"

const rootRouter = Router()

rootRouter.use('/users', userRouter)
rootRouter.use('tasks', taskRouter)

export default rootRouter