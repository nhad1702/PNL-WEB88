import mongoose from "mongoose"

const employeeSchema = {
    name: { type: String, require: true },
    email: { type: String, require: true },
    phone: { type: String, require: true },
    managerId: { type: mongoose.Types.ObjectId, ref: 'managers' },
    department: { type: String, require: true },
    accountId: { type: mongoose.Types.ObjectId, ref: 'accounts' }
}

const employeeModel = mongoose.model('employees', employeeSchema)
export default employeeModel