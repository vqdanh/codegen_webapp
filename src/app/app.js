import MainModule 			from './MainModule';

export default angular
	.module('codegen-app', [
		MainModule.name
	])
	.run(() => {
    console.debug("Starting the 'codegen-app' module");
  });
