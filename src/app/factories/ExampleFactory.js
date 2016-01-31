angular.module('app')
	.factory('ExampleFactory', ExampleFactory);

	ExampleFactory.$inject = [];

	function ExampleFactory () {

		var factory = {
			someMethod : someMethod
		}

		function someMethod () {
			// code
		}

		return factory;
	}