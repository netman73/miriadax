/*Nombre: Nelson Sandoval
* Ejercicio p2p final del Tema 4*/

var my_path = '/home/netman/cursos/node.js/apps/node_modules/';
var express = require(my_path + 'express');
var bodyParser = require(my_path + 'body-parser');

var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname,'m4tf')));

// Middleware para preguntas
app.get('/preguntas', function (req,res) {
	res.send('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Pregunta</title></head><body><h1>Preguntas:</h1><form action="/respuesta" method="get"><label for="p">¿Quién descubrió América?</label><input type="text" name="p" id="p"><input type="hidden" name="hidden" value="america"><input type="submit" value="Enviar"></form><form action="/respuesta" method="get"><label for="p">¿Capital de Portugal?</label><input type="text" name="p" id="p"><input type="hidden" name="hidden" value="portugal"><input type="submit" value="Enviar"></form> </body></html>')
});

//NOTAS: En el middleware get, el código html no es legible. Además, en el formulario los datos se envían mediante get en lugar de mediante post.
// Se podría considerar usar expresiones regulares para las respuestas en lugar de un if con 4 comparaciones.
// El tratamiento de los erroes es excelente.

// Middleware para respuestas
//  -> req.query.p: respuesta a la pregunta
//  -> req.query.hidden: valor del párametro oculto 
//  -> -> puede tener el valor de 'portugal o 'america'
app.get('/respuesta', function (req,res,next) {
	// Comprueba existe parametro req.query.p
	if (req.query.p) {
		var respuesta = req.query.p.toLowerCase();
		if(req.query.hidden == 'america'){
			if (respuesta == "cristobal colon" || respuesta == "cristóbal colón"
				|| respuesta == "cristóbal colon" || respuesta == "cristobal colón") {
				res.send("Respuesta correcta");
			}
			else {
				res.send("La respuesta es 'Cristóbal Colón'.");
			}
		}
		else if (req.query.hidden == 'portugal') {
			if (respuesta  == "lisboa") {
				res.send("Respuesta correcta");
			}
			else {
				res.send("La respuesta es 'Lisboa'.");
			}

		}
		// Valida en caso de pregunta inexistente (hidden con otro valor)
		else {
		next(new Error('La pregunta no existe'));
		}

	}
	//Sin parametro req.query.p
	else {
		next(new Error('No se ha contestado a la pregunta'));
	}

});


app.get('*', function (req,res) {
	res.send('Operación inválida, agrege /preguntas o /respuesta');
});

// Middleware de error
app.use(function (err,req,res,next) {
	res.send(err.toString()); // Se envia el mensaje de error
});




app.listen(8000);
