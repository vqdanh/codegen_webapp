'use strict';
export default  SystemManageController;

function SystemManageController($rootScope, $scope, $state, $stateParams, $cookies, $timeout, UtilsService, COMMON, COOKIE, EVENT, STATE){
	"ngInject";
	$rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

	$scope.mainSideNav = {
		headerData: {
	  	title: "CODEGEN",
	  	icon:"brackets-enclosing-a-hexagon.svg"
	  },
		menuItems: [
			{
				state: STATE.DASHBOARD,
				name:"Dashboard",
				icon:"icon icon-meter"
			}
		]
	}

	$scope.isAuthenticated = function(){
		return $cookies.get(COOKIE.AUTH_TOKEN) != null;
	}

	$scope.startSpinner = UtilsService.startSpinner;
	$scope.stopSpinner = UtilsService.stopSpinner;
}