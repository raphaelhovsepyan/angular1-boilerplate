angular.module('app', ['ui.router']);

// application routing
require('./bootstrap/routes');

// application controllers
require('./bootstrap/controllers');

// application directives
require('./bootstrap/directives');

// application factories
require('./bootstrap/factories');

// application providers
require('./bootstrap/providers');