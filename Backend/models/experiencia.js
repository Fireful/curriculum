'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JobSchema = Schema({
    id: String,
    logo: String,
    empresa: String,
    inicio: Date,
    fin: { type: Date, default: Date.now },
    puesto: String,
    descripcion: String

});

module.exports = mongoose.model('Experiencia', JobSchema);