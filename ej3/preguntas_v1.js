var my_path = '/home/netman/cursos/node.js/apps/node_modules/';
var express = require(my_path + 'express');
var path = require('path');
var bodyParser = require(my_path + 'body-parser');

var app = express();

// TODO: Set title

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));    // TODO: ¿Esto es realmente necesario?

// Transacción 1: carga del formulario
//       -> GET /preguntas

app.get('/preguntas', function(req, res) {
   res.send('<html><head><title>Un par de preguntas</title></head><body>'
          +   '<form method="post" action="/respuesta">'
          +     '<input type="hidden" name="id" value="1" />'
          +     '¿Quién descubrió América? </br>'
          +      '<input type="text" name="respuesta" /></br>'
          +      '<input type="submit" value="Enviar" />'
          +   '</form>'
          +   '<form method="post" action="/respuesta">'
          +     '<input type="hidden" name="id" value="2" />'
          +     '¿Capital de Portugal? </br>'
          +     '<input type="text" name="respuesta" /></br>'
          +     '<input type="submit" value="Enviar" />'
          +   '</form>'
          + '</body></html>');
});

// Transacción 2: envío y proceso de datos
//          -> GET /respuesta

app.post('/respuesta', function(req, res) {
	// Hay que comprobar que las respuestas son correctas o no (usar regexp aquí).
	// Indicar en caso de fallo cuál era la respuesta correcta.
	// Incluír enlace a la página inicial.

	var respuesta_match = { '1': '(Crist[oó]bal )*Col[oó]n', '2': 'Lisboa' };
	var respuesta_correcta = { '1': 'Colón', '2': 'Lisboa' };

	var regexp = new RegExp(respuesta_match[req.body.id], "i");
   if (req.body.respuesta.match(regexp)) {
		output = '¡Enhorabuena!</br> La respuesta es correcta.</br>';
	} else {
	   output = 'Has fallado.</br> La respuesta correcta era: ' + respuesta_correcta[req.body.id] + '</br>';
	}

	output += '</br> <a href="./preguntas">Volver a la página inicial.</a>';

  	res.send(output);
});

app.listen(8000);
