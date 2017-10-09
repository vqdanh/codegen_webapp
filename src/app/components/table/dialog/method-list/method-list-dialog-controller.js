 "use strict";
export default MethodListDiablogController;

function MethodListDiablogController($rootScope, $scope, $state, $timeout, $mdDialog, localData, MethodBuilder){
	"ngInject";
  //console.log(localData);
	$scope.methodInfos =[];
  localData.currentMethodInfos = localData.currentMethodInfos || [];
  onStart();

  function onStart() {

    if( localData.methodInfos){
      let countingWantedMethod = 0;
      // calculation how many method has been selected
      $scope.methodInfos = localData.methodInfos.map((mi) => {
        
        let curMI = angular.copy(mi),
            curMISignature = MethodBuilder.createInstance().buildInfo(mi).getSignature(),
            isWanted = false;
        // filter methods have the same name    
        let sameMethodInfos = localData.currentMethodInfos.filter((sameMi) => {
          return sameMi.name == curMI.name;
        });

        if(sameMethodInfos.length == 1){
          isWanted = true;
        } else if(sameMethodInfos.length > 1){
          //Continue to double checking the signature of each method
          for (let j = sameMethodInfos.length - 1; j >= 0; j--) {
            let tempSignature = MethodBuilder.createInstance().buildInfo(sameMethodInfos[j]).getSignature();
            if(tempSignature == curMISignature){
              isWanted = true;
              break;
            }
          }
        }

        countingWantedMethod += isWanted? 1: 0;
        return {
          methodInfo: mi,
          methodSignature: curMISignature, 
          wanted: isWanted
        }
      });

      if(countingWantedMethod == localData.methodInfos.length){
        $scope.isSelectAll = true;
      }
    }
  }
  
  $scope.onSelectAllChange = function(event){
    for (let i = $scope.methodInfos.length - 1; i >= 0; i--) {
      $scope.methodInfos[i].wanted = $scope.isSelectAll;
    }
  }

  $scope.onSelectMethodChange = function($event, methodInfo){
    $scope.isSelectAll = $scope.methodInfos.every((item) => {return item.wanted;})
  }

	$scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.apply = function() {
    let selectedMethods = $scope.methodInfos.filter((item) => {return item.wanted;});
    $mdDialog.hide(selectedMethods);
  };


}