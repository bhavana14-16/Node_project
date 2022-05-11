const express = require('express');
const router = express.Router();
const { getEmployeeStatusByManagerId } = require('../controller/manager/employeeCotroller')
const { getProjectByManager, addProject, deleteProjectById, updateProject, getAllProjects, getAllEmployeeByManager, getEmployeeByProject,addProjecttoEmployeeByManager } = require('../controller/manager/projectController')
const { addTaskByManager, viewTaskByManagerId, updateTask,getAllTask } = require('../../src/controller/manager/taskController')
const { verifyToken } = require('../middleware/jwtdecrypt')

//const auth = require('../middleware/auth');

/* --------------------- Controllers --------------------- */
const {
    authControllers
} = require('../controller/manager');

/* --------------- AUTH ROUTES --------------- */

router.post('/login', authControllers.login);
router.post('/register', authControllers.register);
router.post('/addProject',[verifyToken],addProject)
router.get('/getList/AllProject',[verifyToken],getProjectByManager)
router.delete('/deleteProject/:id', [verifyToken], deleteProjectById)
router.post('/addProjectByManagertoEmployee',[verifyToken],addProjecttoEmployeeByManager)
router.post('/updateProject/:id', updateProject)
router.get('/getEmployeeByManagerId',[verifyToken],getAllEmployeeByManager)
router.get('/getEmployeeByProject/:id', getEmployeeByProject)
router.post('/addTask', [verifyToken], addTaskByManager)
router.get('/viewTaskByManagerId', [verifyToken], viewTaskByManagerId)
router.get('/getAllTask',getAllTask)
router.post('/updateTaskByManager/:id', [verifyToken], updateTask)



router.get('/getAllProjects', getAllProjects)
router.get('/getEmployee', getAllEmployeeByManager)

router.get('/getEmployeeStatusByManagerId', [verifyToken], getEmployeeStatusByManagerId)

module.exports = router;