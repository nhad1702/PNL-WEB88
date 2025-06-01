import taskController from "../controllers/task.controller.js"
import { Router } from "express"

const taskRouter = Router()

taskRouter.post('create', taskController.createTask)

export default taskRouter