const express = require('express');
const router = express.Router();
const {ValidationEmployeeRegister} = require('../validation/validateEmployee')
const { getTaskByEmployeeId,editTask } = require('../controller/manager/taskController')
const { verifyToken,verifyemployeeToken } = require('../middleware/jwtdecrypt')
const { employeeLogin,employeeRegister,getProjecttoEmployeee,getAllEmployee,getProjectByEmployeeId } = require('../controller/manager/employeeCotroller')
router.post('/employee_register',employeeRegister)
router.post('/login', employeeLogin)
//router.post('/addProject', [verifyToken],addEmployeeProject);
router.post('/editTask/:id', [verifyemployeeToken],editTask);
router.get('/GetLists/AllProject', [verifyemployeeToken], getProjectByEmployeeId)
router.get('/GetProjectById/:id',getProjecttoEmployeee)
router.get('/GetAllEmployee',getAllEmployee)
router.get('/GetTaskByEmployeeId',[verifyemployeeToken],getTaskByEmployeeId)



//router.post('/addemployeestatus',[verifyemployeeToken],addEmployeeStatus)
module.exports = router;