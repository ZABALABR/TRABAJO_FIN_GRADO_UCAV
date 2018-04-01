'use strict'

var express = require('express');
var CanalController = require('../controllers/canalRadio');
var api = express.Router(); //esto nos permite hacer las funciones get, put, etc es decir nuestra rutas
var md_auth = require('../middlewares/authenticated');  //middleware con autenticacion para dar acceso a los metodos solo si esta correctamente identificado o loggeado.


var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/canales' });


api.get('/canalRadio/:id', md_auth.ensureAuth, CanalController.getCanal);
api.post('/canalRadio', md_auth.ensureAuth, CanalController.guardarCanal);
api.get('/canalesRadio/:page?', md_auth.ensureAuth, CanalController.getCanales);
api.put('/canalRadio/:id', md_auth.ensureAuth, CanalController.actualizarCanal);
api.delete('/canalRadio/:id', md_auth.ensureAuth, CanalController.borrarCanal);
api.post('/subir-fichero-canal/:id', [md_auth.ensureAuth, md_upload], CanalController.subirFicheroCanal);
api.get('/obtener-fichero-canal/:ficheroCanal', CanalController.obtenerFicheroCanal);



module.exports = api;