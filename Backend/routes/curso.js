'use strict'
var express = require('express');
var CursoController = require('../controllers/curso');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/experiencias' });

// Rutas de prueba
router.get('/test-de-controlador', CursoController.test);
router.post('/datos-curso', CursoController.datosCurso);

// Rutas útiles
router.post('/save', CursoController.save);
router.get('/cursos/:last?', CursoController.getJobs);
router.get('/cursos', CursoController.getJobs);
router.get('/curso/:id', CursoController.getJob);
router.put('/curso/:id', CursoController.update);
router.delete('/curso/:id', CursoController.delete);
router.post('/upload-image/:id', md_upload, CursoController.upload);
router.get('/get-cert/:imagen', CursoController.getCert);
router.get('/search/:search', CursoController.search);

module.exports = router;