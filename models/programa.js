'use strict'

//para poder accceder a la bd
var mongoose = require('mongoose');

// para definir un modelo-schema de la bd
var Schema = mongoose.Schema;


var ProgramaSchemma = Schema({
	nombre: String,
    descripcion: String,
    temporada: Number, //año   
    imagen: String,
    canalradio: { type : Schema.ObjectId, ref: 'CanalRadio'}
});


module.exports = mongoose.model('Programa', ProgramaSchemma); 