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
/*
api.get('/album/:id', md_auth.ensureAuth, AlbumController.getAlbum);
api.post('/album', md_auth.ensureAuth, AlbumController.saveAlbum);
api.get('/albums/:artist?', md_auth.ensureAuth, AlbumController.getAlbums);
api.put('/album/:id', md_auth.ensureAuth, AlbumController.updateAlbum);
api.delete('/album/:id', md_auth.ensureAuth, AlbumController.deleteAlbum);
api.post('/upload-image-album/:id', [md_auth.ensureAuth, md_upload], AlbumController.uploadImage);
api.get('/get-image-album/:imageFile', AlbumController.getImageFile);

*/
module.exports = api;