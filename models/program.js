'use strict'

//para poder accceder a la bd
var mongoose = require('mongoose');

// para definir un modelo-schema de la bd
var Schema = mongoose.Schema;


var ProgramSchemma = Schema({
	nombre: String,
    descripcion: String,
    year: Number,   
    imagen: String,
    radiochanel: { type : Schema.ObjectId, ref: RadioChanel}
});


module.exports = mongoose.model('Program', ProgramSchemma); 