export default ObjectDataResource;

function ObjectDataResource($state, $cookies, $q, $resource, STATE, COOKIE, SystemConfigResource, AbstractApiResource){
	"ngInject";
	
	let ngResource = AbstractApiResource.createResource({
		relativePath: "/api/v1/object-datas/:id/:action",
		paramDefaults: {}
	});
	let resource = {
	};
	return angular.extend(ngResource, resource);
}