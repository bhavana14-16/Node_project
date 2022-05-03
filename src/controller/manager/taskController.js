const { ValidationTask } = require('../../validation/validateProject')
const Manager = require('../../../database/models/managerModel')
const mongoose = require('mongoose')
const task = require('../../../database/models/taskModel')
const updateTask = async (req,res)=>{
    try {
        const result = await task.findByIdAndUpdate(req.params.id, req.body).exec();
        return res.status(200).send({ message: 'Task Updated Successfully' })
    }
    catch (error) {
        return res.status(504).send({ message: "Technical Error in Updating Task" })
    }
}
const addTaskByManager = async (req, res) => {
    try {
        const validation_task = ValidationTask(req.body)
        console.log(req.session.user)
        if (validation_task.error) {
            return res.status(402).json({
                message: 'Validation error',
                error: validation_task.data
            })
        }
        await task({
            projectId: req.body.projectId,
            employeeId: req.body.employeeId,
            taskStartDate: req.body.taskStartDate,
            taskEndDate: req.body.taskEndDate,
            taskName: req.body.taskName,
            managerId: req.session.user.Id
        }).save()
        return res.status(200).json({ message: 'Task Added Successfully' })
    }
    catch (error) {
        console.log(error)
        return res.status(507).json({ message: 'Error In Adding Task' })
    }
}

const viewTaskByManagerId = async (req, res) => {
    try {
        console.log(req.session._id)
        const data = await task.aggregate([
            { $match: { managerId: req.session._id } }, {
                $project: {
                    projectId: '$projectId', employeeId: '$employeeId', taskStartDate
                        : '$taskStartDate', taskEndDate: '$taskEndDate', taskName: '$taskName'
                }
            }
        ])
        if (!data) {
            return res.status(507).json({ message: 'Error In Getting Task' }) 
        }
        return res.status(200).json({ data: data})
    }
    catch (error) {
        return res.status(508).json({ message: ' Technical Error In Getting Task' }) 
    }
}
module.exports = {
    addTaskByManager,
    viewTaskByManagerId,
    updateTask
}