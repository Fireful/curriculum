'use strict'
var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();



// Rutas de prueba
router.get('/test-de-controlador', UserController.test);
router.post('/datos-curso', UserController.datosCurso);

// Rutas útiles

router.post('/user/save', UserController.save);
router.get('/user/login', UserController.login);
router.post('/user/register', UserController.register);
router.get('/users/:last?', UserController.getUsers);
router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getUser);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

module.exports = router;