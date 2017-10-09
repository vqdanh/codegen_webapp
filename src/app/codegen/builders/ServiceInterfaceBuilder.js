export default ServiceInterfaceBuilder;
function ServiceInterfaceBuilder($q, $http, $resource, StringUtils, Pluralize, CodeGenConfig, PropertyBuilder, MethodBuilder, ClassBuilder){
	"ngInject";
	
	let self;
	function BuilderProvider(name){
		self = this;
		ClassBuilder.getProvider().call(this, name);
	}
	BuilderProvider.prototype = Object.create(ClassBuilder.getProvider().prototype);

	BuilderProvider.prototype.buildInfo = function(infoContainer){
		self.infoContainer = infoContainer;
		let entityInfo = infoContainer.entity,
				eiInfo = infoContainer.ei,
				convertorInfo = infoContainer.convertor;

		let infoBuilder = {};
		infoBuilder.imports = [];
		infoBuilder.abstractType = "interface";
		infoBuilder.className = entityInfo.className +"Service";
		infoBuilder.annotations = [];
		

		let eiPropertyInfos = [];
		// for (var i = 0; i < infoBuilder.propertyInfos.length; i++) {
		// 	let propInfo = infoBuilder.propertyInfos[i];
		// 	if(!propInfo.isRelationshipProperty){
		// 		propInfo.annotations = [];
		// 		eiPropertyInfos.push(propInfo);
		// 	}
		// }
		infoBuilder.propertyInfos = eiPropertyInfos;
		self.setInfo(infoBuilder);
		return self;
	}


	return {
		getProvider: function(){
			return BuilderProvider;
		},
		createInstance : function(){
			return new BuilderProvider("serviceBuilder");
		}
	}

}
