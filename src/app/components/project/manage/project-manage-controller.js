"use strict";
export default ProjectManageController;
function ProjectManageController($rootScope, $scope, $state, $stateParams, $mdToast, $timeout, GlobalCache, STATE, EVENT, COOKIE, COMMON,
	StringUtils, SystemConfigResource, CodeGenConfig, ProjectService){
	"ngInject";

	$scope.showDarkTheme = true;
	$scope.projects = [];

	onStart();
	function onStart(){
		ProjectService.getAll({}, function onSuccess(response){
			$scope.projects =  response.content;
			if($scope.setActiveListItem){
				$scope.setActiveListItem({});
			}
			
		}, function onFailuer(error){

		});
	}

	$scope.onAddNewProjectClick = function(){
		$state.go(STATE.PROJECT.NEW);
	}
}