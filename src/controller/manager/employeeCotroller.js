const { validationEmployeeLogin, ValidateEmployeeProjectByManager } = require('../../validation/validateEmployee')
const { ValidationTask } = require('../../validation/validateProject')
const Employee = require('../../../database/models/employeeModel')
const projectemployee = require('../../../database/models/projectemployeeModel')
const mongoose = require('mongoose');
const TaskSchema = require('../../../database/models/taskModel')
const employeeLogin = async (req, res) => {
    try {
        const validate_result = validationEmployeeLogin(req.body);
        if (validate_result.error) {
            return res.status(402).json({
                message: 'Validation error',
                error: validate_result.data
            })
        }
        const employee_login = await Employee.find({ email: req.body.email, password: req.body.password }).exec();
        if (!employee_login.length) {
            return res.status(510).json({ message: 'email or password is incorrect' });
        }
        return res.status(200).json({ message: 'Login Successful' });
    }
    catch (error) {
        return res.status(506).json({ message: 'Technical error while Logging' })
    }
}
const addEmployeeProject = async (req, res) => {
    try {
        const validate_prj = ValidateEmployeeProjectByManager(req.body);
        if (validate_prj.error) {
            return res.status(502).json({ message: validate_prj.data })
        }
        console.log(req.session)
        const result = await projectemployee({
            projectId: req.body.projectId,
            employeeId: req.body.employeeId,
            projectAssignDate: req.body.projectAssignDate,
            projectEndDate: req.body.projectEndDate,
            projectName: req.body.projectName,
            managerId: req.session.user.Id
        }).save()
        return res.status(200).json({ message: 'Project Added Successfully' })
    }
    catch (error) {
        console.log(error)
        return res.status(408).json({ message: 'Error In Adding Project to Employeee' })
    }
}

const editTask = async(req,res)=>{
    try {
        const validation_task = ValidationTask(req.body)
        if (validation_task.error) {
            return res.status(402).json({
                message: 'Validation error',
                error: validation_task.data
            })
        }
        const result = await TaskSchema.findByIdAndUpdate(req.params.id, req.body).exec();
        if(!result){
            console.log("Error in updating Task")
        }
        return res.status(200).send({ message: 'Task Updated Successfully' })
        
    }
    catch (error) {
        return res.status(504).send({ message: "Technical Error in Updating Task" })
    }
}

module.exports = {
    employeeLogin,
    addEmployeeProject,
    editTask,
}