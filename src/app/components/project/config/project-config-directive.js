export default ProjectConfigDirective;
function ProjectConfigDirective($rootScope, $state, $stateParams, $mdToast, $timeout, GlobalCache, STATE, EVENT, COOKIE, COMMON,
	StringUtils, SystemConfigResource, CodeGenConfig, UtilsService, ObjectDataService){
	"ngInject";
	
	return {
		restrict: 'E',
		transclude: true,
		scope: {
			project:"="
		},
		templateUrl: 'src/app/components/project/config/project-config-tpl.html',
		controller: function($scope) {
			let	defaultPackageConfig = {
					key:"",
					name:"",
					package: ""
				};

			let lastProjectPackage;

			let unBindProjectWatcher = $scope.$watch("project", function(newVal, oldVal){
				if(newVal){
					$timeout(function(){
						onStart();
					}, 0);
				}
			});

			$scope.onProjectConfigChange = function(event){
				let defaultPackage = buildDefaultPackage();
				buildComponentPackage(defaultPackage);
				lastProjectPackage = angular.copy(defaultPackage);
				$scope.newPackageConfig.name =  computeComponentPackage(defaultPackage, $scope.newPackageConfig.key);
			}

			let lastComponentKey = "";
			$scope.newPackageConfigDataChange = function(){
				$scope.newPackageConfig.key = $scope.newPackageConfig.key? $scope.newPackageConfig.key.replace(/[^\w\_]/g, "") : "";
				
				if(StringUtils.isEmpty($scope.newPackageConfig.name) || $scope.newPackageConfig.name === StringUtils.pascalCase(lastComponentKey)){
					$scope.newPackageConfig.name = StringUtils.pascalCase($scope.newPackageConfig.key);
				}

				let computedPackageName = computeComponentPackage(lastProjectPackage, lastComponentKey);
				if(StringUtils.isEmpty($scope.newPackageConfig.name) || $scope.newPackageConfig.name === computedPackageName){
					$scope.newPackageConfig.name =  computeComponentPackage(lastProjectPackage, $scope.newPackageConfig.key);
				}

				$scope.invalidNewComponent = StringUtils.isBlank($scope.newPackageConfig.key);
				lastComponentKey = $scope.newPackageConfig.key;
			}

			$scope.deletePackageConfig = function(key){
				delete $scope.projectConfig.packageConfigs[key];
			}
			$scope.addPackageConfig = function(event){
				$scope.projectConfig.packageConfigs[$scope.newPackageConfig.key] = $scope.newPackageConfig;
				//CodeGenConfig.registerPackageConfig($scope.newPackageConfig.key, $scope.newPackageConfig);
				$scope.newPackageConfig = angular.copy(defaultPackageConfig);
				resetPackageForm();
			}

			$scope.onSaveClick = function(event){
				let params = {
					projectId: $scope.project.id,
					data: JSON.stringify(angular.copy($scope.projectConfig))
				}
				ObjectDataService.saveProjectConfig(params, function(response){
					CodeGenConfig.setProjectConfig($scope.projectConfig);
					UtilsService.toastMessage("Saved all configurations successfully");
				}, function(error){
					console.error(error);
				});
			}		

			function onStart(){
				if($scope.project.id == 0){
					$scope.projectConfig = CodeGenConfig.createProjectConfigTemplate();
					initData();
				} else {
					UtilsService.startSpinner();
					ObjectDataService.getProjectConfig({projectId: $scope.project.id}, function(response){
						if(response.objectId){
							$scope.projectConfig = JSON.parse(response.data);
							CodeGenConfig.setProjectConfig(response.objectId, $scope.projectConfig);
						} else {
							$scope.projectConfig = CodeGenConfig.createProjectConfigTemplate();
						}
						initData();
						UtilsService.stopSpinner();
					}, function(error){
						console.error(error);
						UtilsService.stopSpinner();
					});
				}
				
			}

			function initData(){
				lastProjectPackage = buildDefaultPackage();
				$scope.newPackageConfig = angular.copy(defaultPackageConfig);
				$scope.newPackageConfig.name = computeComponentPackage(lastProjectPackage, "");
				buildComponentPackage(lastProjectPackage);
				$scope.newPackageConfigDataChange();
			}

			function resetPackageForm(){
				$timeout(function(){
					$scope.packageForm.$setUntouched();
					$scope.newPackageConfigDataChange();
				});
			}

			function computeComponentPackage(parentPackage, childPackage){
				return parentPackage + "." + StringUtils.lowerCase(childPackage);
			}
			function buildDefaultPackage(){
				return $scope.projectConfig.groupId + "." + $scope.projectConfig.artifactId;
			}
			function buildComponentPackage(defaultPackage) {
				if(StringUtils.isNotEmpty(defaultPackage)){
					for (let i = 0; i < $scope.projectConfig.packageConfigs.length; i++) {
						let compConfig = $scope.projectConfig.packageConfigs[i];
						if(StringUtils.isEmpty(compConfig.name)){
							compConfig.name = defaultPackage + "." + StringUtils.lowerCase(compConfig.name.replace(/\s/g, "."));
						} else {
							compConfig.name = StringUtils.replace(compConfig.name, lastProjectPackage, defaultPackage);
						}
						
					}
				} else {
					console.log("need project package");
				}
			}
			
		},
		link: function(scope, element, attrs) {
			
		}
	}
}