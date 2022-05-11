const { validationEmployeeLogin, ValidateEmployeeProjectByManager, validateEmployeeStatus, ValidationEmployeeRegister } = require('../../validation/validateEmployee')
const { ValidationTask, validateUpdateTaskByEmployee } = require('../../validation/validateProject')
const Employee = require('../../../database/models/employeeModel')
const TaskSchema = require('../../../database/models/taskModel')
const project = require('../../../database/models/projectModel')
const CustomErrorHandler = require('../../services/CustomErrorHandler');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const logger = require('../../middleware/logger')
const Project = require('../../../database/models/projectModel')
const getAllEmployee = async (req, res) => {
    try {
        const employee = await Employee.find().exec();
        if (employee && employee.length) {
            const data = employee.map(item => ({ Id: item.id, name: item.name }));
            return res.status(200).send({ data: data })
        }
        return res.status(404).send({ message: 'Data Not Found' })
    }
    catch (error) {
        logger.error(error)
        return res.status(500).send({ message: 'Technical error occurs while inserting employeee' })
    }
}
const employeeRegister = async (req, res, next) => {
    try {
        const vldt_email = ValidationEmployeeRegister(req.body)
        if (vldt_email.error) {
            return res.status(502).json({ message: vldt_email.data })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const { name, email, role } = req.body;
        const employee = await Employee.findOne({ email }).select('-createdAt -updatedAt -__v');

        if (employee) {
            return next(CustomErrorHandler.error(500, 'email already exist.'));
        }
        const data = new Employee({ name, email, password: hashedPassword, role });
        const result = await data.save()
        if (result.error) {
            res.status(502).json({
                status: 200,
                message: 'Employee Register Successfully.',
            })
        }
        res.status(200).json({
            status: 200,
            message: 'Employee Register Successfully.',
        });
    } catch (error) {
        return res.status(500).json({
            status: "Failure",
            message: error,
        });
    }
}
const employeeLogin = async (req, res, next) => {
    try {
        const validate_emp = validationEmployeeLogin(req.body);
        if (validate_emp.error) {
            return res.status(502).json({ message: validate_emp.data })
        }
        const { email, password } = req.body;
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return next(CustomErrorHandler.error(500, 'User not found.'));
        }
        const match = await bcrypt.compare(password, employee.password);
        if (match) {
            const { _id, name, email } = employee;
            const payload = {
                user: {
                    Id: _id
                },
            }
            var token = await jwt.sign(payload, JWT_SECRET, { expiresIn: '90d' });
            const role = employee.role;
            employee.token = token;
            res.status(200).json({
                status: "Success",
                message: 'Employee Login Successfully.',
                data: { _id, name, email, token, role }
            });
        } else {
            res.status(500).json({
                status: "Failure",
                message: 'Invalid credentials please try again.',
            });
        }
    }
    catch (error) {
        console.log(error)
        logger.error(error)
        return res.status(500).send({ message: 'Something went wrong please try again later' })
    }
}
const getProjectByEmployeeId = async (req, res) => {
    try {
        console.log(req.employeeId)
        const data = await Project.aggregate([
            {
                $match: {
                    employeeId: mongoose.Types.ObjectId(req.employeeId)
                },
            },
            {
                $lookup: {
                    from: 'project',
                    localField: 'employeeId',
                    foreignField: '_id',
                    as: 'record'
                }
            },
            {
                $project: {
                    ProjectName: "$ProjectName",
                    description: "$description",
                    projectstartDate: "$projectStartDate",
                    projectendDate: "$projectEndDate"
                }
            }
        ])
        if (!data && !data.length) {
            return res.status(404).send({ message: 'Data Not Found' })
        }
        return res.status(200).send({ data: data })
    }
    catch (error) {
        console.log(error)
        logger.error(error)
        return res.status(500).send({ mesage: "Technical Error In Getting Project" })
    }
}
const getProjecttoEmployeee = async (req, res) => {
    try {
        const data = await project.findById(req.params.id).exec();
        if (!data) {
            return res.status(404).send({ mesage: "Data Not Found" })
        }
        return res.status(200).send({ data: data })
    }
    catch (error) {
        logger.error(error)
        return res.status(500).send({ mesage: "Technical Error In Getting Project" })
    }
}
const addEmployeeStatus = async (req, res) => {
    try {
        const valid_status = validateEmployeeStatus(req.body)
        if (valid_status.error) {
            return res.status(502).json({ message: validate_email.data })
        }
        const data = await projectemployee.findOne({ managerId: req.body.managerId, employeeId: req.employeeId, taskId: req.body.taskId, projectId: req.body.projectId })
        console.log(data)
        if (!data) {
            return res.status(404).send({ message: 'Record Not Found' })
        }
        data.status.push(req.body.status);
        console.log(data)
        await data.save();
        return res.status(200).send({ message: 'status moved successfully' })
    }
    catch (error) {
        logger.error(error)
        console.log(error)
        return res.status(500).send({ message: 'Technical error while Adding Status' })
    }
}
const getStatus = (data) => {
    try {
        let data2 = [];
        data.forEach(element => {
            const res1 = element.status;
            const counts = {};
            res1.forEach((x) => {
                counts[x] = (counts[x] || 0) + 1;
            });
            data1 = {
                Id: element._id,
                name: element.name,
                status: counts
            }
            data2.push(data1);
        });
        return data2;
    }
    catch (error) {
        logger.error(error)
        return res.status(500).send({ message: 'Tecnical error in getting status' })
    }
}
const getEmployeeStatusByManagerId = async (req, res) => {
    try {
        const data = await projectemployee.aggregate([
            {
                $match: {
                    managerId: mongoose.Types.ObjectId(req.managerId)
                }
            },
            {
                $lookup: {
                    from: 'employee',
                    localField: 'employeeId',
                    foreignField: '_id',
                    as: 'record'
                }
            },
            {
                $project: {
                    name: "$record.name",
                    status: "$status"
                }
            }
        ])
        const result = getStatus(data)
        if (!result && !result.length) {
            res.status(404).send({ message: 'Data Not Found' })
        }
        res.status(200).send({ data: result })
    }
    catch (error) {
        logger.error(error)
        console.log(error)
        return res.status(500).send({ message: 'Error In getting Employee Status' })
    }
}
module.exports = {
    employeeLogin,
    //  addEmployeeProject,
    // editTask,
    getProjectByEmployeeId,
    getProjecttoEmployeee,
    getAllEmployee,
    addEmployeeStatus,
    getEmployeeStatusByManagerId,
    employeeRegister
} 