const express = require("express");
const Project = require("../../database/models/project");
// get req function

async function getAllProjects(req, res,next) {
    try {
        const project = await Project.find();
        res.status(200).send(project)
    } catch (e) {
        res.send(e)
    }
}

//post req function

async function addProject(req, res,next) {
    console.log("XXXXX")
        //const product = new Product(req.body);
        let project = new Project({
            title: req.body.title,
            description: req.body.description,
            startdate: req.body.startdate,
            enddate: req.body.enddate,
            businessUnit:req.body.businessUnit,
            managerId:req.body.managerId
        });
       // console.log(req.post.data)
        try{
        const xyz = await project.save();
        res.status(201).send(xyz)
    } catch (e) { res.status(400).send(e); }
}


// get by id
    
    async function getById(req, res, next) {
        Project.findById(req.params.id, function (err, project) {
          if (err)
            return res.status(500).send("There was a problem finding the user.");
          if (!project) return res.status(404).send("No user found.");
          res.status(200).send(project);
        });
      }
    //patch
    
    async function updateProject(req, res, next) {
        Project.findByIdAndUpdate(req.params.id, req.body, (err, project) => {
          if (err) {
            return res.status(500).send("Not Updated");
          }
          res.send(project);
        });
      }

    // delete by id 
    
    
    //app.delete("/product/:id", async (req, res) => {
    
    async function deletebyid(req, res,next) {
        try {
            const delete_project= await Project.findByIdAndDelete(req.params.id)
            if (!req.params.id) {
                return req.status(400).send()
            }
            res.status(200).json({ status: "Delete successfuly" })
        } catch (e) {
            res.status(500).send(e)
        }
    }
    

module.exports = {
    getAllProjects,
    addProject,
    getById,
    deletebyid,
    updateProject
}
