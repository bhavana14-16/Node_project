
const express = require('express');
const router = express.Router();
const { addProject, getProjectByManagerId, deleteProjectById, updateProject } = require('../controller/manager/projectController')
const { addTaskByManager, viewTaskByManagerId } = require('../../src/controller/manager/taskController')
//const auth = require('../middleware/auth');

/* --------------------- Controllers --------------------- */
const {
    authControllers
} = require('../controller/manager');

/* --------------- AUTH ROUTES --------------- */

router.post('/login', authControllers.login);

router.post('/register', authControllers.register);

router.post('/addProject', addProject)

router.get('/GetLists/AllProject', getProjectByManagerId)

router.delete('/deleteProject', deleteProjectById)
router.post('/updateProject', updateProject)
router.post('/addTask', addTaskByManager)
router.get('/viewTaskById', viewTaskByManagerId)
module.exports = router;