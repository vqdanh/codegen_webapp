'use strict';
export default HeaderDirective;
function HeaderDirective() {
	"ngInject";

	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'src/app/components/shared/header/header-tpl.html',
		controller: 
		function($rootScope, $scope, $cookies, $location, $mdSidenav, $state, STATE, COOKIE, localStorageService, CodeGenConfig) {
			"ngInject";

			$scope.toogleLeftSideNavBar = function() {
				let sideId = 'main-sidenav';
				let toogled = $mdSidenav(sideId).toggle();
				$rootScope.$broadcast("$sidenav:toogle", {id:sideId})
			}

			$scope.fncLogout = function() {
				$rootScope.user = undefined;
				// delete session
				$cookies.put(COOKIE.USERNAME, undefined);
				$cookies.put('password', undefined);
				$cookies.put(COOKIE.AUTH_TOKEN, undefined);

				$state.go(STATE.LOGIN);
			}

			$scope.onActionClick = function(data, $event) {
				$rootScope.$broadcast('$headerToolbar:action', data);
			}

			$scope.onInvalidateStorage = function(){
				localStorageService.clearAll();
				CodeGenConfig.clearAll();
				$state.reload();
				
			}
		},
		link : function(scope, attrs, element){

		}
	}
}