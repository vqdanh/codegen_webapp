export default LoginService;

function LoginService($state, $cookies, $q, STATE, COOKIE, AuthResource, SystemConfigResource){
	"ngInject";
	
	return{
		login : function(username, password){
			var deferred = $q.defer();
			AuthResource.login({
				username: username,
				password: password
			}, function(result) {
				$cookies.put(COOKIE.USERNAME, username);
				$cookies.put('password', password);
				$cookies.put(COOKIE.LAST_LOGIN_TIME, new Date().getTime());
				$cookies.put(COOKIE.AUTH_TOKEN, result.token);
				if($state.current.name == STATE.LOGIN){
					$state.go(STATE.DASHBOARD);
				} else {
					$state.go($state.current);
				}
				deferred.resolve(result);
			}, function(result) {
				deferred.reject(result);
			});
			return deferred.promise;
		}
	}
}