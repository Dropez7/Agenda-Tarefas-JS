const express = require('express');
const router = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da Home
router.get('/', homeController.index);

// Rotas de Login
router.get('/login/', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.login);
router.get('/login/logout', loginController.logout);

// Rotas de Contato
router.get('/contato/index', loginRequired, contatoController.index); // Adicionando o middleware q so faz entrar se tiver logado
router.post('/contato/register', contatoController.register);
router.get('/contato/index/:id', contatoController.editIndex);

module.exports = router;
