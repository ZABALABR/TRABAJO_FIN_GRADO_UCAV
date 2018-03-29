'use strict'

var path = require('path');
var fs = require('fs');

var mongoosePaginate = require('mongoose-pagination');

var Canal = require('../models/canalRadio');
var Programa = require('../models/programa');
var Podcast = require('../models/podcast');

function getCanal(req, res){

	//res.status(200).send({message: 'probando function getCanal del controlador canalRadio.js'});
	
	var canalId = req.params.id;

	Canal.findById(canalId, (err, canal) => {
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!canal){
				res.status(404).send({message: 'El canal de radio no existe'});
			}else{
				res.status(200).send({canal});
			}
		}
	});
    
}


function guardarCanal(req, res){
	var canal = new Canal();

	var params = req.body;
	canal.nombre = params.nombre;
	canal.descripcion = params.descripcion;
	canal.imagen = 'null';

	canal.save((err, canalStored) => {
		if(err){
			res.status(500).send({message: 'Error al guardar el canal'});
		}else{
			if(!canalStored){
				res.status(404).send({message: 'El canal no ha sido guardado'});
			}else{
				res.status(200).send({canal: canalStored});
			}
		}
	});
}





function getCanales(req, res){
	if(req.params.page){
		var page = req.params.page;
	}else{
		var page = 1;
	}

	var itemsPerPage = 4;

	Canal.find().sort('name').paginate(page, itemsPerPage, function(err, canales, total){
		if(err){
			res.status(500).send({message: 'Error en la petición.'});
		}else{
			if(!canales){
				res.status(404).send({message: 'No hay artistas !!'});
			}else{
				return res.status(200).send({
					total_items: total,
					canales: canales
				});
			}
		}
	});
}


function actualizarCanal(req, res){
	var canalId = req.params.id;
	var update = req.body;

	Canal.findByIdAndUpdate(canalId, update, (err, canalUpdated) => {
		if(err){
			res.status(500).send({message: 'Error guardando el canal'});
		}else{
			if(!canalUpdated){
				res.status(404).send({message: 'El canal no ha sido actualizado'});
			}else{
				res.status(200).send({canal: canalUpdated});
			}
		}
	});
}


function borrarCanal(req, res){
	var canalId = req.params.id;

	Canal.findByIdAndRemove(canalId, (err, canalRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar el canal'});
		}else{
			if(!canalRemoved){
				res.status(401).send({message: 'El canal no ha sido eliminado'});
			}else{
				Programa.find({canal: canalRemoved._id}).remove((err, programaRemoved)=>{
					if(err){
						res.status(501).send({message: 'Error al eliminar el programa'});
					}else{
						if(!programaRemoved){
							res.status(402).send({message: 'El programa no ha sido eliminado'});
						}else{

							Podcast.find({programa: programaRemoved._id}).remove((err, podcastRemoved)=>{
								if(err){
									res.status(503).send({message: 'Error al eliminar el podcast'});
								}else{
									if(!podcastRemoved){
										res.status(403).send({message: 'El podcast no ha sido eliminado'});
									}else{
										res.status(200).send({canal: canalRemoved});
									}
								}
							});
						}
					}
				});

			}
		}
	});
}

function subirFicheroCanal(req, res){
	var canalId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			Canal.findByIdAndUpdate(canalId, {imagen: file_name}, (err, canalUpdated) => {
				if(!canalId){
					res.status(404).send({message: 'No se ha podido actualizar el canal'});
				}else{
					res.status(200).send({canal: canalUpdated});
				}
			});

		}else{
			res.status(401).send({message: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(402).send({message: 'No has subido ninguna imagen...'});
	}
}


function obtenerFicheroCanal(req, res){
	var imageFile = req.params.ficheroCanal;
	var path_file = './uploads/canales/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(200).send({message: 'No existe el fichero del canal...'});
		}
	});
}



module.exports = {
	getCanal,
	guardarCanal,
	getCanales,
	actualizarCanal,
	borrarCanal,
	subirFicheroCanal,
	obtenerFicheroCanal

};