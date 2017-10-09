import CodeGeneratorModule 	from './../codegen/CodeGenModule';

import UtilsService					from './UtilsService';
import LoginService					from './LoginService';
import ProjectService				from './ProjectService';
import DatabaseService			from './DatabaseService';
import ObjectDataService		from './ObjectDataService';

export default angular.module('app.service', [
	CodeGeneratorModule.name
	])
	.service('UtilsService', UtilsService)
	.service('LoginService', LoginService)
	.service('ProjectService', ProjectService)
	.service('DatabaseService', DatabaseService)
	.service('ObjectDataService', ObjectDataService)
	.run(() => {
    console.debug("Starting the 'app.service' module");
  });