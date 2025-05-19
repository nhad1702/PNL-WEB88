import mongoose from "mongoose"

const managerSchema = {
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    department: { tpye: String, require: true },
    accountId: { type: mongoose.Types.ObjectId, ref: 'accounts' }
}

const managerModel = mongoose.model('managers', managerSchema)
export default managerModel