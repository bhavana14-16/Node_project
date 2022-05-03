const express = require('express');
const router = express.Router();
const { employeeLogin, addEmployeeProject, editTask, deleteTask } = require('../controller/manager/employeeCotroller')
router.post('/login', employeeLogin)
router.post('/addProject', addEmployeeProject);
router.post('/editTask/:id', editTask);
module.exports = router;