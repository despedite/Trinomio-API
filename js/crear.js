var urlParams = new URLSearchParams(window.location.search);
let dropdown = $('#dropdown');
$.getJSON('http://evera.challenge.trinom.io/api/courses', function(data) {
  var ele = document.getElementById('dropdown');
  for (var i = 0; i < data.length; i++) {
	ele.innerHTML += '<div class="col s4 cbox"><p><label><input type="checkbox" name="' + data[i].id + '" id="' + data[i].id + '" value="yes"/><span>' + data[i].name + '</span></label></p></div>'
  }
  ele.innerHTML += '<br><a onclick="enviarAJson();" class="waves-effect waves-light btn nicebtn objpadding purple darken-1">Subir</a>'
  loadData();
  //remove preloader (Cargando...)
  var elem = document.getElementById('preloader')
  elem.parentNode.removeChild(elem);
});

function enviarAJson() {
  var first_name = document.getElementById("text").value;
  var last_name = document.getElementById("surname").value;
  var email = document.getElementById("email").value;
  var selected_courses = [];
  var amountOfObjects;
  if (!($("#dropdown input:checkbox:checked").length > 0)) {
	M.toast({
	  html: '¡No introduciste ningún curso!',
	  classes: 'rounded'
	});
	return;
  }
  // Might be a very round-about way to check how many checkboxes are there
  // TO-DO: check if I can make this in a less round-about way
  $.getJSON('http://evera.challenge.trinom.io/api/courses', function(data) {
	amountOfObjects = data.length;
	for (var i = 0; i < amountOfObjects; i++) {
	  selected_courses[i] = document.getElementById(data[i].id).checked;
	}
  });
  var dateObj = new Date();
  var curTime = dateObj.toISOString();
  var jsonObj = {
	'id': 0,
	'first_name': first_name,
	'last_name': last_name,
	'email': email,
	'created_at': curTime,
	'updated_at': curTime,
	'courses': []
  }
  //template for the JSON we're going to add the courses to!
  $.getJSON('http://evera.challenge.trinom.io/api/courses', function(data) {
	for (var i = 0; i < data.length; i++) {
	  if (selected_courses[i] == true) {
		jsonObj.courses.push({
		  'id': (i + 1),
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
		//luckily Trinomio did all of the heavy lifting, and by just inputting the ID number it fills all of the spaces for us.
	  }
	}
	//Finally, FINALLY, we have our JSON object. Finally.
	//Now we can just send a POST request to the API server.
	//I got stuck for like a day on this part because JS variables were messing with me.
	console.log(JSON.stringify(jsonObj))
	if (urlParams.has('edit')) { //urlparams edit = true
	  var peoplesId = urlParams.get('id');
	  var url = "http://evera.challenge.trinom.io/api/peoples/" + peoplesId;
	  console.log(url);
	  var peoplesType = "PUT";
	  var peoplesTerm = "actualizado";
	} else {
	  var url = "http://evera.challenge.trinom.io/api/peoples";
	  var peoplesType = "POST";
	  var peoplesTerm = "subido";
	}
	$.ajax({
	  url: url,
	  type: peoplesType,
	  data: JSON.stringify(jsonObj),
	  contentType: "application/json",
	  dataType: 'json',
	  error: function(xhr, status, error) {
		// Error catching
		console.log(error);
		console.log(xhr.responseText);
		errores = JSON.parse(xhr.responseText);
		for (var key in errores.errors) {
		  for (var error in errores.errors[key]) {
			// Switch-case structure for translating the errors JSON may give.
			// It isn't translating everything - more technical errors I'd rather have in English anyways,
			// but it's the four most common errors having to do with user error.
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
	  success: function() {
		var toastHTML = '<span>¡Tu entrada se ha ' + peoplesTerm + ' con éxito!</span><a href="./index.html"><button class="btn-flat toast-action">Mirar</button></a>';
		M.toast({
		  html: toastHTML,
		  classes: 'rounded'
		});
	  } //TO-DO: send them back to index. probably add an alert afterwards
	});
  });
}

function loadData() {
  if (urlParams.has('edit')) {
	var first = document.getElementById('text');
	var last = document.getElementById('surname');
	var email = document.getElementById('email');
	first.value = urlParams.get('first_name')
	last.value = urlParams.get('last_name')
	email.value = urlParams.get('email')
  }
}
//NOTE: The following could be on the function loadData();, but since we have to wait until the JSON-populated
//checkboxes load before changing the title, it looks jarring and breaks the illusion of two different forms.
if (urlParams.has('edit')) {
  var ele = document.getElementById('title');
  ele.innerHTML = "Modificar una persona"
  document.title = "Modificar persona - APIHook";
}