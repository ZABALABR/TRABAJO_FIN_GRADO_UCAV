'use strict'

var jwt = require('jwt-simple');

//para tener las fechas de creación y expiracion del token

var moment = require ('moment');
var secret = 'clave_secreta_tfg';

exports.createToken = function (user) {
	// body...
	var payload = {
			sub: user._id,
			nombre: user.nombre,
			apellidos: user.apellidos,
			email: user.email,
			role: user.role,
			image: user.image,
			iat: moment().unix(),
			// le decimos que expire cada 30 dias
			exp: moment().add(30, 'days').unix	
	};

	//en secret le pasamos una clave secreta para que haga el hash con el que genera el token
	return jwt.encode(payload, secret);
};