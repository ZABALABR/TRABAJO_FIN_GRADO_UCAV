'use strict'

var express = require('express');
var ProgramaController = require('../controllers/programa');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/programas' });

api.get('/programa/:id', md_auth.ensureAuth, ProgramaController.getPrograma);
api.post('/programa', md_auth.ensureAuth, ProgramaController.guardarPrograma);
api.get('/programas/:canalradio?', md_auth.ensureAuth, ProgramaController.getProgramas);
api.put('/programa/:id', md_auth.ensureAuth, ProgramaController.actualizarPrograma);
api.delete('/programa/:id', md_auth.ensureAuth, ProgramaController.borrarPrograma);
api.post('/programa/logotipo/subir/:id', [md_auth.ensureAuth, md_upload], ProgramaController.subirFicheroPrograma);
api.get('/programa/logotipo/:ficheroPrograma', ProgramaController.obtenerFicheroPrograma);


module.exports = api;