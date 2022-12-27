const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const multer = require('multer');
const { storage } = require('../config/upload');


//inicialização do multer com as configurações do storage
const upload = multer({ storage: storage })

//renderiza a página restrita
router.get('/restrito', authController.privateArea);
//renderiza a lista de usuários
router.get('/users', authController.usersList);

//logout
router.post('/logout', authController.logout);

//rota para upload de foto
router.post('/upload', upload.single('avatar'), userController.upload);


module.exports = router