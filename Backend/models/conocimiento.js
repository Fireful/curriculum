'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ConocimientoSchema = Schema({
    concepto: String,
    nivel: Number,
});

module.exports = mongoose.model('conocimientos', ConocimientoSchema);