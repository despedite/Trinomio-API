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

![https://raw.githubusercontent.com/despediteerik/Trinomio-API/documentacion/img/snapshot.png?token=AIVICLU53OIRMDSHTOEMZDC6AKDXM]()

## Table of Contents
- [Quickstart](#quickstart)
- [Documentation](#documentation)
- [Supported Browsers](#supported-browsers)
- [Changelog](#changelog)
- [Testing](#testing)
- [Contributing](#contributing)
- [Copyright and license](#copyright-and-license)

## Quickstart:
Read the [getting started guide](http://materializecss.com/getting-started.html) for more information on how to use materialize.

- [Download the latest release](https://github.com/Dogfalo/materialize/releases/latest) of materialize directly from GitHub. ([Beta](https://github.com/Dogfalo/materialize/releases/))
- Clone the repo: `git clone https://github.com/Dogfalo/materialize.git` (Beta: `git clone -b v1-dev https://github.com/Dogfalo/materialize.git`)
- Include the files via [cdnjs](https://cdnjs.com/libraries/materialize). More [here](http://materializecss.com/getting-started.html). ([Beta](https://cdnjs.com/libraries/materialize/1.0.0-beta))
- Install with [npm](https://www.npmjs.com): `npm install materialize-css` (Beta: `npm install materialize-css@next`)
- Install with [Bower](https://bower.io): `bower install materialize` ([DEPRECATED](https://bower.io/blog/2017/how-to-migrate-away-from-bower/))
- Install with [Atmosphere](https://atmospherejs.com): `meteor add materialize:materialize` (Beta: `meteor add materialize:materialize@=1.0.0-beta`)

## Documentation
The documentation can be found at <http://materializecss.com>. To run the documentation locally on your machine, you need [Node.js](https://nodejs.org/en/) installed on your computer.

### Running documentation locally
Run these commands to set up the documentation:

```bash
git clone https://github.com/Dogfalo/materialize
cd materialize
npm install
```

Then run `grunt monitor` to compile the documentation. When it finishes, open a new browser window and navigate to `localhost:8000`. We use [BrowserSync](https://www.browsersync.io/) to display the documentation.

### Documentation for previous releases
Previous releases and their documentation are available for [download](https://github.com/Dogfalo/materialize/releases).

## Supported Browsers:
Materialize is compatible with:

- Chrome 35+
- Firefox 31+
- Safari 9+
- Opera
- Edge
- IE 11+

## Changelog
For changelogs, check out [the Releases section of materialize](https://github.com/Dogfalo/materialize/releases) or the [CHANGELOG.md](CHANGELOG.md).

## Testing
We use Jasmine as our testing framework and we're trying to write a robust test suite for our components. If you want to help, [here's a starting guide on how to write tests in Jasmine](CONTRIBUTING.md#jasmine-testing-guide).

## Contributing
Check out the [CONTRIBUTING document](CONTRIBUTING.md) in the root of the repository to learn how you can contribute. You can also browse the [help-wanted](https://github.com/Dogfalo/materialize/labels/help-wanted) tag in our issue tracker to find things to do.

## Copyright and license
Code Copyright 2018 Materialize. Code released under the MIT license.
