export default ServiceImplBuilder;
function ServiceImplBuilder($q, $http, $resource, StringUtils, Pluralize, CodeGenConfig, PropertyBuilder, MethodBuilder, ClassBuilder){
	"ngInject";
	
	let self;
	function BuilderProvider(name){
		self = this;
		ClassBuilder.getProvider().call(this, name);
	}
	BuilderProvider.prototype = Object.create(ClassBuilder.getProvider().prototype);

	/**
	 * @param  {classInfos} {entity, ei, convertor, repository}
	 * @return {[type]}
	 */
	BuilderProvider.prototype.buildInfo = function(infoContainer){
		self.infoContainer = infoContainer;
		let entityInfo = infoContainer.entity,
				eiInfo = infoContainer.ei,
				serviceInfo = infoContainer.service,
				convertorInfo = infoContainer.convertor,
				repositoryInfo = infoContainer.repository;

		let infoBuilder = {};
		
		infoBuilder.imports = [];
		infoBuilder.abstractType = "class";
		infoBuilder.className = entityInfo.className +"ServiceImpl";
		infoBuilder.annotations = ["@Service"];
		infoBuilder.implementInterfaces = [
			serviceInfo
		];
		// infoBuilder.extendedClasses = [
		// 	{
		// 		abstractType: "class",
		// 		name: infoBuilder.packageName+".AbstractObjectService",
		// 		className: "AbstractObjectService",
		// 		genericTypes: [
		// 			angular.copy(entityInfo),
		// 			angular.copy(eiInfo)
		// 		]
		// 	}
		// ]

		infoBuilder.propertyInfos = [];
		let convertorInjectProp = {
			annotations:["@Autowired"],
			type: convertorInfo,
			name: StringUtils.camelCase(convertorInfo.className)
		}, repositoryInjectProp = {
			annotations:["@Autowired"],
			type: repositoryInfo,
			name: StringUtils.camelCase(repositoryInfo.className)
		}

		infoBuilder.propertyInfos.push(convertorInjectProp);
		infoBuilder.propertyInfos.push(repositoryInjectProp);
		
		infoBuilder.methodInfos = [];
		
		self.setInfo(infoBuilder);
		return self;
	}


	return {
		getProvider: function(){
			return BuilderProvider;
		},
		createInstance : function(){
			return new BuilderProvider("serviceImplBuilder");
		}
	}

}
