 "use strict";
export default TableDiablogService;

function TableDiablogService($state, $q, $mdDialog){
	"ngInject";
	
	let services = {
		showDefaultMethodList: showDefaultMethodList,
		showCustomMethodDiablog: showCustomMethodDiablog
	}

	function showDefaultMethodList(event, localData, options){
		options = options || {};
		let deferred = $q.defer();
		$mdDialog.show({
			locals: {localData: localData},
      controller: 'MethodDiablogListController',
      templateUrl: 'src/app/components/table/dialog/method-list/method-list-dialog-tpl.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose:true,
      fullscreen: options.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(localData) {
      deferred.resolve(localData);
    }, function(localData) {
      deferred.reject(localData);
    });

    return deferred.promise;

	}

	function showCustomMethodDiablog(event, localData, options){
		options = options || {};
		let deferred = $q.defer();
		$mdDialog.show({
			locals: {localData: localData},
      controller: 'MethodDiablogController',
      templateUrl: 'src/app/components/table/dialog/method/method-dialog-tpl.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose:true,
      fullscreen: options.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(localData) {
      deferred.resolve(localData);
    }, function(localData) {
      deferred.reject(localData);
    });

    return deferred.promise;

	}

	return services;

}