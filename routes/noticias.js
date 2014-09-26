module.exports = function(app){
	var noticias = app.controllers.noticias;

	app.get("/noticias", noticias.index);
	app.get("/noticias/create", noticias.create);
	app.post("/noticias", noticias.insert);
	app.get("/noticias/show/:id", noticias.show);
	app.get("/noticias/edit/:id", noticias.edit);
	app.put("/noticias/edit/:id", noticias.update);
	app.delete("/noticias/delete/:id", noticias.remove);
}