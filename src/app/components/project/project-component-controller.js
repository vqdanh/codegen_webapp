 "use strict";
export default ProjectComponentController;

function ProjectComponentController($rootScope, $scope, $state, $stateParams, $cookies, $location, $timeout, Split, GlobalCache, 
	STATE, EVENT, COOKIE, COMMON, CodeGenConfig, UtilsService, ProjectService) {
	"ngInject";

	$scope.recentProjects = {};
	$scope.activeListItem = {};

	$scope.setActiveListItem = function(info){
		$scope.activeListItem = info || {};
	}

	$scope.loadProjectInfo = function (projectId, onSuccessCallback, onFailureCallback) {
		$scope.currentProjectId = projectId;
		UtilsService.startSpinner();
		ProjectService.getOne({id: projectId}, (response) => {
			if(response.id > 0){
				if(onSuccessCallback){
					onSuccessCallback(response);
				}
				if($scope.recentProjects[response.id] == undefined){
					$scope.recentProjects[response.id] = angular.copy(response);
				}
				UtilsService.stopSpinner();
			} else {
				UtilsService.toastMessage("Invalid select project")
				$state.go(STATE.PROJECT.MANAGE);
			}
		}, (error) => {
			console.log(error);
			if(onFailureCallback){
				onFailureCallback(error);
			}
			UtilsService.stopSpinner();
		});
	}



	$scope.goToProjectManage = function(){
		$state.go(STATE.PROJECT.MANAGE);
	}

	$scope.onDevelopProjectClick = function(project){
		$state.go(STATE.PROJECT.DEVELOP, project, {reloadOnSearch: false});
	}

	$scope.onEditProjectClick = function(project){
		$state.go(STATE.PROJECT.EDIT, project);
	}
}