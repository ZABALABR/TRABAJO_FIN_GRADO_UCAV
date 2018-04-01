'use strict'


var mongoose = require('mongoose'); //cargamos la libreria/modulo de mongoDB
var app = require('./app');
// configuramos un puerto para nuestro servidor
var port = process.env.PORT || 3977;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tfg_ucav', (err, res) => {

	 if(err) {
	 		throw err;
	 }else {
	 	console.log("Realizada conexion a base de datos correctamente...");
	 	// ponemos el servidor a escuchar
	 	app.listen(port, function(){
	 		console.log("Servidor del api rest de postcast escuchando en http://localhost:" + port);
	 	});
	 }
});