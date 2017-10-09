export default ClassLoaderFactory;
function ClassLoaderFactory($q, $http, $resource, localStorageService, CACHE) {
	"ngInject";

	// template object
	// classManage = {
	// 	'packageConfig': {
	// 		'classes': {}
	// 	}
	// }

	let defaultClassLoaderInstance = {}, defaultPackage = { info: {}, classes: {}}, 
		instanceClassLoader;

	let services = {
		initialize: initialize,

		addPackage: addPackage,
		removePackage: removePackage,
		getPackage: getPackage,

		addClass: addClass,
		removeClass: removeClass,
		getClass: getClass
		
	}

	return services;

	function initialize(){
		saveInstance(defaultClassLoaderInstance);
	}

	function saveInstance(instanceObject){
		localStorageService.set(CACHE.GROUP.GLOBAL.KEYS.CLASSLOADER, angular.copy(instanceObject));
		instanceClassLoader = angular.copy(instanceObject);
	}

	function addPackage(packageConfigName, packageConfigInfo){
		instanceClassLoader[packageConfigName] = packageConfigInfo;
	  saveInstance(instanceClassLoader);
	}

	function getPackage(packageConfigName){
		return angular.copy(instanceObject[packageConfigName]) || angular.copy(defaultPackage);
	}

	function removePackage(packageConfigName){
	  delete instanceClassLoader[packageConfigName];
	  saveInstance(instanceClassLoader);
	}

	function addClass(packageConfigName, classInfo){
		//console.log('instanceClassLoader', instanceClassLoader);
		let packageConfig = instanceClassLoader[packageConfigName];
		if(packageConfig === undefined){
			packageConfig = angular.copy(defaultPackage);
		} 
		packageConfig.classes[classInfo.className] = angular.copy(classInfo);
	  instanceClassLoader[packageConfigName] = packageConfig;
	  saveInstance(instanceClassLoader);
	}

	function removeClass(packageConfigName, className){
	  delete instanceClassLoader[packageConfigName][className];
	  saveInstance(instanceClassLoader);
	}

	function getClass(packageConfigName, className){
		return angular.copy(instanceObject[packageConfigName][className]);
	}

}