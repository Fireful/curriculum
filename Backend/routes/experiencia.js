'use strict'
var express = require('express');
var ExperienciaController = require('../controllers/experiencia');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/experiencias' });

// Rutas de prueba
router.get('/test-de-controlador', ExperienciaController.test);
router.post('/datosCurso', ExperienciaController.datosCurso);

// Rutas útiles
router.post('/save', ExperienciaController.save);
router.get('/jobs/:last?', ExperienciaController.getJobs);
router.get('/job/:id', ExperienciaController.getArticle);
router.put('/job/:id', ExperienciaController.update);
router.delete('/job/:id', ExperienciaController.delete);
router.post('/upload-image/:id', md_upload, ExperienciaController.upload);
router.get('/get-image/:logo', ExperienciaController.getImage);
router.get('/search/:search', ExperienciaController.search);




module.exports = router;