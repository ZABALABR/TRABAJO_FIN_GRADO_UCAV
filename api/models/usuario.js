'use strict'

//para poder accceder a la bd
var mongoose = require('mongoose');

// para definir un modelo-schema de la bd
var Schema = mongoose.Schema;


var UsuarioSchemma = Schema({
	nombre: String,
    apellidos: String,
    email: String,
    password: String,
    rol: String,
    imagen: String
});


module.exports = mongoose.model('Usuario', UsuarioSchemma);

