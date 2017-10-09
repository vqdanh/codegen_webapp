export default UtilsService;

function UtilsService($resource, $state, $stateParams, $cookies, $timeout, $mdToast, spinnerService, SystemConfigResource, COMMON) {
	"ngInject";

	let toastPosition = {
    bottom: false,
    top: true,
    left: false,
    right: true
  }

  function getToastPosition() {
    return Object.keys(angular.extend({}, toastPosition))
      .filter(function(pos) { return toastPosition[pos]; })
      .join(' ');
  }
  let activeSpinner = false;
	return {
		startSpinner: function(nameSpinner){
			activeSpinner = true;
			//console.log('startSpinner',activeSpinner);
			nameSpinner = nameSpinner || COMMON.SPINNER.GLOBAL;
			$timeout(function(){
				spinnerService.show(COMMON.SPINNER.GLOBAL);
			}, 0);
		},
		stopSpinner: function(nameSpinner){
			nameSpinner = nameSpinner || COMMON.SPINNER.GLOBAL;
			activeSpinner = false;
			//console.log('stopSpinner',activeSpinner);
			$timeout(function(){
				//console.log('stopSpinner-timeout',activeSpinner);
				if(!activeSpinner){
					spinnerService.hide(COMMON.SPINNER.GLOBAL);
				}
			}, 300);
		},
		toastMessage: function(message, options){
			let pinTo = getToastPosition();
			let toastObj = $mdToast.simple()
		        .textContent(message)
		        .position(pinTo)
		        .highlightClass('md-accent')
		        .hideDelay(3000);

		  //console.log(message, pinTo, toastObj)
	    $mdToast.show(toastObj).then(function(response){
	    	//alert("adfasfd");
	    });
		}
	}
}