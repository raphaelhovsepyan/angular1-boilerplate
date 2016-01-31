angular.module('app')
	.directive('exampleDirective', ExampleDirective);
	
	ExampleDirective.$inject = [];
	
	function ExampleDirective () {
		var directive = {
			
			restrict : 'E',
			scope    : {},
			link     : link,
			controller : controller
		};

		function link(scope, element, attrs) {
			// code
		}

		controller.$inject = ['$scope'];
		
		function controller($scope) {
			// code
		}

		return directive;
	}