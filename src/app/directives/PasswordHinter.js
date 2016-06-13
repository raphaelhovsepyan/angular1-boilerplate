angular.module('app')
	.directive('passwordHinter', PasswordHinter);
	
	PasswordHinter.$inject = [];
	
	function PasswordHinter () {
		var directive = {
			
			restrict : 'E',
			scope    : {
				ngModel : '='
			},
			link     : link,
			controller : controller,
			controllerAs : 'ctrl',
			templateUrl : "/app/views/templates/password-hinter.html"
		};

		function link(scope, element, attrs) {
			// code
		}

		controller.$inject = ['$scope'];
		
		function controller($scope) {
			var vm = this;
			vm.password = $scope.ngModel;
			vm.template = 'myPopoverTemplate.html';
			vm.rules = {
				letter: false,
				capital_letter: false,
				number: false,
				special_character: false,
				length: false
			};

			function validate () {
				vm.rules = {
					letter: (/[a-z]{1,}/.exec(vm.password) != null),
					capital_letter: (/[A-Z]{1,}/.exec(vm.password) != null),
					number: (/[0-9]{1,}/.exec(vm.password) != null),
					special_character: (/[\`\!\@\#\$\%\^\&\*\(\)\_\+\\\[\]\.\?\~\-\/\ ]{1,}/.exec(vm.password) != null),
					length: (vm.password.length >= 6)
				};
			}

			$scope.$watch('ngModel', function(n,o){
				vm.password = n;
				validate();
			})
		}

		return directive;
	}