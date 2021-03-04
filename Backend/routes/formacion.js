'use strict'
var express = require('express');
var FormacionController = require('../controllers/formacion');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/formaciones' });

// Rutas de prueba
router.get('/test-de-controlador', FormacionController.test);
router.post('/datos-curso', FormacionController.datosCurso);

// Rutas útiles
router.post('/save', FormacionController.save);
router.get('/formaciones/:last?', FormacionController.getFormaciones);
router.get('/formaciones', FormacionController.getFormaciones);
router.get('/formacion/:id', FormacionController.getFormacion);
router.put('/formacion/:id', FormacionController.update);
router.delete('/formacion/:id', FormacionController.delete);
router.post('/upload-image/:id', md_upload, FormacionController.upload);
router.get('/get-titulo/:imagen', FormacionController.getTitulo);
router.get('/search/:search', FormacionController.search);

module.exports = router;