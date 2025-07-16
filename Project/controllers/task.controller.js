import taskModel from "../models/task.model.js"
import projectModel from "../models/project.model.js"

const taskController = {
    createTask: async (req, res) => {
        const { userId, projectId, content, rank, describe } = req.body

        // Correct validation
        if (!userId || !content || !rank) return res.status(400).json({ message: 'Missing information' })

        const newTask = new taskModel({
            userId,
            projectId: projectId || undefined, // allow optional projectId
            content,
            rank,
            describe
        })

        try {
            const createTask = await newTask.save()
            if (projectId) {
                await projectModel.findByIdAndUpdate(projectId, {
                    $push: { tasks: { task_id: createTask._id } }
                })
            }
            return res.status(201).json({ message: 'Task created successfully', task: createTask })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    getTask: async (req, res) => {
        try {
            const tasks = await taskModel.find({})
            return res.status(200).json(tasks)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    submitTask: async (req, res) => {
        console.log('SubmitTask Request:', req.params, req.body, req.files);
        try {
            const { taskId } = req.params;
            const task = req.task;

            console.log('Request Body:', req.body);
            console.log('Request Files:', req.files);

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'No files uploaded' });
            }

            const files = req.files.map(file => ({
                type: file.mimetype,
                url: file.path,
                originalname: file.originalname,
            }));

            task.submissions.push({
                files,
                submittedAt: new Date(),
            });
            task.isDone = true;

            await task.save();
            return res.status(201).json({ message: 'Task submitted successfully', task, files });
        } catch (error) {
            console.error('SubmitTask Error:', error);
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

export default taskController

