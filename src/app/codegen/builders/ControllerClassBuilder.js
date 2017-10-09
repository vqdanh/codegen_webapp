export default ControllerClassBuilder;
function ControllerClassBuilder($q, $http, $resource, StringUtils, Pluralize, CodeGenConfig, PropertyBuilder, MethodBuilder, ClassBuilder){
	"ngInject";
	
	let self;
	function BuilderProvider(name){
		self = this;
		ClassBuilder.getProvider().call(this, name);
	}
	BuilderProvider.prototype = Object.create(ClassBuilder.getProvider().prototype);

	/**
	 * @param  {classInfos} {ei, service}
	 * @return {[type]}
	 */
	BuilderProvider.prototype.buildInfo = function(infoContainer){
		self.infoContainer = infoContainer;
		let entityInfo = infoContainer.entity,
				eiInfo = infoContainer.ei,
				serviceInfo = infoContainer.service,
				options = infoContainer.options || {};

		let infoBuilder = {};
		let restBasePath = options.restBasePath;
		infoBuilder.imports = [];
		infoBuilder.abstractType = "class";
		infoBuilder.className = entityInfo.className +"Controller";
		let apiPath = restBasePath+'/'+StringUtils.hyphenate(Pluralize(StringUtils.camelCase(entityInfo.className)));
		infoBuilder.annotations = [
			'@RestController',
			'@RequestMapping(path = "'+apiPath+'")',
			'@Api(value = "'+apiPath+'", tags = "'+entityInfo.className+'", description = "Operations about '+entityInfo.className+'")'
		];
		infoBuilder.extendedClasses = []

		infoBuilder.propertyInfos = [];
		let serviceProp = {
			annotations:["@Autowired"],
			type: serviceInfo,
			name: StringUtils.camelCase(serviceInfo.className)
		}

		infoBuilder.propertyInfos.push(serviceProp);

		infoBuilder.methodInfos = [];
		
		self.setInfo(infoBuilder);

		return self;	
	}


	return {
		getProvider: function(){
			return BuilderProvider;
		},
		createInstance : function(){
			return new BuilderProvider("controllerBuilder");
		}
	}

}