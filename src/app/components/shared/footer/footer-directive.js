'use strict';
export default FooterDirective;
function FooterDirective() {
	"ngInject";

	return {
		restrict: 'A',
		replace: true,
		templateUrl: 'src/app/components/shared/footer/footer-tpl.html',
		controller: ['$scope', function($scope) {
			
		}]
	}
}