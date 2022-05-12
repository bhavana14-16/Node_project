const Joi = require('joi')
const validateAddProject = (reqBody) => {
    try {
        ProjectSchema = Joi.object().keys({
            ProjectName: Joi.string().required(),
            description: Joi.string().required(),
            projectStartDate: Joi.date().required(),
            projectEndDate: Joi.date().greater(Joi.ref('projectStartDate')).required(),
        })
        const result = ProjectSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: true }
    }
    catch (error) {
        return { error: true, data: 'Technical Error in validation' }
    }
}
const ValidateProject = (reqBody) => {
    try {
        Schema = Joi.object().keys({
            ProjectName: Joi.string().min(1).required(),
            employeeId: Joi.string().min(1).required()
        })
        const result = Schema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: true }
    }
    catch (error) {
        console.log(error)
        return { error: true, data: 'Technical Error in validation' }
    }
}
const validateUpdateTaskByEmployee = (reqBody) => {
    try {
        TaskSchema = Joi.object().keys({
            taskId: Joi.string().min(1).max(30).required(),
            managerId: Joi.string().min(1).max(30).required(),
            projectId: Joi.string().min(1).max(30).required(),
            status: Joi.string().valid("pending", "in progress", "complete", "approved").optional()
        })
        const result = TaskSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: true }
    }
    catch (error) {
        return { error: true, data: 'Technical Error in validation' }
    }
}
const validateUpdatedProject = (reqBody) => {
    try {
        Schema = Joi.object().keys({
            ProjectName: Joi.string().required(),
            description: Joi.string().required(),
            projectStartDate: Joi.date().required(),
            projectEndDate: Joi.date().greater(Joi.ref('projectStartDate')).required(),
        })
        const result = Schema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: true }
    }
    catch (error) {
        console.log(error)
        return { error: true, data: 'Technical Error in validation' }
    }
}
const ValidationTask = (reqBody) => {
    try {
        TaskSchema = Joi.object().keys({
            projectId: Joi.string().min(1).max(30).required(),
            taskStartDate: Joi.date().required(),
            taskEndDate: Joi.date().greater(Joi.ref('taskStartDate')).required(),
            taskName: Joi.string().required(),
            taskDescription: Joi.string().min(1).max(200).required(),
            employeeId: Joi.string().min(1).max(30).required()
        })
        const result = TaskSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: true }
    }
    catch (error) {
        return { error: true, data: 'Technical Error in validation' }
    }
}
const validateUpdateTaskByManager = (reqBody) => {
    try {
        TaskSchema = Joi.object().keys({
            projectId: Joi.string().min(1).max(30).required(),
            taskDescription: Joi.string().required(),
            taskStartDate: Joi.date().required(),
            taskEndDate: Joi.date().greater(Joi.ref('taskStartDate')).required(),
            taskName: Joi.string().min(1).required(),
            taskDescription: Joi.string().min(1).required()
        })
        const result = TaskSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: true }
    }
    catch (error) {
        console.log(error)
        return { error: true, data: 'Technical Error in validation' }
    }
}
const validateProjectByMangerId = (reqBody) => {
    try {
        Schema = Joi.object().keys({
            ProjectName: Joi.string().required(),
            description: Joi.string().required(),
            projectStartDate: Joi.date().required(),
            projectEndDate: Joi.date().greater(Joi.ref('projectStartDate')).required(),
        })
        const result = Schema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: true }
    }
    catch (error) {
        console.log(error)
        return { error: true, data: 'Technical Error in validation' }
    }
}
const validateManagerByLogin = async (reqBody) => {
    try {
        ManagerLoginSchema = Joi.object().keys({
            email: Joi.string().email().min(1).required(),
            password: Joi.string().min(1).max(10).required()
        })
        const result = ManagerLoginSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: true }
    }
    catch (error) {
        console.log(error)
        return { error: true, data: 'Technical Error in validation' }
    }
}
const validateManagerByRegister = async (reqBody) => {
    try {
        ManagerRegisterSchema = Joi.object().keys({
            name: Joi.string().min(1).max(30).required(),
            email: Joi.string().email().min(1).required(),
            password: Joi.string().min(1).max(10).required()
        })
        const result = ManagerLoginSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: true }
    }
    catch (error) {
        console.log(error)
        return { error: true, data: 'Technical Error in validation' }
    }
}
const validateAddTask = (reqBody)=>{
    try {
        TaskSchema = Joi.object().keys({
            taskDescription: Joi.string().required(),
            taskStartDate: Joi.date().required(),
            taskEndDate: Joi.date().greater(Joi.ref('taskStartDate')).required(),
            taskName: Joi.string().min(1).required(),
        })
        const result = TaskSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: true }
    }
    catch (error) {
        console.log(error)
        return { error: true, data: 'Technical Error in validation' }
    }
}
module.exports = {
    ValidateProject,
    ValidationTask,
    validateUpdatedProject,
    validateUpdateTaskByEmployee,
    validateUpdateTaskByManager,
    validateProjectByMangerId,
    validateManagerByLogin,
    validateManagerByRegister,
    validateAddProject,
    validateAddTask
}