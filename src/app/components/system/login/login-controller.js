export default ['$rootScope', '$scope', '$location', '$state', '$stateParams', '$cookies', 'LoginService', 'STATE', 'EVENT', 'COOKIE', 'DateUtils', LoginController];
function LoginController($rootScope, $scope, $location, $state, $stateParams, $cookies, LoginService, STATE, EVENT, COOKIE, DateUtils) {
	$scope.login_message = '';
	$scope.user = {username:"", password: ""};
	//onStart();

	// function onStart(){
	// 	// auto login
	// 	if($cookies.get(COOKIE.AUTH_TOKEN) !== undefined)
	// 	{
	// 		login($cookies.get(COOKIE.USERNAME), $cookies.get('password'));
	// 	}
	// }
	
	function login(username, password){
		$scope.onSaving = 1;
		LoginService.login(username, password).then(function(){
			$scope.onSaving = 0;
		}).catch(function(){
			$scope.onSaving = 0;
			$scope.login_message = 'Your login information was incorrect!';
		});
	}

	$scope.fncLogin = function() {
		login($scope.user.username, $scope.user.password);
	}
}