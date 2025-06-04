import taskController from "../controllers/task.controller.js"
import { authUser, validateTask, authManager } from "../middlewares/auth.middleware.js"
import { Router } from "express"

const taskRouter = Router()

taskRouter.post('/create', authUser, authManager, validateTask, taskController.createTask)
taskRouter.get('/', authUser, taskController.getTask)

export default taskRouter