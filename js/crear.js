// Busca los parámetros en la URL (eg: crear.html?edit=true), y los convierte a una variable.
var urlParams = new URLSearchParams(window.location.search);
// Esta variable guarda el valor de ?edit en la URL.
var editVal = urlParams.get('edit');
// Agarramos los datos de api/courses:
$.getJSON('http://evera.challenge.trinom.io/api/courses', function(data) {
	var ele = document.getElementById('checkboxForm');
	for (var i = 0; i < data.length; i++) {
		// Por cada curso que haya en la API, se genera una checkbox con su ID y nombre.
		// Los valores adicionales, como el nivel y el lenguaje, se agregan más tarde.
		ele.innerHTML += '<div class="col s4 cbox"><p><label><input type="checkbox" name="' + data[i].id + '" id="' + data[i].id + '" value="yes"/><span>' + data[i].name + '</span></label></p></div>'
	}
	// Cuando terminamos de llenar todo de checkboxes, añadimos el botón de Subir.
	ele.innerHTML += '<br><a onclick="enviarAJson();" class="waves-effect waves-light btn nicebtn objpadding purple darken-1">Subir</a>'
	// (Las siguientes tres líneas se ejecutan cuando los checkboxes ya están llenos de los valores en api/courses)
	// Esto hace que, si ?edit=true, se tomen las variables en la URL (nombre, apellido, email) y se introduzcan en el formulario automáticamente.
	loadData();
	// Esto elimina el elemento con la ID 'preloader'. Esencialmente, unos placeholders que dicen 'Cargando...'.
	var elem = document.getElementById('preloader')
	elem.parentNode.removeChild(elem);
});

// Esta funcion se ejecuta cuando se presiona el botón de 'Subir'.
function enviarAJson() {
	// Busca los valores de los inputs escritos en el formulario. (también crea un array y variable vacía)
	var first_name = document.getElementById("text").value;
	var last_name = document.getElementById("surname").value;
	var email = document.getElementById("email").value;
	var selected_courses = [];
	var amountOfObjects;

	// Antes de empezar, revisamos que se hayan introducido cursos. Si no es así, le envía un toast al usuario.
	if (!($("#checkboxForm input:checkbox:checked").length > 0)) {
		M.toast({
			html: '¡No introduciste ningún curso!',
			classes: 'rounded'
		});
		return;
	}

	// Toma el tiempo actual en formato ISO. En realidad este valor lo cambia la API al valor actual cuando se actualizan los datos,
	// pero está puesto el día y hora de todas formas de cortesía.
	var dateObj = new Date();
	var curTime = dateObj.toISOString();
	// Creamos el objeto en JSON que vamos a enviar a la API.
	// (Esto es solo la raíz - los cursos se agregan más tarde)
	var jsonObj = {
		'id': 0,
		'first_name': first_name,
		'last_name': last_name,
		'email': email,
		'created_at': curTime,
		'updated_at': curTime,
		'courses': []
	}

	// Vamos a agarrar la información de los cursos: 
	$.getJSON('http://evera.challenge.trinom.io/api/courses', function(data) {

		amountOfObjects = data.length;
		for (var i = 0; i < amountOfObjects; i++) {
			// Por cada checkbox que existe, revisamos si ha sido seleccionada (true) o no (false).
			selected_courses[i] = document.getElementById(data[i].id).checked;
		}

		for (var i = 0; i < data.length; i++) {
			// Si la checkbox que estamos revisando FUE seleccionada, añadamos data de el curso que está haciendo!
			if (selected_courses[i] == true) {
				jsonObj.courses.push({
					// Los arrays empiezan en cero, pero la información de los cursos no.
					'id': (i + 1),
					// El resto de la información son placeholders.
					// Por suerte, la API hizo el trabajo sucio, y sólo con introducir el ID el resto de los datos se llenan solos.
					'name': 'placeholder',
					'language_code': 'ph',
					'level_id': 0,
					'created_at': curTime,
					'updated_at': curTime,
					'level': {
						'id': 0,
						'name': 'placeholder'
					},
					'language': {
						'code': 'placeholder',
						'name': 'placeholder'
					}
				})
			}
		}

		// Finalmente, tenemos nuestro objeto en JSON y podemos mandar una request PUT/POST para actualizar/agregar una nueva persona.
		if (editVal == "true") {
			// Si estamos modificando algo, entonces consigamos la ID de lo que estemos modificando.
			var peoplesId = urlParams.get('id');
			var url = "http://evera.challenge.trinom.io/api/peoples/" + peoplesId;
			// Para actualizar un valor, necesitamos una request PUT.
			var peoplesType = "PUT";
			var peoplesTerm = "actualizado";
		} else {
			// Si, por otro lado estamos agregando algo, la URL es sólo la estandar (api/peoples), y se necesita una request POST.
			var url = "http://evera.challenge.trinom.io/api/peoples";
			var peoplesType = "POST";
			var peoplesTerm = "subido";
		}
		$.ajax({
			// Usamos la URL y tipo de request correspondiente a lo que estemos haciendo.
			url: url,
			type: peoplesType,
			data: JSON.stringify(jsonObj),
			contentType: "application/json",
			dataType: 'json',
			// En el caso de un error...
			error: function(xhr, status, error) {
				// Escribamos el error a la consola.
				console.log(error);
				// Tomemos el array de Errores que la API nos concede y usemos eso para informarle al usuario que algo pasó.
				// (O para informar al desarrollador que algo pasó, y el usuario no tiene idea que dice el mensaje de error)
				errores = JSON.parse(xhr.responseText);
				for (var key in errores.errors) {
					for (var error in errores.errors[key]) {
						// Este pedazo de código verifica si el error tiene que ver con que los inputs no fueron llenados o se llenaron mal
						// (no se entro el nombre/apellido/correo, el correo está tomado), y manda un toast con el mensaje de error traducido.
						// Si no es ninguno de esos errores, manda el mensaje en inglés. En ese caso, tendría que ver con un error de programación.
						// (Switch-case para no tener que crear bastantes statements IF, ELSE IF y ELSE.)
						switch (errores.errors[key][error]) {
							case "The first name field is required.":
								M.toast({
									html: "Se requiere escribir el nombre.",
									classes: 'rounded'
								});
								break;
							case "The last name field is required.":
								M.toast({
									html: "Se requiere escribir el apellido.",
									classes: 'rounded'
								});
								break;
							case "The email field is required.":
								M.toast({
									html: "Se requiere escribir el correo electrónico.",
									classes: 'rounded'
								});
								break;
							case "The email has already been taken.":
								M.toast({
									html: "Este correo electrónico ya está en uso.",
									classes: 'rounded'
								});
								break;
							default:
								// In case the error doesn't exist, just print the original error in English.
								M.toast({
									html: errores.errors[key][error],
									classes: 'rounded'
								});
								break;
						}
					}
				}
			},
			// Si no hay errores y se sube de forma correcta, se notifica al usuario mediante un toast.
			success: function() {
				// El toast está escrito en HTML, así se puede insertar un enlace a la página anterior.
				var toastHTML = '<span>¡Tu entrada se ha ' + peoplesTerm + ' con éxito!</span><a href="./index.html"><button class="btn-flat toast-action">Mirar</button></a>';
				M.toast({
					html: toastHTML,
					classes: 'rounded'
				});
			}
		});
	});
}

