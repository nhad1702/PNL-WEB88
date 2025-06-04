import projectController from "../controllers/project.controller.js"
import { authUser, authManager, validateProject } from "../middlewares/auth.middleware.js"
import { Router } from "express"

const projectRouter = Router()

projectRouter.post('/create', authUser, authManager, validateProject, projectController.createProject)
projectRouter.get('/', authUser, projectController.getProject)

export default projectRouter