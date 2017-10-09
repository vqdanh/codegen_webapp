 "use strict";
export default DashboardController;

function DashboardController($rootScope, $scope, $state, $stateParams, $cookies, $location, $timeout, Split, GlobalCache, STATE, EVENT, COOKIE, COMMON, CodeGenConfig, DatabaseService) {
	"ngInject";

	let viewState, viewName = "dashboarb";

	$timeout(function(){
		onStart();
	}, 300);

	function onStart(){
		initViewState();
	}

	function saveViewState(){
		CodeGenConfig.saveViewState(viewName, viewState);
	}

	function initViewState(){
		let splitPanes = [{
				elements: ['#split-pane1', '#split-pane2'],
				config: {
					sizes: [75,25],
					minSize: 200
				}
			}];
		CodeGenConfig.initViewState("dashboarb", {
			splitPanes: splitPanes
		});

	}
}
