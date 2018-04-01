'use strict'

var express = require('express');
var UserController = require('../controllers/usuario');
var md_auth = require('../middlewares/authenticated');

var api = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/usuarios' });

api.get('/probando-controlador',md_auth.ensureAuth, UserController.pruebas);
api.post('/registro', UserController.registrarUsuario);
api.post('/identificar', UserController.IdentificarUsuario);
api.put('/actualizar-usuario/:id', md_auth.ensureAuth, UserController.actualizarUsuario);
api.post('/subir-logo-usuario/:id', [md_auth.ensureAuth, md_upload], UserController.subirFicheroLogo);
api.get('/obtener-logo-usuario/:ficheroLogo', UserController.ObtenerFicheroLogo);

module.exports = api;