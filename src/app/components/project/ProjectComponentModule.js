import ProjectComponentController  	from './project-component-controller';
import ProjectManageController 			from './manage/project-manage-controller';
import ProjectEditController 				from './edit/project-edit-controller';
import ProjectDevelopController			from './develop/project-develop-controller';

import ProjectManageDirective				from './manage/project-manage-directive';
import ProjectConfigDirective				from './config/project-config-directive';


export default angular
	.module('app.component.project', [])
	.controller("ProjectComponentController", ProjectComponentController)
	.controller('ProjectManageController', ProjectManageController)
	.controller('ProjectEditController', ProjectEditController)
	.controller('ProjectDevelopController', ProjectDevelopController)

	.directive('projectManage', ProjectManageDirective)
	.directive('projectConfig', ProjectConfigDirective);