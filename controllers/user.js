'use strict'
//cargamos el modulo para encriptar contraseñas
var bcrypt = require ('bcrypt-nodejs');
// cargamos nuestro modelo de usuarios
var User = require('../models/user');

function pruebas(req, res) {
	res.status(200).send({

			messagge: 'Probando una acción del controlador de usuarios del api rest con Node y Mongo'
	});
}


function saveUser(req, res){

		var user = new User();
        //recogemos los parametros que vienen por post en el body, recogemos el cuerpo de la petición  
		var params = req.body;
	     
	    //sacamos por consola lo que me viene por la peticion
	    console.log(params);

		user.nombre = params.nombre;
	    user.apellidos = params.apellidos;
	    user.email= params.email;
	  
	    user.role= 'ROLE_USER';
	    user.imagen= 'null';
       
	    
	    if (params.password) {
	    	// Encriptar contraseña y guardar datos
	    	bcrypt.hash(params.password,null,null, function (err, hash){

	    		user.password=hash;
	    		if(user.nombre != null && user.apellidos != null  && user.email !=null){
	    			// guardar el usuario
	    			user.save((err, userStored)=>{
	    				if(err){
                               res.status(500).send({message: 'Error al guardar el usuario'});
	    				}else{
 							if(!userStored){
 								res.status(400).send({message: 'No se ha registrado el usuario'});
 							}else{
 								res.status(200).send({user: userStored});	
 							}
	    				}
	    			})

	    		}else{
	    			res.status(200).send({message: 'Rellena todos los campos'});
	    		}
	    	})
	    }else{

	    		res.status(200).send({message: 'Introduce la contraseña.'});
	    }
	    


}

function loginUser (req, res){ 
	// comprueba que los datos de la peticion por post (email y contraseña) mira si existen en la bd
	var params = req.body;

	var email = params.email;
	var password = params.password;
   // console.log('entramos en funcion loginUser'); 
	User.findOne({email: email.toLowerCase()}), (err, user) => {
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
 										if (params.gethash){
 											//devolver un token de jwt
 										}else{
 											res.status(200).send({user});
 										}

 									}else{
 										res.status(404).send({message: 'El usuario no ha podido loguearse'});
 									}
 								})
 							}
		}
	}
}

module.exports = {
	pruebas,
	saveUser,
	loginUser
};