import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
  projectId: { type: mongoose.Types.ObjectId, ref: 'projects', default: null },
  content: { type: String, required: true },
  rank: { type: String, default: 'E', required: true },
  isDone: { type: Boolean, default: false, required: true },
  describe: { type: String, default: '' },
  answer: { type: String, default: '' }
})


const taskModel = mongoose.model('tasks', taskSchema)
export default taskModel