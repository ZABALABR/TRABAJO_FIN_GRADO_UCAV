'use strict'

//para poder accceder a la bd
var mongoose = require('mongoose');

// para definir un modelo-schema de la bd
var Schema = mongoose.Schema;


var canalRadioSchemma = Schema({
	nombre: String,
    descripcion: String,
    
    imagen: String
});


module.exports = mongoose.model('CanalRadio', canalRadioSchemma);

