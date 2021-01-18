'use strict'

//Cargar módulos de node para crear servidor
var express = require('express');
var bodyParser = require('body-parser');
//Ejecutar express
var app = express();

//Cargar ficheros rutas

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//CORS

//Añadir prefijos a rutas

//ruta de prueba
app.get('/datosCurso', (req, res) => {
    return res.status(200).send({
        curso: "Master JS",
        autor: "Javier Casas",
        url: "CVJavierCasas.es"
    });
})

//Exportar módulo (Fichero actual)
module.exports = app;