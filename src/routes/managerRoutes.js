
const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');

/* --------------------- Controllers --------------------- */
const {
    authControllers
} = require('../controller/manager');

/* --------------- AUTH ROUTES --------------- */

router.post('/login', authControllers.login);

router.post('/register', authControllers.register);

module.exports = router;