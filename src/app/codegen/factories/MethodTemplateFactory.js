export default MethodTemplateFactory;

function MethodTemplateFactory(StringUtils) {
	'ngInject';

	let services = {
		getByClassBuilder: getByClassBuilder
	}

	let mapMethodGenerator = {
		repositoryBuilder: RepositoryMethodGenerator,
		serviceBuilder: ServiceMethodGenerator,
		serviceImplBuilder: ServiceImplMethodGenerator,
		controllerBuilder: ControllerMethodGenerator
	}

	return services;

	function getByClassBuilder(classBuilder){
		let methodGenerator = mapMethodGenerator[classBuilder.name];
		if(methodGenerator){
			return angular.copy(methodGenerator(classBuilder));
		}
		return [];
	}

	function RepositoryMethodGenerator(classBuilder){
		let infoContainer = classBuilder.infoContainer;
		return [];
	}

	function ServiceMethodGenerator(classBuilder){
		let infoContainer = classBuilder.infoContainer;
		let methodInfos = ServiceImplMethodGenerator(classBuilder).map((mi) => {
			let newMI = angular.copy(mi);
			newMI.includesAnnotation = false;
			newMI.includesBody = false;

			return newMI;
		});
		return methodInfos;
	}

	function ServiceImplMethodGenerator(classBuilder){
		let infoContainer = classBuilder.infoContainer;
		return [
			{
  			name: 'findAll',
  			annotations:[
					'@Override'
				],
				type: {
					className: 'Page<' + infoContainer.ei.className + '>'
				},
				args: [
					{
						annotations:[],
						type: {className: 'Pageable'},
						name: 'pageable'
					}
				],
  			body: ['return ' + _camelName(infoContainer.repository.className) + '.findAll(pageable);']
  		},
  		{
  			name: 'getOne',
  			annotations:[
					'@Override'
				],
				type: infoContainer.ei,
				args: [
					{
						annotations:[],
						type: infoContainer.ei.primaryKey.type,
						name: 'id'
					}
				],
  			body: []
  			
  		},
  		{
  			annotations:[
					'@Override'
				],
  			name: 'save',
				type: infoContainer.ei,
				args: [
					{
						annotations:[],
						type: infoContainer.ei,
						name: _camelName(infoContainer.ei.className)
					}
				],
  			body: ['return ' + _camelName(infoContainer.repository.className) + '.save('+_camelName(infoContainer.ei.className)+');']
  		},
  		{
  			annotations:[
					'@Override'
				],
  			name: 'update',
  			args: [
  				{
						annotations:[],
						type: infoContainer.ei.primaryKey.type,
						name: 'id'
					},
					{
						annotations:[],
						type: infoContainer.ei,
						name: _camelName(infoContainer.ei.className)
					}
				],
				type: infoContainer.ei,
  			body: ['return ' + _camelName(infoContainer.repository.className) + '.update(id, '+_camelName(infoContainer.ei.className)+');']
  		},
  		{
  			annotations:[
					'@Override'
				],
  			name: 'delete',
  			args: [
  				{
						annotations:[],
						type: infoContainer.ei.primaryKey.type,
						name: 'id'
					}
				],
				type: {
					className: 'void'
				},
  			body: ['return ' + _camelName(infoContainer.repository.className) + '.delele(id);']
  		}
		];
	}

	function ControllerMethodGenerator(classBuilder){
		let infoContainer = classBuilder.infoContainer;
		return [
			{
				name: 'findAll',
				annotations:[
					'@RequestMapping(method = RequestMethod.GET)'
				],
				type: {
					className: 'Page<' + infoContainer.ei.className + '>'
				},
				args: [
					{
						type: {className: 'Pageable'},
						name: 'pageable'
					}
				],
  			body: ['return ' + _camelName(infoContainer.service.className) + '.findAll(pageable);']
  		},
  		{
  			name: 'getOne',
  			annotations:[
					'@RequestMapping(value="/{id}", method = RequestMethod.GET)'
				],
				type: infoContainer.ei,
				args: [
					{
						annotations:['@PathVariable("id")'],
						type: infoContainer.ei.primaryKey.type,
						name: 'id'
					}
				],
  			body: []
  			
  		},
  		{
  			annotations:[
					'@RequestMapping(method = RequestMethod.POST)'
				],
  			name: 'save',
				type: infoContainer.ei,
				args: [
					{
						annotations:['@RequestBody'],
						type: infoContainer.ei,
						name: _camelName(infoContainer.ei.className)
					}
				],
  			body: ['return ' + _camelName(infoContainer.service.className) + '.save('+_camelName(infoContainer.ei.className)+');']
  		},
  		{
  			annotations:[
					'@RequestMapping(value="/{id}", method = RequestMethod.PUT)'
				],
  			name: 'update',
  			args: [
  				{
						annotations:['@PathVariable("id")'],
						type: infoContainer.ei.primaryKey.type,
						name: 'id'
					},
					{
						annotations:['@RequestBody'],
						type: infoContainer.ei,
						name: _camelName(infoContainer.ei.className)
					}
				],
				type: infoContainer.ei,
  			body: ['return ' + _camelName(infoContainer.service.className) + '.update(id, '+_camelName(infoContainer.ei.className)+');']
  		},
  		{
  			annotations:[
					'@RequestMapping(value="/{id}", method = RequestMethod.DELETE)'
				],
  			name: 'delete',
  			args: [
  				{
						annotations:['@PathVariable("id")'],
						type: infoContainer.ei.primaryKey.type,
						name: 'id'
					}
				],
				type: {
					className: 'void'
				},
  			body: ['return ' + _camelName(infoContainer.service.className) + '.delele(id);']
  		}
		];
	}

	function _camelName(name) {
		return StringUtils.camelCase(name);
	}
}

