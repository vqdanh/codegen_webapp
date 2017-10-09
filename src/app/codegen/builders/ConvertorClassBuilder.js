export default ConvertorClassBuilder;
function ConvertorClassBuilder($q, $http, StringUtils, Pluralize, CodeGenConfig, PropertyBuilder, MethodBuilder, ClassBuilder){
	"ngInject";
	
	let self;
	function BuilderProvider(name){
		self = this;
		ClassBuilder.getProvider().call(this, name);
	}
	BuilderProvider.prototype = Object.create(ClassBuilder.getProvider().prototype);

	BuilderProvider.prototype.buildInfo = function(infoContainer){
		self.infoContainer = infoContainer;

		let infoBuilder = {},
			entityClassInfo = infoContainer.entity, 
			eiClassInfo = infoContainer.ei;
		
		infoBuilder.imports = [];
		infoBuilder.abstractType = "class";
		infoBuilder.className = entityClassInfo.className +"Convertor";
		infoBuilder.annotations = ["@Service"];
		infoBuilder.extendedClasses = [
			{
				abstractType: "class",
				className: "AbstractObjectConvertor",
				genericTypes: [
					entityClassInfo,
					eiClassInfo
				]
			}
		]

		let eiPropertyInfos = [];
		// for (var i = 0; i < infoBuilder.propertyInfos.length; i++) {
		// 	let propInfo = infoBuilder.propertyInfos[i];
		// 	if(!propInfo.isRelationshipProperty){
		// 		propInfo.annotations = [];
		// 		eiPropertyInfos.push(propInfo);
		// 	}
		// }
		infoBuilder.propertyInfos = eiPropertyInfos;

		infoBuilder.methodInfos = [];
		let initTypeMethodInfo = {
			annotations:["@Override"],
			accessModifier : "protected",
			type : {className: "void"},
			name: "initTypes",
			args:[],
			body : [
			"this.clazzEntity = "+entityClassInfo.className+".class;",
			"this.clazzEI = "+eiClassInfo.className+".class;"
			],
			includesAnnotation: true
		}
		infoBuilder.methodInfos.push(initTypeMethodInfo);
		self.setInfo(infoBuilder);
		return self;
	}


	return {
		getProvider: function(){
			return BuilderProvider;
		},
		createInstance : function(){
			return new BuilderProvider("convertorBuilder");
		}
	}

}
