'use strict'

//para poder accceder a la bd
var mongoose = require('mongoose');

// para definir un modelo-schema de la bd
var Schema = mongoose.Schema;


var PodcastSchemma = Schema({
	numero: String,
    descripcion: String,
    duracion: String,
    file: Number,   
    program: { type : Schema.ObjectId, ref: Program}
});


module.exports = mongoose.model('Podcast', PodcastSchemma); 