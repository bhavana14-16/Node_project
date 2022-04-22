
//const jwthandler = require('../handler/jwt.handler')
const express = require("express");
const router = express.Router();
const employeeControllers = require("../controller/empolyeeController")

router.get("/getallemployee",employeeControllers.getAllEmployee);

router.post("/addemployee", employeeControllers.addEmployee);

router.get("/getById/:id", employeeControllers.getById)

router.patch("/updateEmployee/:id", employeeControllers.updateEmployee)

router.delete("/deletebyid/:id", employeeControllers.deletebyid)

module.exports = router;