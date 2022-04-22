const express = require("express");
const Employee = require("../../database/models/employee");
// get req function

async function getAllEmployee(req, res,next) {
    try {
        const employee = await Employee.find();
        res.status(200).send(employee)
    } catch (e) {
        res.send(e)
    }
}

//post req function

async function addEmployee(req, res,next) {
    try {
        //const product = new Product(req.body);
        let emp = new Employee({
            name: req.body.name,
            designation: req.body.designation,
            businessUnit: req.body.businessUnit,
            project: req.body.project,
        });
        const xyz = await emp.save();
        res.status(201).send(xyz)
    } catch (e) { res.status(400).send(e); }
}


// get by id
    
    async function getById(req, res, next) {
        Employee.findById(req.params.id, function (err, employee) {
          if (err)
            return res.status(500).send("There was a problem finding the user.");
          if (!employee) return res.status(404).send("No user found.");
          res.status(200).send(employee);
        });
      }
    //patch
    
    async function updateEmployee(req, res, next) {
        Employee.findByIdAndUpdate(req.params.id, req.body, (err, employee) => {
          if (err) {
            return res.status(500).send("Not Updated");
          }
          res.send(employee);
        });
      }

    // delete by id 
    
    
    //app.delete("/product/:id", async (req, res) => {
    
    async function deletebyid(req, res,next) {
        try {
            const delete_employee= await Employee.findByIdAndDelete(req.params.id)
            if (!req.params.id) {
                return req.status(400).send()
            }
            res.status(200).json({ status: "Delete successfuly" })
        } catch (e) {
            res.status(500).send(e)
        }
    }
    

module.exports = {
    getAllEmployee,
    addEmployee,
    getById,
    deletebyid,
    updateEmployee
}
