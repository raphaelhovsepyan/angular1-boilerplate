angular.module('app')
	.config(UIRouter);

	UIRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

	function UIRouter ($stateProvider, $urlRouterProvider) {
		$stateProvider.state('example-state', {
			url          : '/example-url',
			templateUrl  : '/app/views/example/index.html',
			controller   : 'ExampleController',
			controllerAs : 'exampleCtrl',
			data         : {
				// state-variables
			},
			resolve      : {
				// promises
			}
		});
	};