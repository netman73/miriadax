var my_path = '/home/netman/cursos/node.js/apps/node_modules/';
var express = require(my_path + 'express');

var path = require('path');
var app = express();

//Mejoras:

// Permitir respuestas tipo "lisboa", o "Lisboa" en lugar de sólo "LISBOA".
// También deberían poderse permitir las tildes.
// Factorizar el middleware get(Respuesta), para 
// tener en un único lugar la gran cantidad de código HTML que 
// comparten las dos ramas del if.
// Usar post en lugar de get en el formulario.

app.get('/Preguntas', function (req, res){
res.send('<!DOCTYPE html>'
+'<html>'
+'<head>'
	+'<title>Preguntas</title>'
	+'<meta charset="UTF-8">'
+'</head>'
+'<body>'
	+'<h3>Preguntas</h3>'
+'<form method="get" action="/Respuesta">'
	+'¿Quien descubrio America? <br>'
	+'<input type="hidden" name="Id" value="1" >'
	+'<input type="text" name="america" value=""/>'
	+'<br>'
	+'<input type="submit" value="Enviár"/>'
+'</form>'
+'<form method="get" action="/Respuesta">'
	+'¿Capital de portugal? <br>'
	+'<input type="hidden" name="Id" value="2" >'
	+'<input type="text" name="capital" value=""/>'
	+'<br>'
	+'<input type="submit" value="Enviár"/>'
+'</form>'
+'</body>'
+'</html>');

});

app.get('/Respuesta', function (req, res){

	if(req.query.Id == 1)
	{
		if(req.query.america === "CRISTOBAL COLON")
		{
			res.send('<!DOCTYPE html>'
+'<html>'
+'<head>'
	+'<title>Respuesta</title>'
	+'<meta charset="UTF-8">'
+'</head>'
+'<body>'
	+'<h3>Respuesta</h3>'
+'<form method="get" action="/Respuesta">'
	
	+'Su Respuesta: ' + req.query.america + 'es correcta.'
	+'<br>'
	+'<input type="submit" value="Regresar"/>'
+'</form>'

+'</body>'
+'</html>'
				);
		}
		else 
		{
			res.send(
				'<!DOCTYPE html>'
+'<html>'
+'<head>'
	+'<title>Respuesta</title>'
	+'<meta charset="UTF-8">'
+'</head>'
+'<body>'
	+'<h3>Respuesta</h3>'
+'<form method="get" action="/Preguntas">'
	
	+'Su respuesta : ' + req.query.america + ' es incorrecta, la respuesta correcta es Cristobal Colon'
	+'<br>'
	+'<input type="submit" value="Regresar"/>'
+'</form>'

+'</body>'
+'</html>'
				);
		}

		
	}
	

	if(req.query.Id == 2)
	{
		if(req.query.capital === "LISBOA")
		{
			res.send(
				'<!DOCTYPE html>'
+'<html>'
+'<head>'
	+'<title>Respuesta</title>'
	+'<meta charset="UTF-8">'
+'</head>'
+'<body>'
	+'<h3>Respuesta/h3>'
+'<form method="get" action="/Preguntas">'
	
	+'Su respuesta: ' + req.query.capital + ' es correcta.'
	+'<br>'
	+'<input type="submit" value="Regresar"/>'
+'</form>'

+'</body>'
+'</html>'

				);
		}
		else
			{
				res.send(
					'<!DOCTYPE html>'
+'<html>'
+'<head>'
	+'<title>Respuesta</title>'
	+'<meta charset="UTF-8">'
+'</head>'
+'<body>'
	+'<h3>Respuesta </h3>'
+'<form method="get" action="/Preguntas">'
	
	+'Su respuesta : ' + req.query.capital + ' es incorrecta, la respuesta correcta es Lisboa'
	+'<br>'
	+'<input type="submit" value="Regresar"/>'
+'</form>'

+'</body>'
+'</html>'
					);
			}
	}
	

});



app.get('*', function (req, res){
res.send('Url Incorrecto');

});

app.listen(8000);
