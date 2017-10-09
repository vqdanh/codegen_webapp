'use strict';
export default ResourceInterceptorFactory;

function ResourceInterceptorFactory($q, $cookies, $state, STATE, COOKIE) {
	"ngInject";
	
	let services = {
		'request': function(config) {
			config.headers['X-Authorization'] = 'Bearer ' + $cookies.get(COOKIE.AUTH_TOKEN);
			config.headers['X-Requested-With'] = 'XMLHttpRequest';
			return config;
		},
		'requestError': function(rejection) {
			return $q.reject(rejection);
		},
		'response': function(response) {
			return response;
		},
		'responseError': function(rejection) {
			if(rejection.status == 401) {
				services.expireCookie();
				if($state.current.name != STATE.LOGIN) {
					$state.go(STATE.LOGIN);
				}
			}
			return $q.reject(rejection);
		},
		'expireCookie': function(){
			// delete session
			$cookies.put(COOKIE.USERNAME, undefined);
			$cookies.put('password', undefined);
			$cookies.put(COOKIE.LAST_LOGIN_TIME, undefined);
			$cookies.put(COOKIE.AUTH_TOKEN, undefined);
		}
	};
	return services;
}