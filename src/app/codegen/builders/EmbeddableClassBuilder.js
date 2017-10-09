export default EmbeddableClassBuilder;

function EmbeddableClassBuilder($q, $http, $resource, StringUtils, Pluralize, CodeGenConfig, PropertyBuilder, MethodBuilder, ClassBuilder){
	"ngInject";
	let self;
	function BuilderProvider(name){

		self = this;
		self.primaryKeyPropInfos = [];
		ClassBuilder.getProvider().call(this, name);
	}
	BuilderProvider.prototype =  Object.create(ClassBuilder.getProvider().prototype);

	
	BuilderProvider.prototype.buildInfo = function(infoContainer){
		self.infoContainer = infoContainer;
		self.setInfo(angular.copy(infoContainer));
		return self;
	}

	return {
		getProvider: function(){
			return BuilderProvider;
		},
		createInstance : function(){
			return new BuilderProvider("embeddableId");
		}
	};
}