// load libraries
import 'angular-animate';
import 'angular-aria';
import 'angular-cookies';
import 'angular-material';
import 'angular-messages';
import 'angular-resource';
import 'angular-material-data-table';
import 'angular-material-fileinput';
import 'moment';
import 'angular-material-datetimepicker';
import 'angular-ui-router';
import 'angular-sanitize';
import 'angular-highlightjs';
import 'angular-local-storage';

//-------------------
import ConstantModule 			from './constants/ConstantModule';
import ServiceModule 				from './service/ServiceModule';
import ComponentModule 			from './components/ComponentModule';
import FactoryModule 				from './factories/FactoryModule';
import ResourceModule 			from './api-resource/ResourceModule';
import StateModule 					from './StateModule';


//------------------ 

import SystemManageController 					from './components/system/manage/system-manage-controller';
import ApplicationComponentController 	from './components/application/application-component-controller';

import LoginController									from './components/system/login/login-controller';
import DashboardController							from './components/dashboard/dashboard-controller';


export default angular
	.module('app.controller', [
		'ngAnimate',
		'ngAria',
		'ngCookies',
		'ngMaterial',
		'ngMessages',
		'ngResource',
		'ui.router',
		'md.data.table',
		'lfNgMdFileInput',
		'ngMaterialDatePicker',
		'ngSanitize',
		'hljs',
		'LocalStorageModule',
		ConstantModule.name,
		ServiceModule.name, 
		ComponentModule.name,
		StateModule.name,
		FactoryModule.name,
		ResourceModule.name

	])
	.config(($mdIconProvider, $mdThemingProvider, $sceDelegateProvider, $httpProvider, $stateProvider, $urlRouterProvider, localStorageServiceProvider, STATE) => {
			"ngInject";
		$mdIconProvider
			.defaultIconSet("./assets/icons/avatars.svg", 128)
			.icon("menu", "./assets/icons/menu.svg", 24)
			.icon("share", "./assets/icons/share.svg", 24)
			.icon("google_plus", "./assets/icons/google_plus.svg", 24)
			.icon("hangouts", "./assets/icons/hangouts.svg", 24)
			.icon("twitter", "./assets/icons/twitter.svg", 24)
			.icon("phone", "./assets/icons/phone.svg", 24)
			.icon("logo_white", "./assets/images/logo-white.svg", 24)
			.icon("logo", "./assets/images/logo.png", 90)
			.icon("spin", "./assets/images/spin.svg", 30);

		$mdThemingProvider
			.theme('default')
			.primaryPalette('teal')
			.accentPalette('red');

		$mdThemingProvider
			.theme('blue-gray').backgroundPalette('blue').dark();

		localStorageServiceProvider
			.setPrefix('codegen');
		//$httpProvider.interceptors.push('ResourceInterceptor');
	})
	.filter('keyboardShortcut', function($window) {
    return function(str) {
      if (!str) return;
      var keys = str.split('-');
      var isOSX = /Mac OS X/.test($window.navigator.userAgent);

      var seperator = (!isOSX || keys.length > 2) ? '+' : '';

      var abbreviations = {
        M: isOSX ? '⌘' : 'Ctrl',
        A: isOSX ? 'Option' : 'Alt',
        S: 'Shift'
      };

      return keys.map(function(key, index) {
        var last = index == keys.length - 1;
        return last ? key : abbreviations[key];
      }).join(seperator);
    };
  })
  .controller('SystemManageController', SystemManageController)
	.controller('ApplicationComponentController',ApplicationComponentController)
	.controller('LoginController', LoginController)
	.controller('DashboardController', DashboardController)
	
	.run(() => {
    console.debug("Starting the 'app.controller' module");
  });