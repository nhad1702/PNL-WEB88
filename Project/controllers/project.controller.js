import projectModel from "../models/project.model.js"

const projectController = {
    createProject: async (req, res) => {
        try {
            const { projectName, describe } = req.body;

            if (!projectName) {
                return res.status(400).json({ message: 'Missing project name' });
            }

            const newProject = new projectModel({
                ownerId: req.user._id,
                projectName,
                describe: describe || '',
            });

            const savedProject = await newProject.save();
            return res.status(201).json({ message: 'Project created successfully', project: savedProject });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    getProject: async (req, res) => {
        try {
            const projects = await projectModel.find({})
            return res.status(200).json(projects)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export default projectController