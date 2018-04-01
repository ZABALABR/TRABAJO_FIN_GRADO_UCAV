'use strict'

var express = require('express');
var PodcastController = require('../controllers/podcast');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/podcasts' });

api.get('/podcast/:id', md_auth.ensureAuth, PodcastController.getPodcast);
api.post('/podcast', md_auth.ensureAuth, PodcastController.guardarPodcast);
api.get('/podcasts/:programa?', md_auth.ensureAuth, PodcastController.listarPodcast);
api.put('/podcast/:id', md_auth.ensureAuth, PodcastController.actualizarPodcast);
api.delete('/podcast/:id', md_auth.ensureAuth, PodcastController.borrarPodcast);
api.post('/podcast/audio/subir/:id', [md_auth.ensureAuth, md_upload], PodcastController.subirFicheroPodcast);
api.get('/podcast/audio/:ficheroPodcast', PodcastController.obtenerFicheroPodcast);



module.exports = api;