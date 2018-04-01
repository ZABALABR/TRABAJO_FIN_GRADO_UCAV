'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar rutas
var rutas_usuario = require('./routes/usuario');
var rutas_canalRadio = require('./routes/canalRadio');
var rutas_programa = require('./routes/programa');
var rutas_podcast = require('./routes/podcast');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//configurar cabeceras http

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas base

app.use('/api', rutas_usuario);
app.use('/api', rutas_canalRadio);
app.use('/api', rutas_programa);
app.use('/api', rutas_podcast);

//exportar modulo

module.exports = app;