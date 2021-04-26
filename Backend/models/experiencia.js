'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var JobSchema = Schema({
    logo: String,
    empresa: String,
    inicio: Date,
    fin: { type: Date, default: Date.now },
    actualmente: Boolean,
    puesto: String,
    descripcion: String

});

module.exports = mongoose.model('jobs', JobSchema);