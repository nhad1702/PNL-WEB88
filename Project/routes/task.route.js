import { Router } from 'express';
import taskController from '../controllers/task.controller.js';
import { authUser, validateTask } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/cloudinary.middleware.js';

const taskRouter = Router();

taskRouter.post('/create', authUser, validateTask, taskController.createTask);
taskRouter.get('/', authUser, taskController.getTask);
taskRouter.get('/:taskId', authUser, taskController.getTask);
taskRouter.post('/:taskId/submit', authUser, upload.array('task-uploads', 10), taskController.submitTask);

export default taskRouter;