// Esta es la función que se encarga de que los datos, en el caso de que se quieran modificar, se peguen en los fields apropiados.
// (Sólo para no tener que escribirlos de nuevo)
function loadData() {
	// Si ?edit en la URL es igual a true... (si no existe, es undefined)
	if (editVal == "true") {
		// ... toma los datos de los inputs por sus IDs (text, surname, email) y llena el valor por defecto con lo que estaba en la tabla.
		var first = document.getElementById('text');
		var last = document.getElementById('surname');
		var email = document.getElementById('email');
		var courseArray = JSON.parse(urlParams.get('courses'));

		first.value = urlParams.get('first_name');
		last.value = urlParams.get('last_name');
		email.value = urlParams.get('email');

		// Por cada checkbox que hay...
		$("input:checkbox").each(function() {
			// Por cada checkbox que tiene ID que hay...
			// (El placeholder de Cargando... contaría en esta función, pero no pasa este test
			// porque estamos saltando todos los checkboxes que no tengan una ID definida.)
			if ($(this).attr('id') != undefined) {
				for (j=0; j<courseArray.length; j++) {
					// Si la ID de esta checkbox es igual a la ID guardada en el array, hace que el checkbox esté activo.
					if ($(this).attr('id') == courseArray[j]) {
						$(this).prop('checked', true);
					}
				}
			}
		});
	}
}

// Check para revisar si ?edit=true. Si lo es, cambia el título de la página a "Modificar persona" (en vez de "Agregar persona"),
// y el header (<h4>) a "Modificar una persona" (causando la ilusión que son dos páginas diferentes).
function esModificar() {
	// Si ?edit en la URL es igual a true... (si no existe, es undefined)
	if (editVal == "true") {
		//... cambia el título y el header.
		document.title = "Modificar persona - APIHook";
		var title = document.getElementById('mainTitle');
		title.innerHTML = "Modificar una persona"
	}
}

// Revisá si estamos en modo Modificar cuando la página web esté completamente cargada.
$(document).ready(function() {
	esModificar();
});