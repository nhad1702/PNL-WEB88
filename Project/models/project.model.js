import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Types.ObjectId, ref: 'users', require: true },
    projectName: { type: String, require: true },
    describe: { type: String, require: true },
    tasks: [
        {
            task_id: { type: mongoose.Types.ObjectId, ref: 'tasks', require: true }
        }
    ]
})

const projectModel = mongoose.model('projects', projectSchema)
export default projectModel