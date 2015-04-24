// Module dependencies
var express = require('express');
var load = require('express-load');
//var connect = require('connect');
//var fs = require('fs');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
//var bodyParser = require('body-parser');
var flash = require('express-flash');

var app = express();


// Conexão com o Banco
mongoose.connect('mongodb://localhost/sistema', function(err){
	if(err){
		console.log('Erro ao conectar no MongoDB: '+err)
	} else{
		console.log('Banco de dados conectado...');
	}
});


// Todos ambientes
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser('sistema'));
app.use(express.session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/images/', express.static(__dirname + '/public/images/'));

app.use(function (req, res, next){
	res.status(404).render('404/404');
});



// Estrutura MVC
load('models').then('controllers').then('routes').into(app);


// Servidor
app.listen(80, function(){
  console.log("Servidor Rodando MyApp no http://localhost:3000/");
});

module.exports = app;
