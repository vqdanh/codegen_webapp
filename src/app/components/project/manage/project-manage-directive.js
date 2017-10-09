"use strict";
export default ProjectManageDirective;
function ProjectManageDirective($rootScope, $state, $stateParams, STATE){
	"ngInject";
	
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'src/app/components/project/manage/project-manage-tpl.html',
		controller: 'ProjectManageController',
		link: function(scope, element, attrs) {
			scope.onDevelopProjectClick = function(project){
				$state.go(STATE.PROJECT.DEVELOP, project);
			}

			scope.onEditProjectClick = function(project){
				$state.go(STATE.PROJECT.EDIT, project);
			}
		}
	}
}