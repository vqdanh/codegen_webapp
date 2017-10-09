"use strict";
export default ProjectEditController;
function ProjectEditController($rootScope, $scope, $state, $stateParams, $location, $timeout, GlobalCache, STATE, EVENT, COOKIE, COMMON,
	StringUtils, SystemConfigResource, CodeGenConfig, UtilsService, ProjectService){
	"ngInject";
	$scope.projectId = $stateParams.id || 0;
	let viewName = "projectEdit_";

	$scope.onSaveClick = function(){
		ProjectService.save($scope.project, (response) => {
			$scope.project = response;
			$scope.projectId = $scope.project.id;
			if($state.current.name !== STATE.PROJECT.EDIT){
				 $state.go(STATE.PROJECT.EDIT, {id: $scope.projectId});
			} else{
				UtilsService.toastMessage("Saved data successfully!");
			}
		}, (error) => {
			console.log(error);
		});
	}
	/*********************************************/

	onStart();
	function onStart() {
		if($scope.projectId > 0){
			$scope.loadProjectInfo($scope.projectId, function onSuccess(response){
				$scope.project = angular.fromJson(response);
				$scope.projectId = $scope.project.id;
				initViewState();

				$scope.setActiveListItem({projectId: $scope.projectId, action: EVENT.ACTION.EDIT});
			});
		} else {
			$scope.project = {id: $scope.projectId};
			initViewState();
		}
	}

	function initViewState(){
		viewName += $scope.projectId;
		let splitPanes = [
			{
				elements: ['#split-pane1', '#split-pane2'],
				config: {
					sizes: [30,70],
					minSize: 200
				}
			}
		];
		CodeGenConfig.initViewState(viewName, {
			splitPanes: splitPanes
		});
	}
}