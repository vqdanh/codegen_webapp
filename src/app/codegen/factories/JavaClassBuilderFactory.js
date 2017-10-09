export default JavaClassBuilderFactory;
function JavaClassBuilderFactory($q, $http, $resource, StringUtils, Pluralize, 
	EntityBuilder, EIClassBuilder, RepositoryClassBuilder, ConvertorClassBuilder, 
	ServiceImplBuilder, ServiceInterfaceBuilder, ControllerClassBuilder){
	"ngInject";

	let services = {
		createEntity: createEntity,
		createEIClass: createEIClass,
		createRepository: createRepository,
		createConvertor: createConvertor,
		createServiceInterface: createServiceInterface,
		createServiceImpl: createServiceImpl,
		createController: createController
	}
	return services;

	function createEntity(packageConfig, infoContainer){
		return executeBuilder(EntityBuilder, packageConfig, infoContainer);
	}

	function createEIClass(packageConfig, infoContainer){
		return executeBuilder(EIClassBuilder, packageConfig, infoContainer);
	}

	function createRepository(packageConfig, infoContainer){
		return executeBuilder(RepositoryClassBuilder, packageConfig, infoContainer);
	}	

	function createConvertor(packageConfig, infoContainer){
		return executeBuilder(ConvertorClassBuilder, packageConfig, infoContainer);
	}

	function createServiceInterface(packageConfig, infoContainer){
		return executeBuilder(ServiceInterfaceBuilder, packageConfig, infoContainer);
	}	

	function createServiceImpl(packageConfig, infoContainer){
		return executeBuilder(ServiceImplBuilder, packageConfig, infoContainer);
	}	

	function createController(packageConfig, infoContainer){
		return executeBuilder(ControllerClassBuilder, packageConfig, infoContainer);
	}	

	function executeBuilder(classBuilderFactory, packageConfig, infoContainer){
		return classBuilderFactory
						.createInstance()
						.setPackageName(packageConfig.name)
						.buildInfo(infoContainer)
						.build();
	}

}