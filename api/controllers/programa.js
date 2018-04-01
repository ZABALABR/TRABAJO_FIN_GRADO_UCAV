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

function borrarPrograma(req, res){
	var programaId = req.params.id; 

	Programa.findByIdAndRemove(programaId, (err, programaRemoved)=>{
		if(err){
			res.status(501).send({message: 'Error al eliminar el programa de radio'});
		}else{
			if(!programaRemoved){
				res.status(402).send({message: 'El programa de radio no ha sido eliminado'});
			}else{

				Podcast.find({programa: programaRemoved._id}).remove((err, podcastRemoved)=>{
					if(err){
						res.status(502).send({message: 'Error al eliminar el podcast'});
					}else{
						if(!podcastRemoved){
							res.status(403).send({message: 'El podcast no ha sido eliminado'});
						}else{
							res.status(200).send({programa: programaRemoved});
						}
					}
				});
			}
		}
	});
}



function subirFicheroPrograma(req, res){
	//permite guarda un fichero de imagen en la carpeta del servidor correspondiente
	var programaId = req.params.id;
	var file_name = 'No subido...';

	if(req.files){
		var file_path = req.files.logotipo.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			Programa.findByIdAndUpdate(programaId, {imagen: file_name}, (err, programaUpdated) => {
				if(!programaUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el programa de radio'});
				}else{
					res.status(200).send({programa: programaUpdated});
				}
			});

		}else{
			res.status(200).send({message: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(200).send({message: 'No has subido ningun ficherro...'});
	}
}

function obtenerFicheroPrograma(req, res){

	//permite recuperar la imagen para visualizarla
	var imageFile = req.params.ficheroPrograma;
	var path_file = './uploads/programas/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message: 'No existe el fichero solicitado del programa.'});
		}
	});
}




module.exports = {
    getPrograma,
    guardarPrograma,
    getProgramas,
    actualizarPrograma,
    borrarPrograma,
    subirFicheroPrograma,
    obtenerFicheroPrograma
    
	
};