'use strict'

//para poder accceder a la bd
var mongoose = require('mongoose');

// para definir un modelo-schema de la bd
var Schema = mongoose.Schema;


var UserSchemma = Schema({
	nombre: String,
    apellidos: String,
    email: String,
    password: String,
    role: String,
    imagen: String
});


module.exports = mongoose.model('User', UserSchemma);

