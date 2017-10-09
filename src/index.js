import App     from './app/app';

/**
* Manually bootstrap the application when AngularJS and
* the application classes have been loaded.
*/
angular
	.element( document )
	.ready(function() {
		angular
			.module('codegen-app-bootstrap', [
				App.name
			])
			.run(['$rootScope', '$location', '$cookies', '$window', '$timeout', '$state', 'STATE', 'COOKIE',
				($rootScope, $location, $cookies, $window, $timeout, $state, STATE, COOKIE)=> {
				
				// if($cookies.get(COOKIE.AUTH_TOKEN) == undefined)
				// {
				// 	console.debug('current state', $state.current.name);
				// 	if($state.current.name != STATE.LOGIN){
				// 		$state.go(STATE.LOGIN);
				// 	} else {
				// 		$state.go($state.current);
				// 	}
				// } else {
				// 	$state.go(STATE.DASHBOARD);
				// }
				
				//$state.go(STATE.DASHBOARD);
				$state.go(STATE.PROJECT.MANAGE);

			}]);

			let body = document.getElementsByTagName("body")[0];
			angular.bootstrap( body, [ 'codegen-app-bootstrap' ]);
			

	});