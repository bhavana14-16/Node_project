const Joi = require('joi')
const ValidateProject = (reqBody) => {
    try {
        Schema = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            businessUnit: Joi.string().required(),
        })
        const result = Schema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        return { error: false, data: true }
    }
    catch (error) {
        return { error: true, data: 'Technical Error in validation' }
    }
}
const ValidationTask = (reqBody) => {
    try {
        TaskSchema = Joi.object().keys({
            projectId: Joi.string().min(1).max(30).required(),
            employeeId: Joi.string().min(1).max(30).required(),
            taskStartDate: Joi.date().raw().required(),
            taskEndDate: Joi.date().raw().required(),
            taskName: Joi.string().required(),
            status: Joi.string().valid("pending", "in progress", "complete","approved").optional()
        })
        const result = TaskSchema.validate(reqBody)
        if (result.error) {
            return { error: true, data: result.error.details[0].message }
        }
        console.log('no error in validation')
        return { error: false, data: true }
    }
    catch (error) {
        console.log(error)
        return { error: true, data: 'Technical Error in validation' }
    }
}
module.exports = {
    ValidateProject,
    ValidationTask
}