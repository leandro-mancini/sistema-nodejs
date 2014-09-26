module.exports = function(){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var noticia = new Schema({
		titulo: String,
		texto: String,
		image: String,
		data_cad: { type: Date, default: Date.now }
	});

	return mongoose.model('Noticia', noticia);
}