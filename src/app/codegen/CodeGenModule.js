import MethodBuilder					from './builders/MethodBuilder';
import PropertyBuilder				from './builders/PropertyBuilder';
import ClassBuilder 					from './builders/ClassBuilder';
import EntityBuilder					from './builders/EntityBuilder';
import EmbeddableClassBuilder	from './builders/EmbeddableClassBuilder';
import EIClassBuilder					from './builders/EIClassBuilder';
import RepositoryClassBuilder				from './builders/RepositoryClassBuilder';
import ConvertorClassBuilder				from './builders/ConvertorClassBuilder';
import ServiceInterfaceBuilder			from './builders/ServiceInterfaceBuilder';
import ServiceImplBuilder						from './builders/ServiceImplBuilder';
import ControllerClassBuilder 			from './builders/ControllerClassBuilder';
import JavaClassBuilder							from './factories/JavaClassBuilderFactory';
import ClassLoader						from './factories/ClassLoaderFactory';
import CodeGenConfig					from './factories/CodeGenConfigFactory';
import MethodTemplate 				from './factories/MethodTemplateFactory';




export default angular
	.module('codegen.core.services', [])
	.service('MethodBuilder', MethodBuilder)
	.service('PropertyBuilder', PropertyBuilder)
	.service('ClassBuilder', ClassBuilder)
	.service('EntityBuilder', EntityBuilder)
	.service('EmbeddableClassBuilder', EmbeddableClassBuilder)
	.service('EIClassBuilder', EIClassBuilder)
	.service('RepositoryClassBuilder', RepositoryClassBuilder)
	.service('ConvertorClassBuilder', ConvertorClassBuilder)
	.service('ServiceInterfaceBuilder', ServiceInterfaceBuilder)
	.service('ServiceImplBuilder', ServiceImplBuilder)
	.service('ControllerClassBuilder', ControllerClassBuilder)

	.factory('JavaClassBuilder', JavaClassBuilder)
	.factory('ClassLoader', ClassLoader)
	.factory('CodeGenConfig', CodeGenConfig)
	.factory('MethodTemplate', MethodTemplate)
	
	.run(['CodeGenConfig', 'ClassLoader', function(CodeGenConfig, ClassLoader) {
    console.debug("Starting the 'code.generator' module");
    CodeGenConfig.initialize();
    ClassLoader.initialize();
  }]);