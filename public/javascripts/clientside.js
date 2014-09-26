  var socket = io.connect('http://localhost');

  socket.on('welcome', function () {
  	$('#updates').append('<li>Bem Vindo, você entrou no chat</li>');
  });

  socket.on('user in', function(data){
  	$('#updates').append('<li>O usuário <strong>'+ data.userid +'</strong> entro no chat</li>');
  });

  socket.on('name changed', function(data){
  	$('#updates').append('<li>Seu nome foi alterado para: <strong>'+ data.nome +'</strong></li>');
  });

  socket.on('user changed name', function(data){
  	$('#updates').append('<li>O usuário <strong>'+ data.userid +'</strong> alterou o nome para: <strong>'+ data.nome +'</strong></li>');
  });

  socket.on('message sent', function(data){
  	$('#chat ul').append('<li><strong>Me: </strong>' + data.message + '</li>');
  });

  socket.on('message sent by user', function(data){
  	$('#chat ul').append('<li><strong> ' + data.nome + ': </strong>' + data.message + '</li>');
  });

  $(function(){
  	$('#form-alterar-nome').submit(function(){
  		var nome = $('#nome').val();
  		socket.emit('change name', {nome: nome});
  		return false;
  	});

  	$('#form-enviar-mensagem').submit(function(){
  		var message = $('#mensagem').val();
  		socket.emit('send message', {message: message});
      $('#mensagem').val('');
  		return false;
  	});
  });