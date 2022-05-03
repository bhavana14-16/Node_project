const { ValidateProject } = require('../../validation/validateProject')
const Manager = require('../../../database/models/managerModel')
const Project = require('../../../database/models/projectModel')
const mongoose = require('mongoose')
const addProject = async (req, res) => {
    try {
        const result_validate = ValidateProject(req.body);
        if (result_validate.error) {
            return res.status(402).json({
                message: 'Validation error',
                error: result_validate.data
            })
        }
        const project_id = await Manager.aggregate([
            { $match: { email: req.session.user.email } },
            { $project: { _id: '$_id' } }
        ])
        if (!project_id) {
            return res.status(500).send({ message: 'Error in Getting Project' })
        }
        const book = await Project({
            title: req.body.title,
            description: req.body.description,
            businessUnit: req.body.businessUnit,
            managerId: project_id[0]._id
        }).save()
        return res.status(200).send({ massage: 'Project Inserted Successfully' })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error in Adding Project' })
    }
}
const getProjectByManagerId = async (req, res) => {
    console.log(req.session)
    try {
        const Id = mongoose.Types.ObjectId(req.session._id);
        const result = await Project.aggregate([
            {
                $match:{ managerId: Id }
            },
            {
                $project: {
                   title: '$title', description
                        : '$description', businessUnit: '$businessUnit', taskName: '$taskName'
                }
            }
        ])
        if (!result) {
            return res.status(503).send({ message: "Error in getting Project's" })
        }
        return res.status(200).send({ data: result })
    }
    catch (error) {
        console.log('error',error)
        return res.status(504).send({ message: "Technical Error in getting Project" })
    }
}

const deleteProjectById = async (req, res) => {
    try {
        const result = await Project.findByIdAndDelete(req.params.id).exec();
        return res.status(200).send({ message: 'Record Deleted Successfully' })
    }
    catch (error) {
        return res.status(504).send({ message: "Technical Error in Deleting Project" })
    }
}
const updateProject = async (req, res) => {
    try {
        const result = await Project.findByIdAndUpdate(req.params.id, req.body).exec();
        return res.status(200).send({ message: 'Record Updated Successfully' })
    }
    catch (error) {
        return res.status(504).send({ message: "Technical Error in Updating Project" })
    }
}

module.exports = {
    addProject,
    getProjectByManagerId,
    deleteProjectById,
    updateProject,
}