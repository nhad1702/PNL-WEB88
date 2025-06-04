import userRouter from "./user.route.js"
import taskRouter from "./task.route.js"
import projectRouter from "./project.route.js"
import { Router } from "express"

const rootRouter = Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/tasks', taskRouter)
rootRouter.use('/projects', projectRouter)

export default rootRouter