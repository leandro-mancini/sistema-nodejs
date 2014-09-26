module.exports = function(app){
	var usuarios = app.controllers.usuarios;

	app.get("/usuarios", usuarios.index);
	app.get("/usuarios/create", usuarios.create);
	app.get("/usuarios/lista", usuarios.lista);
	app.post("/usuarios", usuarios.insert);
	app.get("/usuarios/edit/:id", usuarios.edit);
	app.put("/usuarios/edit/:id", usuarios.update);
	app.get("/usuarios/show/:id", usuarios.show);
	app.delete("/usuarios/delete/:id", usuarios.remove);
}