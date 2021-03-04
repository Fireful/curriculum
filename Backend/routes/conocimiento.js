'use strict'
var express = require('express');
var ConocimientoController = require('../controllers/conocimiento');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/conocimientos' });

// Rutas de prueba
router.get('/test-de-controlador', ConocimientoController.test);
router.post('/datos-curso', ConocimientoController.datosCurso);

// Rutas útiles
router.post('/save', ConocimientoController.save);
router.get('/conocimientos/:last?', ConocimientoController.getConocimientos);
router.get('/conocimientos', ConocimientoController.getConocimientos);
router.get('/conocimiento/:id', ConocimientoController.getConocimiento);
router.put('/conocimiento/:id', ConocimientoController.update);
router.delete('/conocimiento/:id', ConocimientoController.delete);
router.post('/upload-image/:id', md_upload, ConocimientoController.upload);
//router.get('/get-cert/:imagen', CursoController.getCert);
router.get('/search/:search', ConocimientoController.search);

module.exports = router;