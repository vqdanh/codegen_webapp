export default CodeGenConfigFactory;
function CodeGenConfigFactory($rootScope, $q, $resource, $timeout, localStorageService, Split, CACHE, ObjectDataService) {
	"ngInject";
	const DEFAULT_PATH = "resources/templates/default-global-config.json";
	let services = {
		clearAll: clearAll,
		initialize: initialize,
		createProjectConfigTemplate: createProjectConfigTemplate,
		createTabConfigTemplate: createTabConfigTemplate,
		createViewStateTemplate: createViewStateTemplate,

		setCustomSetting: setCustomSetting,
		getCustomSetting: getCustomSetting,

		getProjectConfig: getProjectConfig,
		setProjectConfig: setProjectConfig,

	 	addPackageConfig: addPackageConfig,
		getPackageConfigs: getPackageConfigs,

		

	 	saveViewState: saveViewState,
		initViewState: initViewState,
		updateViewState: updateViewState,
		updateSelectedTabIndex: updateSelectedTabIndex
	}

	let defaultSetting,
			defaultViewState,
			defaultTabConfig,
			defaultProjectConfig,
			currentSetting;


	return services;

	function clearAll(){
		currentSetting =  angular.copy(defaultSetting);
	}

	function initialize(){
		console.debug('CodeGenConfigFactory initializing...');
		let deferred = $q.defer();

		let dataApi = $resource(DEFAULT_PATH);
		dataApi.get(function(response){
			defaultSetting = angular.copy(response.setting);
			defaultViewState = angular.copy(response.templates.viewState);
			defaultTabConfig = angular.copy(response.templates.tabConfig);
			defaultProjectConfig = angular.copy(response.templates.projectConfig);
			_preProcessDefaultProjectConfig();
			_loadLocalSetting();
			deferred.resolve(currentSetting);
			console.debug('CodeGenConfigFactory initialized!');
			$timeout(function(){
				$rootScope.$broadcast("$CodeGenConfig:finishLoadConfig");
			},1000)
			
		}, function(error){
			console.log(error);
			deferred.reject(currentSetting);
		});

		return deferred.promise;		
	}
	/***private function***/
	function _loadLocalSetting(){
		let result = localStorageService.get(CACHE.GROUP.GLOBAL.KEYS.CONFIG) || defaultSetting;
	  currentSetting = angular.copy(result);
	  console.debug("_loadLocalSetting",currentSetting);
	}

	function _preProcessDefaultProjectConfig(){
		let packageConfigs = defaultProjectConfig.packageConfigs;
		let flattenArray =[];
		for (let i = 0; i < packageConfigs.length; i++) {
			let item = packageConfigs[i];
			item.name = defaultProjectConfig.groupId + "." + defaultProjectConfig.artifactId + "." + item.name;
			_buildPackageName(item, flattenArray);
		}
		defaultProjectConfig.packageConfigs = flattenArray;

	}

	function _buildPackageName(packageConfig, flattenArray){
		if(packageConfig.children){
			for (let i = 0, len = packageConfig.children.length; i < len; i++) {
				let child = packageConfig.children[i];
				child.name = packageConfig.name+"."+child.name;
				_buildPackageName(child, flattenArray);
			}
		}
		delete packageConfig.children;
		flattenArray.push(packageConfig);
	}

	/***public function***/

	function createProjectConfigTemplate(){
		return angular.copy(defaultProjectConfig);
	}

	function createTabConfigTemplate(){
		return angular.copy(defaultTabConfig);
	}
	
	function createViewStateTemplate(){
		return angular.copy(defaultViewState);
	}

	function getCustomSetting(){
		return currentSetting;
	}

	function setCustomSetting(globalConfig){
		localStorageService.set(CACHE.GROUP.GLOBAL.KEYS.CONFIG, globalConfig);
		currentSetting = angular.copy(globalConfig);
	}

	function getProjectConfig(projectId){
		let deferred = $q.defer();
		if(currentSetting.projectConfigs[projectId]){
			deferred.resolve(angular.copy(currentSetting.projectConfigs[projectId]));
		} else {
			ObjectDataService.getProjectConfig({projectId: projectId}, 
				function(response){
					let projectConfig = JSON.parse(response.data);
					setProjectConfig(projectId, projectConfig);
					deferred.resolve(projectConfig);
				}, function(error){
					deferred.reject(error);
				});
		}
		return deferred.promise;
	}

	function setProjectConfig(projectId, projectConfig){
		currentSetting.projectConfigs[projectId] = angular.copy(projectConfig);
		setCustomSetting(currentSetting);
	}

	function addPackageConfig(projectId, packageConfig){
		currentSetting.projectConfig.packageConfigs.push(angular.copy(packageConfig));
		setCustomSetting(currentSetting);
	}

	function getPackageConfigs(projectId){
		return angular.copy(currentSetting.projectConfig.packageConfigs);
	}


	function saveViewState(viewName, viewState) {
		currentSetting.viewStates[viewName] = angular.copy(viewState);
		console.debug('saveViewState: ' + viewName, viewState);
		setCustomSetting(currentSetting);
	}

	function _getViewState(viewName) {
		return angular.copy(currentSetting.viewStates[viewName]);
	}


	function initViewState(viewName, info){ 
		console.debug("init view state "+ viewName);
		let viewState = _getViewState(viewName);
		if(viewState === undefined){
			viewState = updateViewState(viewName, info);
		}
		_initSplitpanes(viewName);

		return viewState;

	}


	function updateViewState(viewName, info){
		let viewState = _getViewState(viewName);
		if(viewState === undefined){
			console.debug("create new viewState " + viewName);
			viewState = createViewStateTemplate();
		}
		if(info){
			if(info.splitPanes){
				viewState.splitPanes = info.splitPanes;
			}
			if(info.tabManage){
				viewState.tabManage.seletedTabKey = info.tabManage.seletedTabKey;
				viewState.tabManage.tabs = info.tabManage.tabs || [];
			}
		}
		saveViewState(viewName, viewState);
		return viewState;
	}

	function _initSplitpanes(viewName){
		//console.log("init ", viewName);
		let viewState = _getViewState(viewName);
		for (let i = 0; i < viewState.splitPanes.length; i++) {
			let spItem = viewState.splitPanes[i];
			let splitter, customConfig = angular.copy(spItem.config);
			customConfig.onDragEnd = function(){
				viewState.splitPanes[i].config.sizes = splitter.getSizes();
				let infoUpdate = {
					splitPanes: viewState.splitPanes
				}
				//console.log("onDragEnd", infoUpdate);
				updateViewState(viewName, infoUpdate);
			}
			splitter = Split(spItem.elements, customConfig);
		}
	}

	function updateSelectedTabIndex(viewName, seletedTabKey) {
		let viewState = _getViewState(viewName);
		viewState.tabManage.seletedTabKey = seletedTabKey;
		saveViewState(viewName, viewState);
	}
	


}