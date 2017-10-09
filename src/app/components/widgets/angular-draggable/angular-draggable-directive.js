import $ from "jquery";
export default [angularDraggable];

function angularDraggable() {
	return {
    restrict: 'A',
    scope: {
      dragOptions: '=ngDraggable'
    },
    link: function(scope, elem, attr) {
    	scope.dragOptions = scope.dragOptions || {};
    	$(elem).draggable(scope.dragOptions);
    }
  }
}