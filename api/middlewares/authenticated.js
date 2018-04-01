'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_tfg';

exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization){
		return res.status(403).send({message: 'La petición no tiene la cabecera de autenticación'});
	}

    //eliminamos comillas simples y dobles del token
	var token = req.headers.authorization.replace(/['"]+/g, '');
    //decodificamos el token
	try{
		var payload = jwt.decode(token, secret);

		if(payload.exp <= moment().unix()){
			return res.status(401).send({message: 'El token ha expirado'});
		}
	}catch(ex){
		//console.log(ex);
		return res.status(404).send({message: 'Token incorrecto'});
	}

    //añadimos una propiedad a la req con todos los datos del usuario, es decir con un objeto user.
	req.user = payload;

	next();
};



