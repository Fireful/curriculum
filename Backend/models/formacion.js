'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FormacionSchema = Schema({
    centro: String,
    inicio: Date,
    fin: { type: Date, default: Date.now },
    titulacion: String,
    imagen: String
});

module.exports = mongoose.model('formaciones', FormacionSchema);