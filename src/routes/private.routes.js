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
//renderiza a página de edição de perfil
router.get('/editPerfil', authController.privateAreaEdit);
//renderiza a lista de usuários
router.get('/users', authController.usersList);
//renderiza o usuário clicado
router.get('/users/:id', userController.selectUser)

//logout
router.post('/logout', authController.logout);

//rota para upload de foto
router.post('/upload', upload.single('avatar'), userController.upload);

//rota para cadastro de cargos
router.post('/update', userController.experience);

router.post('/update2', userController.experienceTwo);


module.exports = router