export default TableManageDirective;
function TableManageDirective($rootScope, $state, $stateParams, $cookies, $timeout, $log, $q, $mdToast, Split, StringifyObject, 
	StringUtils, FileSaver, JSZip, clipboard, GlobalCache, STATE, EVENT, COOKIE, COMMON, CodeGenConfig, JavaClassBuilder, TableManageService){
	"ngInject";
	
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			project: "=?",
			table: "="
		},
		templateUrl: 'src/app/components/table/manage/table-manage-tpl.html',
		controller: ['$scope', function($scope) {
			let classBuilders = {};
			let viewName = "tableManage_", viewState, fixedTabsBuilder,
				tableTabDatas={}, tabKeys = [], additionalTabBuilder = {},
				delayTimeInMilisecond = 0;
			$scope.selectedTabIndex = -1;
			$scope.toolBarConfig = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
      };
      $scope.clipboardSupported = clipboard.supported;

			let unbindProjectWatcher, unbindTableWatcher, unBindSelectedTabWatcher;

			unbindProjectWatcher = $scope.$watch('project', function(newVal, oldVal){
				if(unbindTableWatcher){
					unbindTableWatcher();
				}
				if(newVal){
					viewName += $scope.project.id;
					onLoadProjectConfig();

					unbindTableWatcher = $scope.$watch('table', function(newVal, oldVal){
						if(newVal){
							$timeout(function() {
								initViewState();
							});
						}
					});
				}
			});

			$scope.$on("$tableEdit:updatePackageConfig", function(event, data){
					console.log("update packageConfig ", viewState.tabManage.tabs[data.index]);
					CodeGenConfig.updateViewState(viewName, viewState);
					startBuildClasses();
					
			});

      $scope.onSaveFileClick = function(){
      	let data = new Blob([$scope.selectedTab.data.sourceContent], { type: 'text/plain;charset=utf-8' });
    		FileSaver.saveAs(data, tab.data.fileName);
      }

      $scope.onSaveAllFileClick = function(){
      	let zipper = new JSZip();
      	for (let key in classBuilders){
      		let content = classBuilders[key].getContent();
      		let classInfo = classBuilders[key].getInfo();
      		zipper.file(classInfo.className + ".java", content);
      	}

      	zipper.generateAsync({type:"blob"}).then(function (blob) { 
      		FileSaver.saveAs(blob, classBuilders.entity.getInfo().className + "_feature.zip");
		    }, function (err) {
		       console.log(err);
		    });
      }

      $scope.onCopyToClipBoardClick = function(){
      	clipboard.copyText($scope.selectedTab.data.sourceContent);

      	let toast = $mdToast.simple()
		      .textContent('The source code has been copied!')
		      .highlightAction(true)
		      .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
		      .position("top right");
		    $mdToast.show(toast);
      }

      $scope.onTabSelected = function(tabData){
      	console.log("onTabSelected, tabKey", tabData);
      	$scope.selectedTab = tabData;
				viewState.tabManage.seletedTabKey = tabData.info.tabKey;
				CodeGenConfig.updateViewState(viewName, viewState);
      }

//================END SCOPE DECLEARATION=======================
      function onLoadProjectConfig(){
      	CodeGenConfig.getProjectConfig($scope.project.id)
      		.then(function(response){
      			$scope.projectConfig = response;
      			//console.log(response);
      		}, function(error){
      			console.error("Cannot getProjectConfig", error);
      		});
      }

			function initViewState() {
				delayTimeInMilisecond = 0;
				viewState = CodeGenConfig.initViewState(viewName);
				initFixedTabBuilders();
			}
			
			function createNewTab(options){

				let tabInfoObject = CodeGenConfig.createTabConfigTemplate();
				let defaultPackageConfig = $scope.projectConfig.packageConfigs[0];
				tabInfoObject = angular.extend({}, tabInfoObject, {
					tabKey: options.tabKey,
					ordinal: options.ordinal,
					displayName : options.tabName,
					configData: {
						packageConfig: defaultPackageConfig,
						language: options.language,
					}
				});
				console.log(tabInfoObject);
				return {
					info: tabInfoObject,
					data:{}
				}
			}

			function updateRealTab(tabKey, tabData){
				if($scope.tabs == undefined) {
					$scope.tabs = {};
				}
				$scope.tabs[tabKey] = angular.copy(tabData);
			}

			function initFixedTabBuilders(){
				if(fixedTabsBuilder == undefined){
					fixedTabsBuilder = {};
					tableTabDatas = TableManageService.getDefaultTabConfigs();
					tabKeys = Object.keys(tableTabDatas);
					
					if(angular.equals({}, viewState.tabManage.tabs)) {
						let cacheTabInfo = {};
						for (let tabKey in tableTabDatas) {
							let options = {
								tabKey: tabKey,
								tabName: tableTabDatas[tabKey].displayName,
								ordinal: tableTabDatas[tabKey].ordinal,
								language: "java"
							}
							fixedTabsBuilder[tabKey] = createNewTab(options)
							cacheTabInfo[tabKey] = angular.copy(fixedTabsBuilder[tabKey]);
						}

						viewState.tabManage.tabs = cacheTabInfo;
						viewState.tabManage.seletedTabKey = tabKeys[0];
						CodeGenConfig.updateViewState(viewName, viewState);
					} else {
						tableTabDatas = angular.copy(viewState.tabManage.tabs);
						tabKeys = Object.keys(viewState.tabManage.tabs);
						for (let tabKey in viewState.tabManage.tabs) {
							fixedTabsBuilder[tabKey] = tableTabDatas[tabKey];
						}
					}
					
				}

				let tabDataObject = {
					rawData: angular.copy($scope.table),
					sourceContent: StringifyObject(angular.copy($scope.table), {
						indent: '  ',
						singleQuotes: false
					}),
					fileName: $scope.table.displayName   +".json"
				}

				console.log(fixedTabsBuilder);
				let sqlTabKey = 'sql';
				fixedTabsBuilder[sqlTabKey].info.configData.language = 'json';
				fixedTabsBuilder[sqlTabKey].data = tabDataObject;
				updateRealTab(sqlTabKey, fixedTabsBuilder[sqlTabKey]);
				startBuildClasses();

				
			}

			function startBuildClasses(){
				for (let key in fixedTabsBuilder) {
					if(fixedTabsBuilder[key].info.configData.packageConfig == undefined){
						return;
					}
				}

				buildEntityClass("entity")
					.then(function(entityBuilder){
						buildRepositoryClass("repository");
						buildEIClass("ei").then(function(eiBuilder){
							buildConvertorClass("convertor").then(function(convertorBuilder){
								buildObjectServiceClass("service").then(function(serviceBuilder){
									buildObjectServiceClassImpl("serviceImpl").then(function(serviceImplBuilder){
										buildObjectControllerClass("controller");
										console.log($scope.tabs);
										if($scope.selectedTabIndex < 0){
											$timeout(function(){
												$scope.selectedTabIndex = tabKeys.indexOf(viewState.tabManage.seletedTabKey);
											}, delayTimeInMilisecond)
										}
										
									});
						 		});
							});
						});
					});
			}


			function updateTabData(tabKey, classBuilder) {
				let currentTab = fixedTabsBuilder[tabKey];
				currentTab.data.rawData = classBuilder;
				currentTab.data.sourceContent = classBuilder.getContent();
				currentTab.data.fileName = classBuilder.getInfo().className+".java";

				for (let classKey in classBuilder.nestedClassBuilderMap) {
					let options = {
						tabKey: classKey,
						tabName: classKey,
						ordinal: currentTab.ordinal+1,
						language: "java"
					}
					let nc = classBuilder.nestedClassBuilderMap[classKey],
						newTab = createNewTab(options);
					
					newTab.data.rawData = nc;
					newTab.data.sourceContent = nc.getContent();
					newTab.data.fileName = nc.getInfo().className+".java";
					additionalTabBuilder[classKey] = newTab;
				}

				if($scope.tabs[tabKey] == undefined){
					delayTimeInMilisecond += 50;
				}

				$timeout(function(){
					updateRealTab(tabKey, fixedTabsBuilder[tabKey]);
					for (let key in additionalTabBuilder){
						updateRealTab(key, additionalTabBuilder[key]);
					}
				}, delayTimeInMilisecond)
				
			}

			function buildEntityClass(tabKey){
				let packageConfig = fixedTabsBuilder[tabKey].info.configData.packageConfig;
				let infoContainer = {table: $scope.table};
				let deferred = $q.defer();
				JavaClassBuilder
					.createEntity(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						classBuilders.entity = builder;
						updateTabData(tabKey, builder);
						return deferred.resolve(builder);
					}, function onFailure(error){
						return deferred.reject(error);
					});

				return deferred.promise;
			}

			function buildEIClass(tabKey){
				let packageConfig = fixedTabsBuilder[tabKey].info.configData.packageConfig;
				let infoContainer = {
					entity: classBuilders.entity.getInfo()
				};
				let deferred = $q.defer();
				JavaClassBuilder
					.createEIClass(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						classBuilders.ei = builder;
						updateTabData(tabKey, builder);
						return deferred.resolve(builder);
					}, function onFailure(error){
						return deferred.reject(error);
					});
				return deferred.promise;
			}

			function buildRepositoryClass(tabKey){
				let packageConfig = fixedTabsBuilder[tabKey].info.configData.packageConfig;
				let infoContainer = {
					entity: classBuilders.entity.getInfo()
				};
				let deferred = $q.defer();
				JavaClassBuilder
					.createRepository(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						classBuilders.repository = builder;
						updateTabData(tabKey, builder);
						return deferred.resolve(builder);
						classBuilders.repository = builder;
					}, function onFailure(error){
						return deferred.reject(error);
					});
				return deferred.promise;
			}

			function buildConvertorClass(tabKey){
				let packageConfig = fixedTabsBuilder[tabKey].info.configData.packageConfig;
				let infoContainer = {
					entity: classBuilders.entity.getInfo(),
					ei: classBuilders.ei.getInfo()
				};
				let deferred = $q.defer();
				JavaClassBuilder
					.createConvertor(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						classBuilders.convertor = builder;
						updateTabData(tabKey, builder);
						return deferred.resolve(builder);
					}, function onFailure(error){
						return deferred.reject(error);
					});
				return deferred.promise;
			}

			function buildObjectServiceClass(tabKey){
				let packageConfig = fixedTabsBuilder[tabKey].info.configData.packageConfig;
				let infoContainer = {
					entity: classBuilders.entity.getInfo(),
					ei: classBuilders.ei.getInfo(),
					repository: classBuilders.repository.getInfo(),
					convertor: classBuilders.convertor.getInfo()
				};
				let deferred = $q.defer();
				JavaClassBuilder
					.createServiceInterface(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						classBuilders.service = builder;
						updateTabData(tabKey, builder);
						return deferred.resolve(builder);
					}, function onFailure(error){
						return deferred.reject(error);
					});
				return deferred.promise;
			}

			function buildObjectServiceClassImpl(tabKey){
				let packageConfig = fixedTabsBuilder[tabKey].info.configData.packageConfig;
				let infoContainer = {
					entity: classBuilders.entity.getInfo(),
					ei: classBuilders.ei.getInfo(),
					repository: classBuilders.repository.getInfo(),
					service: classBuilders.service.getInfo(),
					convertor: classBuilders.convertor.getInfo(),
					repository: classBuilders.repository.getInfo()
				};
				let deferred = $q.defer();
				JavaClassBuilder
					.createServiceImpl(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						classBuilders.serviceImpl = builder;
						updateTabData(tabKey, builder);
						return deferred.resolve(builder);

					}, function onFailure(error){
						return deferred.reject(error);
					});
				return deferred.promise;
			}

			function buildObjectControllerClass(tabKey){
				let packageConfig = fixedTabsBuilder[tabKey].info.configData.packageConfig;
				let infoContainer = {
					entity: classBuilders.entity.getInfo(),
					ei: classBuilders.ei.getInfo(),
					service: classBuilders.service.getInfo(),
					options: $scope.projectConfig.data
				};
				let deferred = $q.defer();
				JavaClassBuilder
					.createController(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						classBuilders.controller = builder;
						updateTabData(tabKey, builder);
						return deferred.resolve(builder);

					}, function onFailure(error){
						return deferred.reject(error);
					});
				return deferred.promise;
			}

		}],
		link: function(scope, element, attrs) {

			
		}
	}
}