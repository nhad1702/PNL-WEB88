import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
  projectName: { type: String, required: true },
  describe: { type: String },
  tasks: [
    {
      task_id: { type: mongoose.Types.ObjectId, ref: 'tasks', required: true }
    }
  ]
})


const projectModel = mongoose.model('projects', projectSchema)
export default projectModel