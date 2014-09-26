module.exports = function (app){

	var Usuario = app.models.usuarios;

	var UsuarioController = {
		index: function (req, res){			  // Paginação
			Usuario.find(function(err, data){ //usar assim quando precisar de uma paginação -> find({query},
				if(err){				      //{fields}, {skip: skip, limit: limit}, function({//callback}))
					console.log(err);										//......
				}
				res.render("usuarios/index", {lista: data, title: "Cadastro de Usuários"});
			});
		},

		//Cria Usuário
		create: function(req, res){
			res.render("usuarios/create", {title: "Novo Usuário"});
		},

		insert:function(req, res){
			var model = new Usuario(req.body);
			model.save(function(err){
				if(err){
					console.log(err);
				}
				console.log("Novo Usuário Cadastrado!!!");
				res.redirect("/usuarios");
			});
		},

		//Lista Usuários
		lista: function(req, res){
			Usuario.find(function(err, data){
				if(err){
					console.log('Erro ao buscar Usuarios '+err);
				}else{
					res.json(data);
				}				
			});
		},

		//Encontra Usuários para Editar
		edit: function(req, res){
			Usuario.findById(req.params.id, function(err, data){
				if (err){
					console.log(err);
				}else{
					res.render('usuarios/edit', {value: data, title: "Editar " + data.nome })
				}
			});
		},

		//Edita Usuários
		update: function(req, res){
			Usuario.findById(req.params.id, function(err, data){
				if (err){
					console.log(err);
				}else{
					var model   = data;
					model.nome  = req.body.nome;
					model.login = req.body.login;
					model.save(function(err){
						if(err){
							console.log(err);
						}else{
							console.log("Usuário Atualizado com Sucesso!!!");
							res.redirect('/usuarios');
						}
					});
				}
			});
		},

		//Vizualiza Usuários
		show: function(req, res){
			Usuario.findById(req.params.id, function(err, data){
				if (err){
					console.log(err);
				}else{
					res.render('usuarios/show', {value: data, title: data.nome})
				}
			});
		},

		//Exclui Usuários
		remove: function(req, res){
			Usuario.remove({_id: req.params.id}, function(err){
				if(err){
					console.log(err);
				}else{
					res.redirect('/usuarios');
				}
			});
		}
	}

	return UsuarioController;
}