export default SchemaManageDirective;
function SchemaManageDirective($rootScope, $state, $stateParams, $cookies, $timeout, $q, CodeGenConfig, GlobalCache, 
	STATE, EVENT, COOKIE, COMMON, FileSaver, JSZip, JavaClassBuilder, DatabaseService){
	"ngInject";
	
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			project: "="
		},
		templateUrl: 'src/app/components/schema/manage/schema-manage-tpl.html',
		controller: ['$scope', function($scope) {
			let tabKeys = ['connection', 'schemaSql', 'tables'];
			$scope.selectedTableIndex = -1;
			let viewName = "schemaManage", viewState, projectConfig;

			$scope.dbConnection = {
				host: "localhost",
				port: "3306",
				username: "root",
				password: "root",
			}

			$scope.onConnectClick = function($event){
				DatabaseService.getOne(
					{ connInfo: $scope.dbConnection, catalogName: $scope.catalogName},
				 	function(response) {
						$scope.schema = response;
						onStart();
					}, function(error){
						console.log(error);
				});
			}

			$scope.onSelectedTab = function(tabKey){
				if(viewState){
					viewState.tabManage.seletedTabKey = tabKey;
					CodeGenConfig.updateViewState(viewName, viewState);
				}
				
			}

			$scope.onSelectTable = function(table, idx){
				$scope.selectedTableName = table.name;
				$scope.$emit("$schema-manage:onSelectTable", table);
			}



			$scope.$watch("project", function(newVal, oldVal){
				if(newVal !== undefined){
					$scope.catalogName = $scope.project.databaseName;
					$scope.onConnectClick(null);
				}
			});

			function onStart(){
				processTableConstraint($scope.schema);
				let clone = angular.copy($scope.schema);
				clone.tableInfos = clone.tableInfos.length + " tables";
				$scope.schemaJson = clone; 
				viewState = CodeGenConfig.initViewState(viewName);
				$scope.selectedTabIndex = Math.max(tabKeys.indexOf(viewState.tabManage.seletedTabKey), 0);
				CodeGenConfig
					.getProjectConfig($scope.project.id)
					.then(function(result){
						projectConfig = result;
					}, function(error){
						console.log(error);
					})
			}


			$scope.$on("$headerToolbar:action", function($event, data){

				if(data == "All"){
					
					let promises = [], tableBuilderContainers = [];
					for (let i = 0, l = $scope.schema.tableInfos.length; i < l; i++) {
						let tableInfo = $scope.schema.tableInfos[i];
						let itemBuilderContainer = {};
						tableBuilderContainers.push(itemBuilderContainer);
						let promise = asyncProcessBuildFeature(tableInfo, itemBuilderContainer);
						promises.push(promise);
					}
					$q.all(promises).then(function(builderContainers){
						let zipper = new JSZip();
						
						for (let i = 0; i < builderContainers.length; i++) {
							let container = builderContainers[i];
							for (let key in container) {
								addClassContentToZipfile(container[key], zipper);
							}
						}
						zipper.generateAsync({type:"blob"}).then(function (blob) { 
		      		FileSaver.saveAs(blob, projectConfig.displayName+".zip");
				    }, function (err) {
				       console.log(err);
				    });
					});
				}

				if(data == "Entities"){
					
					let promises = [];
					for (let i = 0, length = $scope.schema.tableInfos.length; i < length; i++) {
						let tableInfo = $scope.schema.tableInfos[i];

						let promise = JavaClassBuilder.createEntity({table:tableInfo});
						promises.push();
					}
					$q.all(promises).then(function(builders){
						
						let zipper = new JSZip();
						for (let i = 0; i < builders.length; i++) {
							addClassContentToZipfile(builders[i], zipper);
						}

						zipper.generateAsync({type:"blob"}).then(function (blob) { 
		      		FileSaver.saveAs(blob, "Entities.zip");
				    }, function (err) {
				       console.log(err);
				    });
					});
				}


			});

			function addClassContentToZipfile(builder, zipper){
				let classInfo = builder.getInfo();
				let folderPath = classInfo.packageDisplayName.split(".").join("/");
				zipper.folder(folderPath).file(classInfo.className+".java", builder.getContent());
			}


			function processTableConstraint(schema){
				// find OneToMany relationship
				let relationships = schema.tableConstraints.reduce(function(tableConts, cont){
					if(tableConts[cont.tableName] === undefined){
						tableConts[cont.tableName] = {
							tableName: cont.tableName,
							pkCount: 0,
							oneToMany: [],
							manyToOne: []
						}
					} 

					tableConts[cont.tableName].pkCount++;
					tableConts[cont.tableName].oneToMany.push(cont.refTableName);
					return tableConts;
				}, {});

				// find ManyToOne relationship
				relationships = schema.tableConstraints.reduce(function(tableConts, cont){
					if(tableConts[cont.refTableName]){
						if(tableConts[cont.refTableName].tableName !== cont.tableName){
							tableConts[cont.refTableName].manyToOne.push(cont.tableName);
						}
					} else {
						console.warn("cannot find table by cont.refTableName = ", cont.refTableName);
					}
					return tableConts;
				}, relationships);

				for (var i = 0; i < schema.tableInfos.length; i++) {
					let tableInfo = schema.tableInfos[i];
					let relationship = relationships[tableInfo.name];
					if(relationship){
						relationship.manyToMany = relationship.oneToMany.filter((t)=> relationship.manyToOne.includes(t));
						tableInfo.relationship = angular.copy(relationship);
					}
					
				}
			}

			

			function getPackageConfigByDisplayName(packageDisplayName){
				for (let i = 0; i < projectConfig.packageConfigs.length; i++) {
					let pc = projectConfig.packageConfigs[i];
					if(pc.displayName == packageDisplayName){
						return pc;
					}
				}
			}

			function asyncProcessBuildFeature(tableInfo, tableBuilderContainer){
				let deferred = $q.defer();
				asyncBuildEntityClass("Entities", tableInfo, tableBuilderContainer)
					.then(function(entityBuilder){
						asyncBuildRepositoryClass("Repositories", tableBuilderContainer);
						asyncBuildEIClass("Exchange Interface", tableBuilderContainer).then(function(tableBuilderContainer){
							asyncBuildConvertorClass("Convertors", tableBuilderContainer).then(function(tableBuilderContainer){
								asyncBuildObjectServiceClass("Services", tableBuilderContainer).then(function(tableBuilderContainer){
									asyncBuildObjectServiceClassImpl("Service Impl", tableBuilderContainer).then(function(tableBuilderContainer){
										asyncBuildObjectControllerClass("Controllers", tableBuilderContainer).then(function(tableBuilderContainer){
											return deferred.resolve(tableBuilderContainer);
										});
									});
						 		});
							});
						});
					});

				return deferred.promise;
			}
			

			function asyncBuildEntityClass(packageDisplayName, tableInfo, tableBuilderContainer){
				console.log('asyncBuildEntityClass', tableInfo, tableBuilderContainer)
				let packageConfig = getPackageConfigByDisplayName(packageDisplayName);
				let infoContainer = {table: tableInfo};
				let deferred = $q.defer();
				JavaClassBuilder
					.createEntity(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						tableBuilderContainer.entity = builder;
						//addToZipfile(builder);
						return deferred.resolve(tableBuilderContainer);
					}, function onFailure(error){
						return deferred.reject(error);
					});

				return deferred.promise;
			}

			function asyncBuildEIClass(packageDisplayName, tableBuilderContainer){
				let packageConfig = getPackageConfigByDisplayName(packageDisplayName);
				let infoContainer = {
					entity: tableBuilderContainer.entity.getInfo()
				};
				let deferred = $q.defer();
				JavaClassBuilder
					.createEIClass(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						tableBuilderContainer.ei = builder;
						//addToZipfile(builder);
						return deferred.resolve(tableBuilderContainer);
					}, function onFailure(error){
						return deferred.reject(error);
					});
				return deferred.promise;
			}

			function asyncBuildRepositoryClass(packageDisplayName, tableBuilderContainer){
				let packageConfig = getPackageConfigByDisplayName(packageDisplayName);
				let infoContainer = {
					entity: tableBuilderContainer.entity.getInfo()
				};
				let deferred = $q.defer();
				JavaClassBuilder
					.createRepository(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						tableBuilderContainer.repository = builder;
						//addToZipfile(builder);
						return deferred.resolve(tableBuilderContainer);
					}, function onFailure(error){
						return deferred.reject(error);
					});
				return deferred.promise;
			}

			function asyncBuildConvertorClass(packageDisplayName, tableBuilderContainer){
				let packageConfig = getPackageConfigByDisplayName(packageDisplayName);
				let infoContainer = {
					entity: tableBuilderContainer.entity.getInfo(),
					ei: tableBuilderContainer.ei.getInfo()
				};
				let deferred = $q.defer();
				JavaClassBuilder
					.createConvertor(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						tableBuilderContainer.convertor = builder;
						//addToZipfile(builder);
						return deferred.resolve(tableBuilderContainer);
					}, function onFailure(error){
						return deferred.reject(error);
					});
				return deferred.promise;
			}

			function asyncBuildObjectServiceClass(packageDisplayName, tableBuilderContainer){
				let packageConfig = getPackageConfigByDisplayName(packageDisplayName);
				let infoContainer = {
					entity: tableBuilderContainer.entity.getInfo(),
					ei: tableBuilderContainer.ei.getInfo(),
					repository: tableBuilderContainer.repository.getInfo(),
					convertor: tableBuilderContainer.convertor.getInfo()
				};
				let deferred = $q.defer();
				JavaClassBuilder
					.createServiceInterface(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						tableBuilderContainer.service = builder;
						//addToZipfile(builder);
						return deferred.resolve(tableBuilderContainer);
					}, function onFailure(error){
						return deferred.reject(error);
					});
				return deferred.promise;
			}

			function asyncBuildObjectServiceClassImpl(packageDisplayName, tableBuilderContainer){
				let packageConfig = getPackageConfigByDisplayName(packageDisplayName);
				let infoContainer = {
					entity: tableBuilderContainer.entity.getInfo(),
					ei: tableBuilderContainer.ei.getInfo(),
					repository: tableBuilderContainer.repository.getInfo(),
					service: tableBuilderContainer.service.getInfo(),
					convertor: tableBuilderContainer.convertor.getInfo(),
					repository: tableBuilderContainer.repository.getInfo()
				};
				let deferred = $q.defer();
				JavaClassBuilder
					.createServiceImpl(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						tableBuilderContainer.serviceImpl = builder;
						//addToZipfile(builder);
						return deferred.resolve(tableBuilderContainer);

					}, function onFailure(error){
						return deferred.reject(error);
					});
				return deferred.promise;
			}

			function asyncBuildObjectControllerClass(packageDisplayName, tableBuilderContainer){
				let packageConfig = getPackageConfigByDisplayName(packageDisplayName);
				let infoContainer = {
					entity: tableBuilderContainer.entity.getInfo(),
					ei: tableBuilderContainer.ei.getInfo(),
					service: tableBuilderContainer.service.getInfo(),
					options: projectConfig.data
				};
				let deferred = $q.defer();
				JavaClassBuilder
					.createController(packageConfig, infoContainer)
					.then(function onSuccess(builder){
						tableBuilderContainer.controller = builder;
						//addToZipfile(builder);
						return deferred.resolve(tableBuilderContainer);

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