 "use strict";
export default MethodDiablogController;

function MethodDiablogController($rootScope, $scope, $state, $timeout, $mdDialog, data){
	"ngInject";

	$scope.methodInfo = {
		annotations: [],
		accessModifier: "public",
		returnType: "",
		name:"",
		arguments : [],
		body: []
	}

	$scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.apply = function() {
    $mdDialog.hide($scope.methodInfo);
  };

  $scope.onAddAnnotationClick = function(event){
  	$scope.methodInfo.annotations.push($scope.newAnnotattion)
  	$scope.newAnnotattion = "";

  	$scope.methodForm.$setUntouched();
  }

  $scope.validateAnnotation = function(event){
  	console.log($scope.methodInfo.annotations.indexOf($scope.newAnnotattion));
  	$scope.isExistingAnnotation = $scope.methodInfo.annotations.indexOf($scope.newAnnotattion) > -1;
  }

  $scope.querySearchReturnType = function (query){
  	return [
  	{
  		className: "void",
  		name: "void"
  	}, 
  	{
  		className: 'List',
  		name: "java.util.List"
  	}]
  }

}