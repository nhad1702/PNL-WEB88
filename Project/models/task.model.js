import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
    projectId: { type: mongoose.Types.ObjectId, ref: 'projects', default: null },
    content: { type: String, required: true },
    rank: { type: String, default: 'E', required: true },
    isDone: { type: Boolean, default: false, required: true },
    describe: { type: String, default: '' },
    stats: {
        organization_skill: { type: Number, default: 0 },
        technical_skill: { type: Number, default: 0 },
        idea_contribution: { type: Number, default: 0 },
        communication_skill: { type: Number, default: 0 },
        product_optimization: { type: Number, default: 0 },
    },
    submissions: [{
        userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
        files: [{
            type: { type: String, required: true },
            url: { type: String, required: true },
            originalname: { type: String, required: true },
        }],
        submittedAt: { type: Date, default: Date.now },
    }],
});

taskSchema.index({ userId: 1, isDone: 1 }); // Improve query performance
const taskModel = mongoose.model('tasks', taskSchema);
export default taskModel;