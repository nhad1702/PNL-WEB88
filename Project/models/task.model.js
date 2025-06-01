import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'users', require: true },
    projectId: { type: mongoose.Types.ObjectId, ref: 'projects', require: true },
    content: { type: String, require: true },
    rank: { type: String, default: 'E', require: true },
    isDone: { type: Boolean, default: false, require: true },
    describe: { type: String, default: '', require: true },
    answer: { type: String, default: '', require: true }
})

const taskModel = mongoose.model('tasks', taskSchema)
export default taskModel