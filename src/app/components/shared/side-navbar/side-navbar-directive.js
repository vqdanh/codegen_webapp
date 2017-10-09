'use strict';
export default LeftSideNavbar;

function LeftSideNavbar($state, $stateParams, STATE, EVENT, COMMON) {
	"ngInject";

	return {
		restrict: 'E',
		scope: { 
			sidenavId: "@",
			isLockOpen: "=?",
			toogleLockOpen: "=?",
			direction: "=?",
			headerData:"=",
			menuItems: "=" // [{state, name, icon, type}]
		},  //data: {objectType, action, id}
		templateUrl: 'src/app/components/shared/side-navbar/side-navbar-tpl.html',
		controller: function($scope, $mdSidenav) {
			"ngInject";
			$scope.direction = $scope.direction || "left";
			$scope.sidenavId = $scope.sidenavId  || $scope.direction + "-sidenav";
			$scope.disableBackdrop  = $scope.disableBackdrop  || true;
			$scope.isLockOpen = $scope.isLockOpen || false;
			$scope.toogleLockOpen = $scope.toogleLockOpen || false;
			onStart();
			$scope.$on("$sidenav:toogle", function(event, data){
				if(data.id == $scope.sidenavId){
					if($scope.toogleLockOpen){
						$scope.isLockOpen = !$scope.isLockOpen;
					}
				}
			});

			$scope.onSelectMenuItem = function(item){
				$state.go(item.state, {reload: true});
			}

			function onStart(){
				
			}
			
		}, 
		link: function (scope, element, attrs) {
		}
	}
}