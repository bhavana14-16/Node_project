
//const jwthandler = require('../handler/jwt.handler')
const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController")

router.get("/getAllProjects",projectController.getAllProjects);

router.post("/addProject", projectController.addProject);

router.get("/getById/:id", projectController.getById)

router.patch("/updateProject/:id", projectController.updateProject)

router.delete("/deletebyid/:id", projectController.deletebyid)

module.exports = router;