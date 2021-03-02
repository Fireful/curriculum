'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CursoSchema = Schema({
    nombre: String,
    centro: String,
    fecha: Date,
    duracion: String,
    imagen: String
});

module.exports = mongoose.model('cursos', CursoSchema);