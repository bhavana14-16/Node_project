const express = require("express");
const Employee = require("../../database/models/employee");
// get req function

async function getAllProject(req, res,next) {
    try {
        const employee = await Employee.find();
        res.status(200).send(employee)
    } catch (e) {
        res.send(e)
    }
}

//post req function

async function addProject(req, res,next) {
    try {
        //const product = new Product(req.body);
        let Manager = new Project({
            name: req.body.name,
            designation: req.body.designation,
            businessUnit: req.body.businessUnit,
            project: req.body.project,
        });
        const xyz = await Manager.save();
        res.status(201).send(xyz)
    } catch (e) { res.status(400).send(e); }
}

module.exports = {
    getAllEmployee,
    addEmployee,
    // getById,
    // deletebyid,
    // updateEmployee
}
