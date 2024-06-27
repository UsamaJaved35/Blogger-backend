// src/routes/userRoutes.js
const express = require('express');
const { registerUser, authUser } = require('../controllers/userController');
const { validateUserRegistration, validateUserLogin } = require('../validators/userValidators');
const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
router.post('/login',validateUserLogin, authUser);

module.exports = router;
