const { ValidationTask, validateUpdateTaskByEmployee, validateUpdateTaskByManager } = require('../../validation/validateProject')
const manager = require('../../../database/models/managerModel')
const mongoose = require('mongoose')
const Employee = require('../../../database/models/employeeModel')
const task = require('../../../database/models/taskModel')
const Project = require('../../../database/models/projectModel')
const logger = require('../../middleware/logger')

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
        const data = await Project.aggregate([
            {
                $match: {
                    managerId: mongoose.Types.ObjectId(req.managerId)
                }
            },
            {
                $lookup: {
                    from: 'tasks',
                    let: { prId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$$prId", "$projectId"],
                                }
                            }
                        },
                    ],
                    as: "record"
                }
            },
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.body.projectId)
                }
            },
            { $set: { "record.taskName": req.body.taskName, "record.taskDescription": req.body.taskDescription, "record.taskStartDate": req.body.taskStartDate, "record.taskEndDate": req.body.taskEndDate } }
        ])
        return res.status(200).send({ data: data })
    }
    catch (error) {
        console.log(error)
        logger.error(error)
        return res.status(500).json({ message: 'Error In Editing Task' })
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
        const tsk_name = await task.findOne({ taskName: req.body.taskName }).exec();
        console.log(tsk_name)
        const project_name = await Project.findById(req.body.projectId).exec();
        console.log(project_name)
        if (tsk_name) {
            if (tsk_name.projectId.includes(project_name._id)) {
                return res.status(404).send({ message: 'You already allocated this task' })
            }
            tsk_name.projectId.push(project_name);
            await tsk_name.save();
            return res.status(200).send({ data : tsk_name})
        }
        return res.status(404).send({ data: 'task not found' })
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
                    let: { prId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$$prId", "$projectId"],
                                }
                            }
                        },
                    ],
                    as: "record"
                }
            },
            {
                $project: {
                    employeeId: "$employeeId",
                    projectId: "$_id",
                    taskId: "$record._id",
                    taskStartDate: "$record.taskStartDate",
                    taskEndDate: "$record.taskEndDate",
                    taskName: "$record.taskName"
                }
            }
        ])
        if (!data && !data.length) {
            return res.status(404).send({ message: "you don't have assign any task to anyone" });
        }
        return res.status(200).send({ data: data })
    }
    catch (error) {
        console.log(error)
        logger.error(error)
        return res.status(500).send({ message: 'Technical error while retrieving employee task' })
    }
}
const getTaskByEmployeeId = async (req, res) => {
    try {
        const data = await Project.aggregate([
            {
                $match: {
                    employeeId: mongoose.Types.ObjectId(req.employeeId),
                }
            },
            {
                $lookup: {
                    from: 'tasks',
                    let: { prId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$$prId", "$projectId"],
                                }
                            }
                        },
                    ],
                    as: "record"
                }
            },
            {
                $project: {
                    managerId: "$managerId",
                    taskId: "$record._id",
                    projectId: "$_id",
                    taskName: "$record.taskName",
                    taskDescription: "$record.taskDescription",
                    taskStartDate: "$record.taskStartDate",
                    taskEndDate: "$record.taskEndDate",
                }
            }
        ])
        const emp_data = data.filter(item => item.taskName.length);
        if(emp_data && emp_data.length)
        {
            return res.status(200).send({ data: emp_data })
        }
        return res.status(402).send({message : 'No Data Found'})
    }
    catch (error) {
        console.log(error)
        logger.error(error)
        return res.status(500).send({ message: 'Technical error while retrieving employee task' })
    }
}
module.exports = {
    addTaskByManager,
    updateTask,
    getTaskByEmployeeId,
    viewTaskByManagerId,
    getAllTask
}