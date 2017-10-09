export default AuthResource;

function AuthResource($state, $cookies, $q, $resource, STATE, COOKIE, SystemConfigResource){
	"ngInject";

	let resource = $resource(SystemConfigResource.getRootPath()+'/api/auth/login', {},
	{
		login: {
			method: 'POST',
			headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'}
		}
	});
	return resource;
}