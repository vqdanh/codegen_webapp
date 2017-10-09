export default EIClassBuilder;
function EIClassBuilder($q, $http, $resource, StringUtils, Pluralize, CodeGenConfig, PropertyBuilder, MethodBuilder, ClassBuilder){
	"ngInject";
	
	let self;
	function BuilderProvider(name){
		self = this;
		ClassBuilder.getProvider().call(this, name);
	}
	BuilderProvider.prototype = Object.create(ClassBuilder.getProvider().prototype);
	BuilderProvider.prototype.buildInfo = function(infoContainer){
		self.infoContainer = infoContainer;
		let entityClassInfo = infoContainer.entity;
		let infoBuilder = {};
		infoBuilder.className ="EI" + entityClassInfo.className;
		infoBuilder.annotations = ['@Data'];
		infoBuilder.implementInterfaces=[
			{
				abstractType: "interface",
				packageName: "java.io",
				name: "java.io.Serializable", 
				className: "Serializable",
			}
		]
		infoBuilder.primaryKey = angular.copy(entityClassInfo.primaryKey);
		let eiPropertyInfos = [];
		for (var i = 0; i < entityClassInfo.propertyInfos.length; i++) {
			let propInfo = entityClassInfo.propertyInfos[i];
			if(!propInfo.isRelationshipProperty){
				propInfo.annotations = [];
				eiPropertyInfos.push(propInfo);
			}
		}
		infoBuilder.propertyInfos = eiPropertyInfos;
		self.setInfo(infoBuilder);
		return self;
	}
	

	return {
		getProvider: function(){
			return BuilderProvider;
		},
		createInstance : function(){
			return new BuilderProvider("eiBuilder");
		}
	};

}
