export default ProjectResource;

function ProjectResource($state, $cookies, $q, $resource, STATE, COOKIE, SystemConfigResource, AbstractApiResource){
	"ngInject";
	
	let ngResource = AbstractApiResource.createResource({
		relativePath: "/api/v1/projects/:id",
		paramDefaults: {}
	});
	let resource = {
	};
	return angular.extend(ngResource, resource);
}