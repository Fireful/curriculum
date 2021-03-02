'use strict'

//Cargar módulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');
//Ejecutar express
var app = express();

//Cargar ficheros rutas
var experiencia_routes = require('./routes/experiencia');
var formacion_routes = require('./routes/formacion');
var curso_routes = require('./routes/curso');

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Añadir prefijos a rutas / cargar rutas
app.use('/api', experiencia_routes);
app.use('/api', formacion_routes);
app.use('/api', curso_routes);



//Exportar módulo (Fichero actual)
module.exports = app;