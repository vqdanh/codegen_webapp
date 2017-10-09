export default TableConfigDirective;
function TableConfigDirective($rootScope, $state, $stateParams, $cookies, $timeout, GlobalCache, STATE, EVENT, COOKIE, COMMON){
	"ngInject";
	
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			data: "="
		},
		templateUrl: 'src/app/components/table/config/table-config-tpl.html',
		controller: ['$scope', function($scope) {

		}],
		link: function(scope, element, attrs) {

			
		}
	}
}