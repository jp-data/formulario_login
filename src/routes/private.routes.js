const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


//renderiza a página restrita
router.get('/restrito', authController.privateArea);

//logout
router.post('/logout', authController.logout);

module.exports = router