'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Canal = require('../models/canalRadio');
var Programa = require('../models/programa');
var Podcast = require('../models/podcast');

function getPrograma(req, res){
    //res.status(200).send({message: 'prueba getPrograma.....'});

    //obtenemos los datos de un programa cuyo id se lo pasamos por paramatro.
	
	var programaId = req.params.id;
    // con el metodo populate obtenemos a partir de la propiedad canal radio un objeto con todos los datos del canal de radio. 
	Programa.findById(programaId).populate({path: 'canalradio'}).exec((err, programa)=>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!programa){
				res.status(404).send({message: 'El programa no existe.'});
			}else{
				res.status(200).send({programa});
			}
		}
	});
	
}

function guardarPrograma(req, res){
	//creamos un programa con los datos pasados por el body
	var programa = new Programa();

	var params = req.body;
	programa.nombre = params.nombre;
	programa.descripcion = params.descripcion;
	programa.temporada = params.temporada;
	programa.imagen = 'null';
	programa.canalradio = params.canalradio;  //id del canal

	programa.save((err, programaStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor al guardar el programa'});
		}else{
			if(!programaStored){
				res.status(404).send({message: 'No se ha guardado el programa'});
			}else{
				res.status(200).send({programa: programaStored});
			}
		}
	});
}


function getProgramas(req, res){
	var canalId = req.params.canalradio;
    // si llega por parametro un id, saco los datos de ese canal de radio en concreto y si no se le  pasa parametros sacamos todos los programas de la bd (es de decir de todos los canales)
	if(!canalId){
		
		var find = Programa.find({}).sort('nombre');
	}else{
		
		var find = Programa.find({canalradio: canalId}).sort('temporada');
	}

	find.populate({path: 'canalradio'}).exec((err, programas) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!programas){
				res.status(404).send({message: 'No hay programas'});
			}else{
				res.status(200).send({programas});
			}
		}
	});
}

function actualizarPrograma(req, res){
	var programaId = req.params.id;
	var update = req.body;

	Programa.findByIdAndUpdate(programaId, update, (err, programaUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!programaUpdated){
				res.status(404).send({message: 'No se ha actualizado el programa'});
			}else{
				res.status(200).send({programa: programaUpdated});
			}
		}
	});
}
/*
function getAlbums(req, res){
	var artistId = req.params.artist;

	if(!artistId){
		// Sacar todos los albums de la bbdd
		var find = Album.find({}).sort('title');
	}else{
		// Sacar los albums de un artista concreto de la bbdd
		var find = Album.find({artist: artistId}).sort('year');
	}

	find.populate({path: 'artist'}).exec((err, albums) => {
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}else{
			if(!albums){
				res.status(404).send({message: 'No hay albums'});
			}else{
				res.status(200).send({albums});
			}
		}
	});
}

function saveAlbum(req, res){
	var album = new Album();

	var params = req.body;
	album.title = params.title;
	album.description = params.description;
	album.year = params.year;
	album.image = 'null';
	album.artist = params.artist;

	album.save((err, albumStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!albumStored){
				res.status(404).send({message: 'No se ha guardado el album'});
			}else{
				res.status(200).send({album: albumStored});
			}
		}
	});
}

function updateAlbum(req, res){
	var albumId = req.params.id;
	var update = req.body;

	Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!albumUpdated){
				res.status(404).send({message: 'No se ha actualizado el album'});
			}else{
				res.status(200).send({album: albumUpdated});
			}
		}
	});
}

function deleteAlbum(req, res){
	var albumId = req.params.id; 

	Album.findByIdAndRemove(albumId, (err, albumRemoved)=>{
		if(err){
			res.status(500).send({message: 'Error al eliminar el album'});
		}else{
			if(!albumRemoved){
				res.status(404).send({message: 'El album no ha sido eliminado'});
			}else{

				Song.find({album: albumRemoved._id}).remove((err, songRemoved)=>{
					if(err){
						res.status(500).send({message: 'Error al eliminar la canción'});
					}else{
						if(!songRemoved){
							res.status(404).send({message: 'La canción no ha sido eliminada'});
						}else{
							res.status(200).send({album: albumRemoved});
						}
					}
				});
			}
		}
	});
}

function uploadImage(req, res){
	var albumId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated) => {
				if(!albumUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({album: albumUpdated});
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(200).send({message: 'No has subido ninguna imagen...'});
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_file = './uploads/albums/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe la imagen...'});
		}
	});
}

*/
module.exports = {
    getPrograma,
    guardarPrograma,
    getProgramas,
    actualizarPrograma
    
	/*
	getAlbum,
	saveAlbum,
	getAlbums,
	updateAlbum,
	deleteAlbum,
	uploadImage,
	getImageFile
	*/
};