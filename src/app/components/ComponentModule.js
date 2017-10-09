import 'angular-file-saver';
import "angular-clipboard";

import Split from 'split.js';
import JSZip from 'jszip';
import 'jsonformatter';
import 'angular-spinners';
import ngRedux from 'ng-redux';

//import { combineReducers } from 'redux';
// import loggingMiddleware from './loggingMiddleware';
// import reducers from './reducers';
// import reducer3 from './reducer3';

import WidgetsModule 					from './widgets/WidgetsModule.js';


import SideNavbar							from './shared/side-navbar/side-navbar-directive';
import HeaderDirective				from './shared/header/header-directive';
import FooterDirective				from './shared/footer/footer-directive';

import ProjectComponentModule from './project/ProjectComponentModule.js';
import TableComponentModule from './table/TableComponentModule.js';

import SchemaManageDirective	from './schema/manage/schema-manage-directive';

export default angular
	.module('app.component', [
		'ngFileSaver',
		"angular-clipboard",
		'jsonFormatter',
		"angularSpinners",
		WidgetsModule.name,
		ProjectComponentModule.name,
		TableComponentModule.name,
		ngRedux
	])
	.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    let filtered = [];
	    angular.forEach(items, function(item) {
	      filtered.push(item);
	    });
	    filtered.sort(function (a, b) {
	      return (a[field] > b[field] ? 1 : -1);
	    });
	    if(reverse) filtered.reverse();
	    return filtered;
	  }
  })
	.directive('sideNavbar', SideNavbar)
	.directive('header', HeaderDirective)
	.directive('footer', FooterDirective)

	.directive('schemaManage', SchemaManageDirective)
	
	.factory("Split", function(){return Split;})
	.factory("JSZip", function(){return JSZip;})
	.config(($ngReduxProvider, JSONFormatterConfigProvider) => {
		"ngInject";
		JSONFormatterConfigProvider.hoverPreviewEnabled = true;
		//reducer3 = function(state, action){}
    //$ngReduxProvider.createStoreWith({
		//	reducer1: "reducer1",
		//	reducer2: function(state, action){},
			//reducer3: reducer3
		//}, ['promiseMiddleware', loggingMiddleware]);
  })

	.run(() => {
    console.debug("Starting the 'app.component' module");
  });