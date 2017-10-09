export default DatabaseResource;

function DatabaseResource($state, $cookies, $q, $resource, STATE, COOKIE, SystemConfigResource, AbstractApiResource){
	"ngInject";
	
	let ngResource = AbstractApiResource.createResource({
		relativePath: "/api/v1/databases/:subPath/:catalogName",
		paramDefaults: {catalogName: "@catalogName"}
	});
	let resource = {

	};
	return angular.extend(ngResource, resource);
}