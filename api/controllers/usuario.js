'use strict'

var fs = require('fs');//importarmos el modulo file system (sistema de fichero)
var path = require('path');  // para poder trabajar con los paths


//cargamos el modulo para encriptar contraseñas
var bcrypt = require ('bcrypt-nodejs');
// cargamos nuestro modelo de usuarios
var Usuario = require('../models/usuario');

var jwt = require('../services/jwt');

function pruebas(req, res) {
	res.status(200).send({

			messagge: 'Probando una acción del controlador de usuarios del api rest con Node y Mongo'
	});
}


function registrarUsuario(req, res){

		var user = new Usuario();
        //recogemos los parametros que vienen por post en el body, recogemos el cuerpo de la petición  
		var params = req.body;
	     
	    //sacamos por consola lo que me viene por la peticion
	    console.log(params);

		user.nombre = params.nombre;
	    user.apellidos = params.apellidos;
	    user.email= params.email;
	  
	    user.rol= 'ROL_USUARIO';
	    user.imagen= 'null';
       
	    
	    if (params.password) {
	    	// Encriptar contraseña 



	    	
	    	bcrypt.hash(params.password,null,null, function (err, hash){

	    		user.password=hash;
	    		if(user.nombre != null && user.apellidos != null  && user.email !=null){
	    			// guardar el usuario
	    			user.save((err, userStored)=>{
	    				if(err){
                               res.status(500).send({message: 'Error al guardar el usuario'});
	    				}else{
 							if(!userStored){
 								res.status(404).send({message: 'No se ha registrado el usuario'});
 							}else{
 								res.status(200).send({usuario: userStored});	
 							}
	    				}
	    			})

	    		}else{
	    			res.status(401).send({message: 'Rellena todos los campos'});
	    		}
	    	})
	    }else{

	    		res.status(402).send({message: 'Introduce la contraseña.'});
	    }
	    


}

function IdentificarUsuario (req, res){ 
	// comprueba que los datos de la peticion por post (email y contraseña) mira si existen en la bd
	var params = req.body;

	var email = params.email;
	var password = params.password;
 

    Usuario.findOne({email: email.toLowerCase()}, (err, user) => {
     	
	if (err){
		       	
			 res.status(500).send({message: 'Error en la peticion'});
	}else{
						if(!user){
							     	
								res.status(404).send({message: 'El usuario no existe'});
							}else {
								//comprobar la contraseña que nos envia el usuario con post la validamos con la que esta en la bd
								    	
								bcrypt.compare(password, user.password, function (err, check) {
									if (check){
										
										//devolver los datos del usuario logueado
										if (params.DameToken){
											//devolver un token de jwt
											res.status(200).send({ 
												token: jwt.createToken(user)
											});
												  
										}else{
										 
											res.status(200).send({usuario:user});
										}

									}else{
										
										res.status(404).send({message: 'El usuario no ha podido loguearse....'});
									}
								})
							}
			}
	});	


}

function actualizarUsuario(req, res){
	var userId = req.params.id;
	var update = req.body;

	if(userId != req.user.sub){
	  return res.status(500).send({message: 'No tienes permiso para actualizar este usuario'});
	}

	Usuario.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if(err){
			res.status(501).send({message: 'Error al actualizar el usuario'});
		}else{
			if(!userUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({usuario: userUpdated});
			}
		}
	});
}

function subirFicheroLogo(req, res){
	//Recibe por parámetro el id del usuario
	var userId = req.params.id;
	var file_name = 'Fichero no subido...';

	if(req.files){
		var file_path = req.files.fichero.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

			Usuario.findByIdAndUpdate(userId, {imagen: file_name}, (err, userUpdated) => {
				if(!userUpdated){
					res.status(404).send({message: 'No se ha podido actualizar el usuario'});
				}else{
					res.status(200).send({fichero: file_name, usuario: userUpdated});
				}
			});

		}else{
			res.status(402).send({message: 'Extensión del archivo no valida'});
		}
		
	}else{
		res.status(401).send({message: 'No has subido ningun fichero...'});
	}
}

function ObtenerFicheroLogo(req, res){
	var imageFile = req.params.ficheroLogo;//nombre del fichero que quiero sacar del servidor nos llega por la url
	var path_file = './uploads/usuarios/'+imageFile;
	fs.exists(path_file, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_file));
		}else{
			res.status(404).send({message: 'No existe el fichero solicitado...'});
		}
	});
}

module.exports = {
	pruebas,
	registrarUsuario,
	IdentificarUsuario,
	actualizarUsuario,
	subirFicheroLogo,
	ObtenerFicheroLogo
};