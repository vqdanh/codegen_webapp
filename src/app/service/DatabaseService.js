export default DatabaseService;
function DatabaseService(DatabaseResource){
	"ngInject";
	let params = {
		subPath:""
	}
	let services = {
		getAll : function(connInfo, onSuccess, onFailure) {
			return DatabaseResource.post({subPath: 'all'}, connInfo, onSuccess, onFailure);
		},
		getOne : function(data, onSuccess, onFailure){
			return DatabaseResource.post({subPath: 'catalog', catalogName: data.catalogName}, data.connInfo, onSuccess, onFailure);
		}
	}
	return services;
}