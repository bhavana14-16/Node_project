const { ValidateProject } = require('../../validation/validateProject')
const Manager = require('../../../database/models/managerModel')
const Project = require('../../../database/models/projectModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const verifyToken = async (reqHead) => {
    try {
        const decode = await jwt.verify(reqHead, JWT_SECRET)
        if (!decode) {
            return '';
        }
        return decode;
    }
    catch (error) {
        return { error: true, data: null }
    }
}
const addProject = async (req, res) => {
    try {
        const result_validate = ValidateProject(req.body);
        if (result_validate.error) {
            return res.status(402).json({
                message: 'Validation error',
                error: result_validate.data
            })
        }
        const v_token = await verifyToken(req.headers['x-acess-token']);
        if (v_token.error) {
            return res.status(505).send({ message: " Technical Error in generating token" })
        }
        else if (v_token) {
            const pr_title = await Project.find({ title: req.body.title }).exec();
            if (pr_title.length) {
                return res.status(504).json({ message: 'Project Title Already Exist' })
            }
            const project = await Project({
                title: req.body.title,
                description: req.body.description,
                businessUnit: req.body.businessUnit,
                managerId: v_token.user.Id
            }).save()
            return res.status(200).send({ massage: project })
        }
        return res.status(408).json({ message: 'Error in generating token' })
    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'Error in Adding Project' })
    }
}
const getProjectByManagerId = async (req, res) => {
    try {
        const v_token = await verifyToken(req.headers['x-acess-token']);
        if (v_token.error) {
            return res.status(505).send({ message: " Technical Error in generating token" })
        }
        if (v_token) {
            console.log(v_token.user.Id)
            const result = await Project.aggregate([
                {
                    $match: { managerId: v_token.user.Id }
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
        return res.status(504).send({ message: "Error in generating token" })
    }
    catch (error) {
        console.log('error', error)
        return res.status(504).send({ message: "Technical Error in getting Project" })
    }
}

const deleteProjectById = async (req, res) => {
    try {
        console.log('delete')
        const result = await Project.findByIdAndDelete(req.params.id).exec();
        return res.status(200).send({ message: result })
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