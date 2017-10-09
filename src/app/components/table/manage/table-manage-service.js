export default TableManageService;
function TableManageService(){
	"ngInject";
	let tabConfigs = {
		sql: {
			ordinal: 0,
		 	displayName : "SQL Data"
		}, 
		entity: {
			ordinal: 10,
		 	displayName : "Entity"
		},
		ei: {
			ordinal: 20,
		 	displayName : "EI"
		}, 
		repository: {
			ordinal: 30,
		 	displayName : "Repository"
		}, 
		convertor: {
			ordinal: 40,
		 	displayName : "Convertor"
		}, 
		service: {
			ordinal: 50,
		 	displayName : "Service"
		}, 
		serviceImpl: {
			ordinal: 60,
		 	displayName : "ServiceImpl"
		}, 
		controller: {
			ordinal: 70,
		 	displayName : "Controller"
		}
	};
	let services = {
		getDefaultTabConfigs: getDefaultTabConfigs
	}

	return services;

	
	function getDefaultTabConfigs(){
		return angular.copy(tabConfigs);
	}
	
}