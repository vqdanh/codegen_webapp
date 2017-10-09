export default TableEditDirective;
function TableEditDirective($rootScope, $state, $stateParams, $cookies, $timeout, $filter, Split, StringifyObject, StringUtils, FileSaver, JSZip, 
	GlobalCache, STATE, EVENT, COOKIE, COMMON, CodeGenConfig, JavaClassBuilder, TableDiablogService, MethodTemplate){
	"ngInject";
	
	return {
		restrict: 'E',
		scope: {
			projectConfig: "=",
			tabData: "=",
			name:"@"
		},
		templateUrl: 'src/app/components/table/edit/table-edit-tpl.html',
		controller: ['$scope', function($scope) {
			$scope.configPane = {
      	seletedPackageConfig: null,
      	searchPackageText:"",
      	searchPackageChange: searchPackageChange,
      	selectedPackageChange: selectedPackageChange
      }

      $scope.packageConfigs = [];

      $scope.$on("$schemaConfig:globalConfigChange", function(event, data){
				loadAllPackageConfigs();
			});

			$scope.querySearchPackage = function(query) {
      	//console.log("query = "+query, StringUtils.isNotBlank(query), $scope);
	      let results = StringUtils.isNotBlank(query) ? $scope.packageConfigs.filter( createFilterFor(query) ) : $scope.packageConfigs;
	      //console.log("querySearchPackage", results);
	      results = $filter('orderBy')(results, "name", false);
	      return results;
	    }

	    $scope.onShowMethodListClick = function(event){
	    	let classBuilder = $scope.tabData.data.rawData;
				let data = {
					currentMethodInfos: classBuilder.getMethodInfos(),
					methodInfos: MethodTemplate.getByClassBuilder(classBuilder)
				}

				TableDiablogService.showDefaultMethodList(event, data)
					.then(function(response){
						let methodInfos = response.map((item) => {return item.methodInfo;})
						classBuilder.setMethodInfos(methodInfos);
						classBuilder.build();
						$scope.tabData.data.sourceContent = classBuilder.getContent();
					});
			}

	    $scope.onAddMethodClick = function(event){
				TableDiablogService.showCustomMethodDiablog(event)
					.then(function(response){
						console.log(response);
					});
			}

			

	    /************************************************************************************************************************************************/

			onInit();

			function onInit(){
				loadAllPackageConfigs();
			}

			
			function loadAllPackageConfigs(){
				$scope.packageConfigs = $scope.projectConfig.packageConfigs;
				$timeout(function(){
					for (let i = 0; i < $scope.packageConfigs.length; i++) {
						if(angular.equals($scope.packageConfigs[i], $scope.tabData.info.configData.packageConfig)){
							$scope.configPane.seletedPackageConfig = $scope.packageConfigs[i];
							return;
						} 
					}
					$scope.configPane.seletedPackageConfig = $scope.packageConfigs[0];
					//console.log($scope.configPane.seletedPackageConfig);
				}, 200);
			}
	    function searchPackageChange(text) {
	      //$log.info('Text changed to ' + text); 
	    }

	    function selectedPackageChange(item) {
      	if(!angular.equals(item, $scope.tabData.info.configData.packageConfig)){
      		$scope.tabData.info.configData.packageConfig = angular.copy(item);
      		$scope.$emit("$tableEdit:updatePackageConfig", {index: $scope.tabData.info.tabKey, packageConfig: item});
      	}
	      
	      
	    }

	    /**
	     * Create filter function for a query string
	     */
	    function createFilterFor(query) {
	      var lowercaseQuery = angular.lowercase(query);

	      return function filterFn(packageConfig) {
	      	let lcDisplayName = angular.lowercase(packageConfig.displayName);
	        return (lcDisplayName.indexOf(lowercaseQuery) >= 0 ||
	        	packageConfig.name.indexOf(lowercaseQuery) >= 0);
	      };

	    }

			
		}],
		link: function(scope, element, attrs) {
			$timeout(function(){
				initSplitPannel();
			});
			

			function initSplitPannel (){
				let id = scope.name;
				//split: display | [config|properties]
				Split(["#"+scope.name+'-pane1', "#"+scope.name+'-pane2'],{
		    	sizes: [70, 30],
		    	minSize: 100
				});

				//split: config|properties
				Split(["#"+scope.name+'-pane2-1', "#"+scope.name+'-pane2-2'],{
					sizes: [30, 70],
		    	direction: "vertical"
				});
				
			}
		}
	}
}