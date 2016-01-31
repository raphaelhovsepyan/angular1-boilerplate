angular.module('app')
	.provider('ExampleProvider', ExampleProvider);

	ExampleProvider.$inject = [];

	function ExampleProvider () {
		var provider = {
			
			$get       : get,
			someMethod : someMethod
		}

		function get () {
			// code
		}

		function someMethod () {
			// code
		}

		return provider;
	}