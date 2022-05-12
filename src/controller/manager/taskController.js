const { ValidationTask, validateUpdateTaskByManager,validateAddTask } = require('../../validation/validateProject')
const { validateUpdateTaskByEmployee } = require('../../validation/validateEmployee')
const mongoose = require('mongoose')
const task = require('../../../database/models/taskModel')
const Project = require('../../../database/models/projectModel')
const logger = require('../../middleware/logger')

const editTask = async (req, res) => {
    try {
        const update_task = validateUpdateTaskByEmployee(req.body)
        if (update_task.error) {
            return res.status(402).json({
                message: 'Validation error',
                error: update_task.data
            })
        }
        const data = await task.updateOne({ projectId: mongoose.Types.ObjectId(req.body.projectId), _id: mongoose.Types.ObjectId(req.params.id) }, { $set: { status : req.body.status} })
        return res.status(200).send({ message: 'Data Updated Successfully' })
    }
    catch (error) {
        console.log(error)
        logger.error(error)
        return res.status(500).json({ message: 'Error In Editing Task' })
    }
}

const addTask = async (req, res) => {
    try {
        const valaddtask = validateAddTask(req.body)
        if (valaddtask.error) {
            return res.status(402).json({
                message: 'Validation error',
                error: valaddtask.data
            })
        }
        const task_name = await task.findOne({ taskName: req.body.taskName }).exec();
        if (task_name) {
            res.status(404).send({ message: 'Task already exist in db' });
        }
        await task({
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
            taskStartDate: req.body.taskStartDate,
            taskEndDate: req.body.taskEndDate
        }).save();
        return res.status(200).send({ message: 'Task Added Successfully' })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Technical error in adding task' })
    }
}

const getAllTask = async (req, res) => {
    try {
        const task_list = await task.find().exec();
        if (task_list && task_list.length) {
            const data = task_list.map(item => ({ Id: item._id, name: item.taskName }));
            return res.status(200).send({ data: data })
        }
        return res.status(404).send({ message: 'Task Not Found' })
    }
    catch (error) {
        console.log(error)
        logger.error(error)
        return res.status(500).send({ message: 'Technical error occurs while getting task' })
    }
}
const updateTask = async (req, res) => {
    try {
        const update_task = validateUpdateTaskByManager(req.body)
        if (update_task.error) {
            return res.status(402).json({
                message: 'Validation error',
                error: update_task.data
            })
        }
        const data = await task.updateOne({ projectId: mongoose.Types.ObjectId(req.body.projectId), _id: mongoose.Types.ObjectId(req.params.id) }, { $set: { taskDescription: req.body.taskDescription, taskStartDate: req.body.taskStartDate, taskEndDate: req.body.taskEndDate } })
        return res.status(200).send({ message: 'Data Updated Successfully' })
    }
    catch (error) {
        console.log(error)
        logger.error(error)
        return res.status(500).json({ message: error})
    }
}
const addTaskByManager = async (req, res) => {
    try {
        const validation_task = ValidationTask(req.body)
        if (validation_task.error) {
            return res.status(402).json({
                message: 'Validation error',
                error: validation_task.data
            })
        }
        const data = await task.find({ taskName: req.body.taskName }).exec();
        console.log(data)
        const task_obj = data.find((item) => item.projectId.includes(mongoose.Types.ObjectId(req.body.projectId)))
        if (task_obj) {
            return res.status(404).send({ message: 'you already allocated this task to this project' });
        }
        await task({
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
            taskStartDate: req.body.taskStartDate,
            taskEndDate: req.body.taskEndDate,
            projectId: req.body.projectId,
            employeeId: req.body.employeeId
        }).save();
        return res.status(200).send({ data: data })
    }
    catch (error) {
        console.log(error)
        logger.error(error)
        return res.status(500).send({ maessage: error })
    }
}
const viewTaskByManagerId = async (req, res) => {
    try {
        const data = await Project.aggregate([
            {
                $match: {
                    managerId: mongoose.Types.ObjectId(req.managerId)
                }
            },
            {
                $lookup: {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'projectId',
                    as: "record"
                }
            },
        ])
        return res.status(200).send({ data: data });
    }
    catch (error) {
        console.log(error)
        logger.error(error)
        return res.status(500).send({ message: 'Technical error while retrieving employee task' })
    }
}
const getTaskByEmployeeId = async (req, res) => {
    try {
        const data = await task.aggregate([
            {
                $match: {
                    employeeId: mongoose.Types.ObjectId(req.employeeId)
                }
            }
        ])
        if (data && data.length) {
            return res.status(200).send({ data: data })
        }
        return res.status(404).send({ message: "You don't have any task assign" })
    }
    catch (error) {
        return res.status(500).send({ message: "Technical error while getting task" })
    }
}

module.exports = {
    addTaskByManager,
    updateTask,
    getTaskByEmployeeId,
    viewTaskByManagerId,
    getAllTask,
    addTask,
    editTask
}