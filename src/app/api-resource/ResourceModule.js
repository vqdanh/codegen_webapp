import SystemConfigResource		from './SystemConfigResource';
import AbstractApiResource		from './AbstractApiResource';
import AuthResource 					from './AuthResource';
import ProjectResource				from "./ProjectResource";
import DatabaseResource				from './DatabaseResource';
import ObjectDataResource			from './ObjectDataResource';

export default angular.module('app.apiResource', [])
	.factory("SystemConfigResource", SystemConfigResource)
	.factory("AbstractApiResource", AbstractApiResource)
	.factory("AuthResource", AuthResource)
	.factory("ProjectResource", ProjectResource)
	.factory("DatabaseResource", DatabaseResource)
	.factory("ObjectDataResource", ObjectDataResource)
	.run(() => {
    console.debug("Starting the 'app.apiResource' module");
  });