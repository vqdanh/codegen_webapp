import ConstantModule 			from './constants/ConstantModule';
export default angular
	.module('app.state', [
		ConstantModule.name
	])
	.config(
		($sceDelegateProvider, $httpProvider, $stateProvider, $urlRouterProvider, STATE) => {
			"ngInject";
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state(STATE.SYSTEM, {
				abstract: true,
				url:"",
				templateUrl: 'src/app/components/system/manage/system-manage-tpl.html',
				controller: 'SystemManageController'
			})
			.state(STATE.APPLICATION, {
				abstract: true,
				url:"",
				templateUrl: 'src/app/components/application/application-component-tpl.html',
				controller: 'ApplicationComponentController'
			})
			.state(STATE.LOGIN, {
				url:"/login",
				templateUrl: 'src/app/components/system/login/login-tpl.html',
				controller:'LoginController'
			})
			.state(STATE.DASHBOARD, {
				url:"/dashboard",
				templateUrl: 'src/app/components/dashboard/dashboard-tpl.html',
				controller:'DashboardController',
				controllerAs:'dashboard',
				data:{}
			})
			.state(STATE.PROJECT.name, {
				//abstract: true,
				url:"/projects",
				templateUrl: 'src/app/components/project/project-component-tpl.html',
				controller:'ProjectComponentController',
				data:{}
			})
			.state(STATE.PROJECT.MANAGE, {
				url:"/manage",
				templateUrl: 'src/app/components/project/manage/project-manage-tpl.html',
				controller:'ProjectManageController',
				data:{}
			})
			.state(STATE.PROJECT.NEW, {
				url:"/new",
				templateUrl: 'src/app/components/project/edit/project-edit-tpl.html',
				controller:'ProjectEditController',
				data:{}
			})
			.state(STATE.PROJECT.EDIT, {
				url:"/:id/edit",
				templateUrl: 'src/app/components/project/edit/project-edit-tpl.html',
				controller:'ProjectEditController',
				data:{}
			})
			.state(STATE.PROJECT.DEVELOP, {
				url:"/:id/develop",
				templateUrl: 'src/app/components/project/develop/project-develop-tpl.html',
				controller:'ProjectDevelopController',
				data:{}
			});

	})
	.run(() => {
    console.debug("Starting the 'app.state' module");
  });