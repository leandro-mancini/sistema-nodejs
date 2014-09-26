module.exports = function(app){

	var Noticia = app.models.noticias;

	var NoticiasController = {
		index: function(req, res){
			Noticia.find(function(err, data){
				if(err){
					console.log(err);
				}
				res.render('noticias/index', { lista: data, title: 'Cadastro de Notícias' });
			});
		},

		// Criar Nova Notícia
		create: function(req, res){
			res.render('noticias/create', { tutle: 'Nova Notícia' });
		},

		insert: function(req, res){
			var multiparty = require('multiparty');
			var form = new multiparty.Form();

			form.parse(req, function(err, fields, files){
				var img = files.image[0];
				var fs = require('fs');

				fs.readFile(img.path, function(err, data){
					var path = './public/images/upload/'+img.originalFilename;

					fs.exists(path, function(exists){
						if(!exists){
							fs.writeFile(path, data, function(erro){
								if(erro){
									console.log(erro);
								} else{
									var model = new Noticia({
										titulo: fields.titulo,
										texto: fields.texto,
										image: img.originalFilename,
										data_cad: { type: Date, default: Date.now }
									});

									model.save(function(err){
										if(err){
											console.log(err);
										} else{
											console.log('Nova Notícia Cadastrada!');
											res.redirect('/noticias');
										}
									});
								}
							});
						} else{
							console.log('Arquivo já existe!');
						}
					});
				});
			});
		},

		// Visualizar Notícia
		show: function(req, res){
			Noticia.findById(req.params.id, function(err, data){
				if(err){
					console.log(err);
				} else{
					res.render('noticias/show', { value: data, title: data.titulo });
				}
			});
		},

		//Encontra Usuários para Editar
		edit: function(req, res){
			Noticia.findById(req.params.id, function(err, data){
				if (err){
					console.log(err);
				}else{
					res.render('noticias/edit', {value: data, title: "Editar " + data.titulo })
				}
			});
		},

		//Edita Usuários
		update: function(req, res){
			Noticia.findById(req.params.id, function(err, data){
				if (err){
					console.log(err);
				}else{
					var model   = data;
					model.titulo  = req.body.titulo;
					model.texto = req.body.texto;

					model.save(function(err){
						if(err){
							console.log(err);
						}else{
							console.log("Noticia Atualizado com Sucesso!!!");
							res.redirect('/noticias');
						}
					});
				}
			});
		},

		//Exclui Usuários
		remove: function(req, res){
			Noticia.remove({_id: req.params.id}, function(err){
				if(err){
					console.log(err);
				}else{
					res.redirect('/noticias');
				}
			});
		}
	};

	return NoticiasController;
}