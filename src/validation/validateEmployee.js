const Joi = require("joi")

const validationEmployeeLogin = (reqBody) => {
    try {
        EmployeeSchema = Joi.object().keys({
            email: Joi.string().email().min(1).required(),
            password: Joi.string().min(1).max(10).required()
        })
        const result = EmployeeSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: true }
    }
    catch (error) {
        return { error: true, data: null }
    }
}
const ValidateEmployeeProjectByManager = (reqBody) => {
    try {
        ProjectEmployeeSchema = Joi.object().keys({
            projectId: Joi.string().min(1).max(30).required(),
            employeeId: Joi.string().min(1).max(30).required(),
            projectAssignDate:  Joi.string().min(1).max(30).required(),
            projectEndDate:  Joi.string().min(1).max(30).required(),
            projectName: Joi.string().min(1).max(100).required()
        })
        const result = ProjectEmployeeSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: null }
    }
    catch (error) {
        return { error: true, data: null }
    }
}
module.exports = {
    validationEmployeeLogin,
    ValidateEmployeeProjectByManager
}