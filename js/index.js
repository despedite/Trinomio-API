// Funcion que carga todos los datos de la tabla desde la API.
// Se ejecuta cada vez que la página inicia, y cada vez que se elimina un usuario
// (para actualizar los datos de la API).
function showTable() {
	// Agarramos los datos de api/peoples:
	$.getJSON('http://evera.challenge.trinom.io/api/peoples', function(data) {
		var keys = Object.keys(data.data);
		// Añadimos programáticamente la primera línea (la cabeza de la tabla).
		// Esto lo podría haber hecho en HTML, pero es más fácil reiniciar toda la tabla así cuando,
		// por ejemplo, se elimina un usuario y hay que refrescar los datos.
		document.getElementById('records_table').innerHTML = '<thead><tr><th>#</th><th>Nombre</th><th>Apellido</th><th>Email</th><th>Cursos</th><th>Acciones</th></tr></thead><tbody>';
		selected_courses = new Array();
		for (var i = 0; i < keys.length; i++) {

			// Vamos a usar selected_courses para formar un array de los cursos seleccionados en cada entrada.
			// Esto después entra en una URL cuando presionemos el boton de modificar, así los cursos se ponen automáticamente.
			selected_courses[i] = []
			var keystwo = Object.keys(data.data[i].courses);
			for (var j = 0; j < keystwo.length; j++) {
				// Por cada curso que exista en el usuario en el que estamos, llenamos la ID del curso en un array.
				selected_courses[i].push(data.data[i].courses[j].id);
			}

			// Por cada item en api/peoples, se añade la entrada "padre".
			// Esta es la que contiene el ID de la persona, nombre, apellido, correo, expandir, editar y eliminar.
			$('<tr class="parent" id="' + data.data[i].id + '">').append($('<td>').text(data.data[i].id), $('<td>').text(data.data[i].first_name), $('<td>').text(data.data[i].last_name), $('<td>').text(data.data[i].email), $('<td><span class="expand btn-floating waves-effect waves-teal btn-flat"><i class="material-icons left icon-black">fullscreen</i></span>'), $('<td><a href="./crear.html?edit=true&id=' + data.data[i].id + '&first_name=' + data.data[i].first_name + '&last_name=' + data.data[i].last_name + '&email=' + data.data[i].email + '&courses=' + JSON.stringify(selected_courses[i]) + '"><span class="btn-floating waves-effect waves-teal btn-flat"><i class="material-icons left icon-black">edit</i></span></a> <a onclick="eliminarEntrada(' + "'" + data.data[i].first_name + "'" + ', ' + data.data[i].id + ');"><span class="btn-floating waves-effect waves-teal btn-flat"><i class="material-icons left icon-black">delete</i></span></a>')).appendTo('#records_table');
			var keystwo = Object.keys(data.data[i].courses);
			for (var j = 0; j < keystwo.length; j++) {
				// Por cada curso que tenga asignada la persona actual, se crea una entrada "hijo."
				// Esta contiene la información de el nombre del curso, el nivel de dificultad, y el idioma (y abreviación).
				// (Esta tabla está escondida por defecto, hasta que se maximice).
				$('<tr class="child-' + data.data[i].id + '">').append($('<td class="childTable">').text(data.data[i].courses[j].id), $('<td colspan="5" class="childTable"> <b>' + data.data[i].courses[j].name + '</b><br>Nivel: ' + data.data[i].courses[j].level.name + '<br><small>' + data.data[i].courses[j].language.name + " (" + data.data[i].courses[j].language.code + ")</small><br> ...") //TODO: removes last line??
				).appendTo('#records_table');
			}
		}
		// TO-DO: Close all on page done loading and NOT on table done loading
		cerrarTodo();
	});
}

// Esta función se ejecuta cuando se presiona el botón de "Eliminar" en una entrada "padre".
// Toma dos argumentos, el nombre de la persona (para mostrar su nombre en un toast), y la ID de la entrada a eliminar.
function eliminarEntrada(strg, id) {
	// La request se envia en api/peoples/<la ID del usuario a eliminar>.
	var url = "http://evera.challenge.trinom.io/api/peoples/" + id;
	$.ajax({
		url: url,
		// La request a ejecutar es de tipo de eliminación.
		type: "DELETE",
		// Se envía como string la ID del usuario, en formato JSON.
		data: JSON.stringify({
			"people": id
		}),
		contentType: "application/json",
		dataType: 'json',
		// En caso de que haya un error, se manda un toast pidiendo que se vuelva a intentar.
		// (Podría usarse JSON.parse(xhr.responseText), y imprimir la respuesta del servidor con un código similar al de crear.js,
		// pero en este caso el error de seguro que es mío y no del usuario. Un log se imprime a la consola.)
		error: function(xhr, status, error) {
			console.log(error);
			console.log(xhr.responseText);
			M.toast({
				html: 'No se pudo eliminar el usuario.',
				classes: 'rounded'
			});
		},
		// En caso de que se haya eliminado con éxito, se manda un toast con el nombre de la persona eliminada cómo feedback.
		success: function() {
			M.toast({
				html: '¡"' + strg + '" fue eliminado con éxito!',
				classes: 'rounded'
			});
			// Finalmente, la tabla se refresca con showTable(); para mostrar los valores nuevos del JSON.
			showTable();
		}
	});
}

// Esta función sirve para que las entradas "hijo" no se muestren abiertas por defecto.
// Se ve horrible cuando todas las entradas están abiertas, y solo querés buscar un usuario.
function cerrarTodo() {
	$('tr[class^=child-]').hide().children('td');
}

// Código complicado para hacer que, cuando el botón de "Expandir" se presione, se active un Toggle en todos los elementos hijo;
// y que el ícono del botón de Expandir cambie de uno de "pantalla completa", a "cerrar pantalla completa". Muy parecidos a los de YouTube.
$(document).ready(function() {
	$(document).on("click", 'tr.parent td span.expand', function() {
		var idOfParent = $(this).parents('tr').attr('id');
		// Activa/desactiva una animación a todos los elementos hijo del botón de Expandir clickeado.
		$('tr.child-' + idOfParent).toggle('fast');
		// Si el ícono es "cerrar pantalla completa", cambialo a "pantalla completa". Y vice versa.
		if ($(this).children('i').text() == "fullscreen_exit") {
			$(this).children('i').text("fullscreen");
		}
		else {
			$(this).children('i').text("fullscreen_exit");
		}
	});
});

// La primera vez que la página web carga, se ejecuta el comando para mostrar los datos en la tabla.
showTable();