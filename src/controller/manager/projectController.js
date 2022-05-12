const { ValidateProject, validateUpdatedProject, validateProjectByMangerId } = require('../../validation/validateProject')
const Project = require('../../../database/models/projectModel')
const Employee = require('../../../database/models/employeeModel')
const logger = require('../../middleware/logger')
const mongoose = require('mongoose')


const getProjectByManager = async (req, res) => {
    try {
        const data = await Project.aggregate([
            {
                $match: {
                    managerId: mongoose.Types.ObjectId(req.managerId)
                }
            },
            {
                $lookup: {
                    from: 'Manager',
                    localField: 'managerId',
                    foreignField: '_id',
                    as: 'record'
                }
            },
            {
                $project: {
                    ProjectName: "$ProjectName",
                    description: "$description",
                    projectStartDate: "$projectStartDate",
                    projectEndDate: "$projectEndDate"
                }
            }
        ])
        if (data && data.length) {
            return res.status(200).send({ data: data })
        }
        return res.status(404).send({ message: "You don't have any project assign" })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error in getting Project' })
    }
}
const deleteProjectById = async (req, res) => {
    const Id = mongoose.Types.ObjectId(req.managerId)
    try {
        const data = await Project.findByIdAndUpdate(req.params.id, {
            $pull: { managerId: Id },
        });
        return res.status(200).send({ data: data })
    }
    catch (error) {
        logger.error(error)
        console.log(error)
        return res.status(504).send({ message: "Technical Error in Deleting Project" })
    }
}
const addProjecttoEmployeeByManager = async (req, res) => {
    try {
        const result_validate = ValidateProject(req.body);
        if (result_validate.error) {
            console.log(result_validate.error)
            return res.status(402).json({
                message: 'Validation error',
                error: result_validate.data
            })
        }
        const pr_title = await Project.findOne({ ProjectName: req.body.ProjectName }).exec();
        if (!pr_title) {
            return res.status(404).send({ message: 'Project Not Found in DB' })
        }
        const employee = await Employee.findById(req.body.employeeId).exec();

        if (pr_title.employeeId.includes(employee._id)) {
            return res.status(402).send({ message: 'You already allocated this project' })
        }
        pr_title.employeeId.push(employee)
        await pr_title.save();
        res.status(200).json({ success: true, data: employee })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error in Adding Project' })
    }
}

const updateProject = async (req, res) => {
    try {
        const result_validate = validateUpdatedProject(req.body);
        if (result_validate.error) {
            return res.status(402).json({
                message: 'Validation error',
                error: result_validate.data
            })
        }
        const result = await Project.updateOne({
            _id: mongoose.Types.ObjectId(req.params.id),
        }, [{ $set: { ProjectName: req.body.ProjectName, description: req.body.description, projectStartDate: req.body.projectStartDate, projectEndDate: req.body.projectEndDate } }])
        return res.status(404).send({ message: "Data Updated Successfully" })
    }
    catch (error) {
        logger.error(error)
        console.log(error)
        return res.status(504).send({ message: "Technical Error in Updating Project" })
    }
}
const getAllProjects = async (req, res) => {
    try {
        const project = await Project.find().exec();
        if (project && project.length) {
            const data = project.map(item => ({ Id: item.id, ProjectName: item.ProjectName }));
            return res.status(200).send({ data: data })
        }
        return res.status(404).send({ message: 'Data Not Found' })
    }
    catch (error) {
        logger.error(error)
        return res.status(500).send({ message: 'Technical error occurs while getting project' })
    }
}
// const getAllEmployeeByManager = async (req, res) => {
//     try {
//         console.log(req.managerId)
//         const data = await Project.aggregate([
//             {
//                 $match: {
//                     managerId: mongoose.Types.ObjectId(req.managerId)
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'employee',
//                     localField: 'employeeId',
//                     foreignField: '_id',
//                     as: 'record'
//                 }
//             },
//             {
//                 $project: {
//                     employeeName: "$record.name"
//                 }
//             }
//         ])
//         if (!data) {
//             return res.status(404).send({ message: "Data Not Found" })
//         }
//         return res.status(200).send({ data: data })
//     }
//     catch (error) {
//         return res.status(500).send({ message: 'Technical error occurs while inserting employeee' })
//     }
//}

const addProject = async (req, res) => {
    try {
        const validate_addpr = validateAddProject(req.body)
        if (validate_addpr.error) {
            return res.status(402).json({
                message: 'Validation error',
                error: result_validate.data
            })
        }
        const pr = await Project.findOne({ ProjectName: req.body.ProjectName }).exec();
        if (Object.keys(pr).length) {
            if (pr.managerId.includes(mongoose.Types.ObjectId(req.managerId))) {
                return res.status(404).send({ message: 'You already have allocated this project' })
            }
            pr.managerId.push(req.managerId);
            await pr.save();
            return res.status(200).send({ data: pr })
        }
        return res.status(404).send({ message: 'Project Not Found' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error In Adding project to manager' })
    }
}
module.exports = {
    deleteProjectById,
    updateProject,
    getAllProjects,
  //  getAllEmployeeByManager,
    addProjecttoEmployeeByManager,
    getProjectByManager,
    addProject
}