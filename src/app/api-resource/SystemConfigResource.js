export default SystemConfigResource;

function SystemConfigResource($q, $http, $resource) {
	"ngInject";

	//production:
	// var host = "52.0.230.191";
	// var port = "8080";
	//test server:
	// var host = "52.0.230.191";
	// var port = "8080";
	

	// //development
	var host = "localhost";
	var port = "8888";
	return {
		getHost: function() {
			return host;
		}, 
		getPort: function() {
			return port;
		},
		getRootPath: function(){
			return "http://"+host+":"+port;
		},
		loadResource: function(resourceUrl){
			let deferred = $q.defer();
			$http.get(resourceUrl).then(function(response){
				deferred.resolve(response);
			}, function(error){
				deferred.reject(error);
			});
	    return deferred.promise;
		}
	}
}
