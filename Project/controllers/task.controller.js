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
    }
}

export default taskController

