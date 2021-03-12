'use strict'
var express = require('express');
const app = require('../app');
var UserController = require('../controllers/user_old');

var router = express.Router();

// Rutas de prueba
/* router.get('/test-de-controlador', ConocimientoController.test);
router.post('/datos-curso', ConocimientoController.datosCurso); */

// Rutas útiles
router.get('/', (req, res) => {
    res.send('hello from home');
});
app.use(router);
/*router.post('/save', UserController.register);
router.get('/users/:last?', UserController.getUsers);
router.get('/users', UserController.getUsers);
router.get('/user/:id', UserController.getUser);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete); */

module.exports = router;