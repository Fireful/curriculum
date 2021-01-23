'use strict'
const { use } = require("../app");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ExperienciaSchema = Schema({
    inicio: Date,
    fin: { type: Date, default: Date.now },
    logo: String,
    empresa: String,
    puesto: String,
    contenido: String

});

module.exports = mongoose.model('Experiencia', ExperienciaSchema);


