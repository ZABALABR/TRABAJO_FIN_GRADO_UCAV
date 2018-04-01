'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Canal = require('../models/canalRadio');
var Programa = require('../models/programa');
var Podcast = require('../models/podcast');

function getPodcast(req, res){

	/*res.status(200).send({message: 'prueba getPodcast.....'});*/

	
	var podcastId = req.params.id;

	Podcast.findById(podcastId).populate({path: 'programa'}).exec((err, podcast) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!podcast){
				res.status(404).send({message: 'El podcast de radio no existe'});
			}else{
				res.status(200).send({podcast});
			}
		}
	});
	
}


function guardarPodcast(req, res){
	var podcast = new Podcast();

	var params = req.body;
	podcast.numero = params.numero;
	podcast.descripcion  = params.descripcion;
	podcast.duracion = params.duracion;
	podcast.file = null;
	podcast.programa = params.programa;

	podcast.save((err, podcastStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor al guardar el podcast'});
		}else{
			if(!podcastStored){
				res.status(404).send({message: 'No se ha guardado el podcast'});
			}else{
				res.status(200).send({podcast: podcastStored});
			}
		}
	});
}




function listarPodcast(req, res){
	var programaId = req.params.programa;

	if(!programaId){
		var find = Podcast.find({}).sort('numero');
	}else{
		var find = Podcast.find({programa: programaId}).sort('numero');
	}
    
	find.populate({
		path: 'programa',
		populate: {
			path: 'canalradio',
			model: 'CanalRadio'
		}
	}).exec(function(err, podcasts){
		if(err){
			console.log(err);
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!podcasts){
				res.status(404).send({message: 'No hay podcasts en la BD.'});
			}else{
				res.status(200).send({podcasts});
			}
		}
	});
}


function actualizarPodcast(req, res){
	var podcastId = req.params.id;
	var update = req.body;

	Podcast.findByIdAndUpdate(podcastId, update, (err, podcastUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!podcastUpdated){
				res.status(404).send({message: 'No se ha actualizado la canción'});
			}else{
				res.status(200).send({podcast: podcastUpdated});
			}
		}
	});
}

function borrarPodcast(req, res){
	var podcastId = req.params.id;
	
	Podcast.findByIdAndRemove(podcastId, (err, podcastRemoved) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!podcastRemoved){
				res.status(404).send({message: 'No se ha borrado el podcast'});
			}else{
				res.status(200).send({podcast: podcastRemoved});
			}
		}
	});
}








function subirFicheroPodcast(req, res){
	var podcastId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.file.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'mp3' || file_ext == 'ogg'){

			Podcast.findByIdAndUpdate(podcastId, {file: file_name}, (err, podcastUpdated) => {
				if(!podcastUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el podcasts'});
				}else{
					res.status(200).send({podcast: podcastUpdated});
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(200).send({message: 'No subido el fichero de podcast...'});
	}
}

function obtenerFicheroPodcast(req, res){
	var imageFile = req.params.ficheroPodcast;
	var path_file = './uploads/podcasts/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe el fichero de podcast solicitado'});
		}
	});
}




module.exports = {
	getPodcast,
	guardarPodcast,
	listarPodcast,
	actualizarPodcast,
	borrarPodcast,
	subirFicheroPodcast,
    obtenerFicheroPodcast 


};