export default AbstractApiResource;

function AbstractApiResource($state, $cookies, $q, $resource, STATE, COOKIE, SystemConfigResource){
	"ngInject";

	let defaultConfig = {
			relativePath:"",
			paramDefaults : {},
			actions : {
				post: {
					method: "POST"
				},
				update: {
					method: "PUT"
				}
			},
			options: {headers: {'Content-Type': 'application/json'}}
	}
	let config = {};
	let factory = {
		createResource : function(customConfig){
			config = angular.extend(defaultConfig, customConfig);
			return $resource(factory.getFullPath(), config.paramDefaults, config.actions, config.options);
		},
		getFullPath: function(){
			return SystemConfigResource.getRootPath() + config.relativePath;
		},
		getConfig: function(){
			return config;
		}
	}
	return factory;
}