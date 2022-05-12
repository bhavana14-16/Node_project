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
            projectAssignDate: Joi.string().min(1).max(30).required(),
            projectEndDate: Joi.string().min(1).max(30).required(),
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
const validateEmployeeStatus = (reqBody) => {
    try {
        const EmployeeStatusSchema = Joi.object().keys({
            projectId: Joi.string().min(1).max(30).required(),
            employeeId: Joi.string().min(1).max(30).required(),
            managerId: Joi.string().min(1).max(30).required(),
            taskId: Joi.string().min(1).max(30).required(),
            status: Joi.string().min(1).max(20).required()
        })
        const result = EmployeeStatusSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: null }
    }
    catch (error) {
        return { error: true, data: null }
    }
}
const ValidationEmployeeRegister = (reqBody) => {
    try {
        const EmployeeRegisterSchema = Joi.object().keys({
            email: Joi.string().email().min(1).required(),
            password: Joi.string().min(1).max(10).required(),
            name: Joi.string().min(1).required()
        })
        const result = EmployeeRegisterSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: null }
    }
    catch (erro) {
        return { error: true, data: null }
    }
}
const validateUpdateTaskByEmployee = (reqBody)=>{
    try {
        const UpdateStatusSchema = Joi.object().keys({
            projectId: Joi.string().min(1).max(30).required(),
            status: Joi.string().valid('incomplete','pending','complete','inprogress').required()
        })
        const result = UpdateStatusSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: null }
    }
    catch (error) {
        console.log(error)
        return { error: true, data: null }
    }
}
module.exports = {
    validationEmployeeLogin,
    ValidateEmployeeProjectByManager,
    validateEmployeeStatus,
    ValidationEmployeeRegister,
    validateUpdateTaskByEmployee
}