export default RepositoryClassBuilder;
function RepositoryClassBuilder($q, $http, $resource, StringUtils, Pluralize, CodeGenConfig, PropertyBuilder, MethodBuilder, ClassBuilder){
	"ngInject";

	let self;
	function BuilderProvider(name){
		self = this;
		ClassBuilder.getProvider().call(this, name);
	}
	BuilderProvider.prototype = Object.create(ClassBuilder.getProvider().prototype);

	BuilderProvider.prototype.buildInfo = function(infoContainer){
		self.infoContainer = infoContainer;

		let entityInfo = infoContainer.entity;
		let infoBuilder = {};
		infoBuilder.imports = [];
		infoBuilder.abstractType = "interface";
		infoBuilder.className = entityInfo.className +"Repository";
		infoBuilder.annotations = [];
		infoBuilder.propertyInfos = [];
		if(!entityInfo.isThirdTable){
			infoBuilder.extendedClasses = [
				{
					abstractType: "interface",
					name: "org.springframework.data.repository.PagingAndSortingRepository",
					className: "PagingAndSortingRepository",
					genericTypes: [
						angular.copy(entityInfo),
						entityInfo.primaryKey.type
					]
				}
			];
		}
		
		
		self.setInfo(infoBuilder);
		return self;
	}


	return {
		getProvider: function(){
			return BuilderProvider;
		},
		createInstance : function(){
			return new BuilderProvider("repositoryBuilder");
		}
	}

}
