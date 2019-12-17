<p align="center">
  <a href="http://materializecss.com/">
    <img src="https://raw.githubusercontent.com/despediteerik/Trinomio-API/master/img/logo-p.png?token=AIVICLVC2VG6XR2SP3NULWS6AKBLW" width="250">
  </a>
</p>

<h3 align="center">APIHook</h3>

<p align="center">
  Un sitio web para crear, modificar, eliminar y visualizar personas y sus cursos, con la <a href="http://evera.challenge.trinom.io/api/documentation">API de Trinomio</a>.
  <br>
  <strong><a href="http://erik.games/apihook">Revisalo online</a> · <a href="https://github.com/despediteerik/Trinomio-API/releases">Descargá el código fuente</a></strong>
  <br>

***

APIHook es un sitio web creado con [Javascript](https://developer.mozilla.org/es/docs/Web/JavaScript), [jQuery](https://jquery.com/) y [Materialize](https://materializecss.com/); que toma los elementos de [una API](http://evera.challenge.trinom.io/api/documentation) diseñada para tomar los datos de personas inscritas a ciertos cursos, y permite visualizar los datos de esta en una tabla simple, añadir nuevos datos a la API mediante requests POST, modificar datos ya existentes, y eliminar personas de la API. *Creada para el Desafío Trinomio (2019) por Erik Bianco Vera.*

![](https://raw.githubusercontent.com/despediteerik/Trinomio-API/documentacion/img/snapshot.png?token=AIVICLU53OIRMDSHTOEMZDC6AKDXM)

## Contenido:
- [Instalación](#instalación)
- [Tutorial](#tutorial)
- [Changelog](#changelog)
- [Licencia](#licencia)

## Instalación:
Para revisar APIHook cómo el usuario final, podés usarlo on-line sin descargar nada en http://erik.games/apihook.

Por otro lado, para instalar APIHook manualmente en tu computadora:
- [Descarga la última versión de APIHook](https://github.com/despediteerik/Trinomio-API/releases). (También podés clonar master, descargandoló via este [link](https://github.com/despediteerik/Trinomio-API/archive/master.zip).)
- Extraé los datos de la carpeta.
- Abre el archivo "index.html" adentro de la carpeta en tu navegador de elección.

APIHook usa Javascript puro, para evitar tener que crear un servidor para acceder a los datos de la API (cómo lo haría si el sitio web usase PHP).

## Tutorial
APIHook tiene dos vistas: la visualización de la tabla con los datos de la API, y la creación (o modificación) de nuevas entradas a la API.

La *creación* de nuevas entradas puede ser encontrada presionando el Floating Action Button abajo a la derecha (el botón violeta con el símbolo de más). Presionandoló nos llevará a una nueva página, con un formulario de entrada donde podemos escribir el nombre, apellido y correo electrónico del usuario; y elegir con un selector múltiple todos los cursos en los que la persona está inscripta (buscados en api/courses). Llenar este formulario correctamente enviará una notificación a modo de *toast* al usuario para que vuelvan a la tabla a ver su nueva entrada (o quedarse a agregar más usuarios).

En la *tabla*, se pueden observar tres botones a la derecha de una entrada: Expandir, Modificar y Eliminar. Presionar "Expandir" mostrará todos los cursos en los que la persona seleccionada está inscrito (y dará la opción de, presionando el mismo botón, contraer para guardar espacio.) Eliminar, por otro lado, *eliminará* la entrada de usuario de la base de datos, junto con sus cursos; refrescará la vista de la tabla, y mostrará una notificación indicando que la persona fue eliminada de la API correctamente.

Modificar, sin embargo, enviará al usuario a el mismo formulario que si fueran a crear una nueva persona, pero alterado. Modificar una persona llena automáticamente los valores de la entrada a modificar (nombre, apellido, correo), y en vez de enviar una request POST a api/peoples, manda una request PUT a api/peoples/id. El resto de las características de modificar una entrada existente son las mismas que crear una entrada.

## Changelog
For changelogs, check out [the Releases section of materialize](https://github.com/Dogfalo/materialize/releases) or the [CHANGELOG.md](CHANGELOG.md).

## Licencia
APIHook es licensiado bajo The Unlicense. ¡Usá el código cómo quieras!
