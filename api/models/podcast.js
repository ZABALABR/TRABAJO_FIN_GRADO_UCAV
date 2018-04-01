'use strict'

//para poder accceder a la bd
var mongoose = require('mongoose');

// para definir un modelo-schema de la bd
var Schema = mongoose.Schema;


var PodcastSchemma = Schema({
	numero: String,
    descripcion: String,
    duracion: String,
    file: String,   
    programa: { type : Schema.ObjectId, ref: 'Programa'}
});


module.exports = mongoose.model('Podcast', PodcastSchemma); 