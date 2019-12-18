function showTable() {
	$.getJSON('http://evera.challenge.trinom.io/api/peoples', function(data) {
		var keys = Object.keys(data.data);
		//Reset the data, in case this is executed more than once (E.G. when deleting an user)
		document.getElementById('records_table').innerHTML = '<thead><tr><th>#</th><th>Nombre</th><th>Apellido</th><th>Email</th><th>Cursos</th><th>Acciones</th></tr></thead><tbody>';
		for (var i = 0; i < keys.length; i++) {
			$('<tr class="parent" id="' + data.data[i].id + '">').append($('<td>').text(data.data[i].id), $('<td>').text(data.data[i].first_name), $('<td>').text(data.data[i].last_name), $('<td>').text(data.data[i].email), $('<td><span class="expand btn-floating waves-effect waves-teal btn-flat"><i class="material-icons left icon-black">fullscreen</i></span>'), $('<td><a href="./crear.html?edit=true&id=' + data.data[i].id + '&first_name=' + data.data[i].first_name + '&last_name=' + data.data[i].last_name + '&email=' + data.data[i].email + '"><span class="btn-floating waves-effect waves-teal btn-flat"><i class="material-icons left icon-black">edit</i></span></a> <a onclick="eliminarEntrada(' + "'" + data.data[i].first_name + "'" + ', ' + data.data[i].id + ');"><span class="btn-floating waves-effect waves-teal btn-flat"><i class="material-icons left icon-black">delete</i></span></a>')).appendTo('#records_table');
			var keystwo = Object.keys(data.data[i].courses);
			for (var j = 0; j < keystwo.length; j++) {
				$('<tr class="child-' + data.data[i].id + '">').append($('<td style="background-color:lightgrey">').text(data.data[i].courses[j].id), $('<td colspan="5" style="background-color:lightgrey"> <b>' + data.data[i].courses[j].name + '</b><br>Nivel: ' + data.data[i].courses[j].level.name + '<br><small>' + data.data[i].courses[j].language.name + " (" + data.data[i].courses[j].language.code + ")</small><br> ...") //TODO: removes last line??
				).appendTo('#records_table');
			}
		}
		// TO-DO: Close all on page done loading and NOT on table done loading
		cerrarTodo();
	});
}

function eliminarEntrada(strg, id) {
	var url = "http://evera.challenge.trinom.io/api/peoples/" + id;
	$.ajax({
		url: url,
		type: "DELETE",
		data: JSON.stringify({
			"people": id
		}),
		contentType: "application/json",
		dataType: 'json',
		error: function(xhr, status, error) {
			console.log(error);
			console.log(xhr.responseText);
			M.toast({
				html: 'Hay un error en tu solicitud.',
				classes: 'rounded'
			});
		},
		success: function() {
			M.toast({
				html: '¡El usuario "' + strg + '" fue eliminado con éxito!',
				classes: 'rounded'
			});
			showTable();
		} //TO-DO: send them back to index. probably add an alert afterwards
	});
}

function cerrarTodo() {
	$('tr[class^=child-]').hide().children('td');
}
$(document).ready(function() {
	$(document).on("click", 'tr.parent td span.expand', function() {
		var idOfParent = $(this).parents('tr').attr('id');
		$('tr.child-' + idOfParent).toggle('fast');
		if ($(this).children('i').text() == "fullscreen_exit") $(this).children('i').text("fullscreen")
		else $(this).children('i').text("fullscreen_exit");
	});
});
//show table when web page opens
showTable();