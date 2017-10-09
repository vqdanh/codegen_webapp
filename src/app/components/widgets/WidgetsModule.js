import "jquery";
import "jqueryui";
import ngDraggable from './angular-draggable/angular-draggable-directive';

export default angular
	.module('widgets',[])
	.directive('ngDraggable', ngDraggable)
	.run(() => {
    console.debug("Starting the 'widgets' module");
  });

