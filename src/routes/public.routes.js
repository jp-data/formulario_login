const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


//página de cadastro
router.get('/', userController.renderRegister);
//rota para cadastrar o usuário
router.post('/cadastro', userController.register);

//página de login
router.get('/login', authController.renderLogin);
router.post('/session', authController.login)

module.exports = router;
