module.exports = function(app){

	//var Usuario = app.models.usuarios;

	var HomeController = {
		index: function(req, res){
			res.render('home/index');
		},

		login: function(req, res){
			console.log('--- EXECUTOU LOGIN ---');

			console.log(req.body);

			var login = req.body.login;
			var senha = req.body.senha;

			if(login && senha){
				res.redirect('/usuarios');
			} else{
				res.redirect('/');
			}
		},

		logout: function(req, res){
			console.log('--- EXECUTOU LOGOUT ---');

			req.session.destroy();
			res.redirect('/');
		}
	}

	return HomeController;
}