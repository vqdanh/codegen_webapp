"use strict";
export default ProjectDevelopController;
function ProjectDevelopController($rootScope, $scope, $state, $stateParams, $mdToast, $timeout, GlobalCache, STATE, EVENT, COOKIE, COMMON,
	StringUtils, SystemConfigResource, CodeGenConfig, UtilsService, ProjectService){
	"ngInject";

	let viewName = "projectDevelope";
	$scope.projectId = $stateParams.id;
	onStart();
	function onStart () {
		$scope.loadProjectInfo($scope.projectId, function onSuccess(response){
			$scope.project = response;
			$scope.projectId = response.id;
			viewName += $scope.projectId;
			initViewState();
			$scope.setActiveListItem({projectId: $scope.projectId, action: EVENT.ACTION.DEVELOP});
		});
	}

	$scope.$on('$schema-manage:onSelectTable', function($event, table){
		$scope.selectedTable = table;
	});

	/*********************************************/
	function initViewState(){
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