export default ClassBuilderFactory;
function ClassBuilderFactory($q, $http, StringUtils, Pluralize, CodeGenConfig, PropertyBuilder, MethodBuilder, ClassLoader){
	"ngInject";

	function BuilderProvider(name){
		let self = this;
		self.name = name;
		self.nestedClassBuilderMap = {};
		self.logs = [];
		//self.packageConfig = {name:"com.tellus.pharmacy.api.db.entities"};

		let defaultInfo = {
			defaultTemplateContent:"",
			templateUrl:'resources/templates/java-class-tpl.dat',
			packageName : "com.example.default",
			className: "defaultClassName",
			name:"",
			abstractType: "class",
			builderArgs:{},
			imports : [],
			extendedClasses:[],
			implementInterfaces:[],
			annotations :[],
			propertyInfos: [],
			methodInfos:[],
			includesAnnotation: true,
			includesPropertyAnnotation: true
		}

		let infoBuilder = angular.extend({}, defaultInfo);

		let _contentBuilder = "";
		function _loadTemplate(callback){
			let deferred = $q.defer();
			if(StringUtils.isNotEmpty(infoBuilder.defaultTemplateContent)){
				if(callback){
	    		callback();
	    	}
				deferred.resolve(self);
			} else if(StringUtils.isNotEmpty(infoBuilder.templateUrl)){
				$http.get(infoBuilder.templateUrl).then(function(response){
		    	infoBuilder.defaultTemplateContent = response.data;
		    	if(callback){
		    		callback();
		    	}
					deferred.resolve(self);
				}, function(error){
					deferred.reject(error);
				});
			} else {
				deferred.resolve(self);
			}
	    
	    return deferred.promise;
		}

		function _buildNestedClassBuilder(){
			let deferred = $q.defer();
			let promises = [];
			for(let key in self.nestedClassBuilderMap){
				let additionalInfo = {
					packageName : infoBuilder.packageName
				};
				let embeddableBuilder = self.nestedClassBuilderMap[key];
				promises.push(embeddableBuilder.build(additionalInfo));
			}
			$q.all(promises).then(function(values){
				deferred.resolve(values);
			}, function(error){
				deferred.reject(error);
			});

			return deferred.promise;
		}

		self.setPackageName = function(packageName){
			infoBuilder.packageName = angular.copy(packageName);
			return self;
		}

		self.setImports = function(imports){
			infoBuilder.imports = angular.copy(imports);
			return self;
		}

		self.setAnnotations = function(annotations){
			infoBuilder.annotations = angular.copy(annotations);
			return self;
		}

		self.setPropertyInfos = function(propertyInfos){
			infoBuilder.propertyInfos = angular.copy(propertyInfos);
			return self;
		}

		self.setMethodInfos = function(methodInfos){
			infoBuilder.methodInfos = angular.copy(methodInfos);
			return self;
		}

		self.setInfo = function(info){
			if(info !== undefined){
				infoBuilder = angular.extend({}, infoBuilder, info);
				//console.log("setInfo infoBuilder ", infoBuilder);
			}
			return self;
		}

		self.getContent = function(){
			return _contentBuilder;
		}

		self.getMethodInfos = function(){
			return angular.copy(infoBuilder.methodInfos);
		}

		self.getInfo = function(){
			return infoBuilder;
		}

		self.build = function(options){
			//console.log("build", infoBuilder.className);
			self.setInfo(options);
			infoBuilder.name = infoBuilder.packageName + "." + infoBuilder.className;
			let deferred = $q.defer();

			_buildNestedClassBuilder().then(function(){
				_loadTemplate(function callback(){
					_contentBuilder = angular.copy(infoBuilder.defaultTemplateContent);
					//console.log(_contentBuilder);
					if(_contentBuilder.search(/(\${\w+})/g) > -1){
						//console.log("build _contentBuilder", infoBuilder.className);
						self.buildPackageName()
							.buildClassAnotation()
							.buildAbstractType()
							.buildClassName()
							.buildExtendedClasses()
							.buildImplementInterfaces()
							.buildPropertyContents()
							.buildMethodContents()
							.buildImportClass();
						_contentBuilder = _contentBuilder.replace(/\n{3,}/g, '\n\n');
						ClassLoader.addClass(infoBuilder.packageName, infoBuilder);
					}
					deferred.resolve(self);
				});
			});
			

			return deferred.promise;
		}

		self.buildPackageName = function (){
	    _contentBuilder = StringUtils.replace(_contentBuilder, '${packageName}', infoBuilder.packageName);
	    return self;
		}

		self.buildAbstractType = function(){
			_contentBuilder = StringUtils.replace(_contentBuilder, '${abstractType}', infoBuilder.abstractType);
			return self;
		}

		self.buildExtendedClasses = function(){
			let replacements = infoBuilder.extendedClasses.length > 0? [" extends "] : [];
			
			for (let i = 0; i < infoBuilder.extendedClasses.length; i++) {
				let classInfo = infoBuilder.extendedClasses[i];
				replacements.push(classInfo.className);
				if(classInfo.genericTypes !== undefined && classInfo.genericTypes.length>0){
					
					let typeNames = [];
					for (let j = 0; j < classInfo.genericTypes.length; j++) {
						let type = classInfo.genericTypes[j];
						if(type == undefined){
							console.log(classInfo);
						}
						typeNames.push(type.className);
					}
					replacements.push("<");
					replacements.push(typeNames.join(", "));
					replacements.push(">");
				}
			}
			_contentBuilder = StringUtils.replace(_contentBuilder, '${extendedClasses}', replacements.join(""));
			return self;
		}

		self.buildImplementInterfaces = function(){
			let replacements = infoBuilder.implementInterfaces.length > 0? [" implements "] : [];
			
			for (let i = 0; i < infoBuilder.implementInterfaces.length; i++) {
				let interfaceInfo = infoBuilder.implementInterfaces[i];
				replacements.push(interfaceInfo.className);
				if(interfaceInfo.genericTypes !== undefined && interfaceInfo.genericTypes.length>0){
					
					let typeNames = [];
					for (let j = 0; j < interfaceInfo.genericTypes.length; j++) {
						let type = interfaceInfo.genericTypes[j];
						typeNames.push(type.className);
					}
					replacements.push("<");
					replacements.push(typeNames.join(", "));
					replacements.push(">");
				}
			}
			_contentBuilder = StringUtils.replace(_contentBuilder, '${implementInterfaces}', replacements.join(""));
			return self;
		}

		self.buildClassAnotation = function(){
			let annotationContent = "";
			if(infoBuilder.includesAnnotation){
				annotationContent = infoBuilder.annotations.join("\n");
			}
			_contentBuilder = StringUtils.replace(_contentBuilder, '${annotations}', annotationContent);
			return self;
		}

		self.buildClassName = function(){
	    _contentBuilder = StringUtils.replace(_contentBuilder, '${className}', infoBuilder.className);
	    return self;
		}

		self.buildPropertyContents = function(){
			let propertyContents = [];
			let injectMethodContents = [];
			for (let i = 0; i < infoBuilder.propertyInfos.length; i++) {
				let propInfo = infoBuilder.propertyInfos[i];
				let propbuilder = PropertyBuilder.createBuilder(propInfo);
				let propContent = propbuilder.build({includesAnnotation: infoBuilder.includesPropertyAnnotation}).getContent();
				propertyContents.push(propContent + "\n");
				

				if(propInfo.isGeneratingGetter){
					let getterBuilder = MethodBuilder.createGetter(propbuilder.getInfo());
					injectMethodContents.push(getterBuilder.build().getContent() + "\n");
					
				}

				if(propInfo.isGeneratingSetter){
					let setterBuilder = MethodBuilder.createSetter(propbuilder.getInfo());
					injectMethodContents.push(setterBuilder.build().getContent() + "\n");
					
				}
				
			}

			let propertiesContent = propertyContents.concat(injectMethodContents);
	    _contentBuilder = StringUtils.replace(_contentBuilder, '${properties}', propertiesContent.join("\n"));
	    return self;
		}

		self.buildMethodContents = function(){
			let contents = [];
			
			for (let i = 0; i < infoBuilder.methodInfos.length; i++) {
				let mdInfo = infoBuilder.methodInfos[i];
				let methodBuilder = MethodBuilder.createInstance();
				methodBuilder
					.buildInfo(mdInfo)
					.build();
				contents.push(methodBuilder.getContent());
				contents.push("\n");
			}
			_contentBuilder = StringUtils.replace(_contentBuilder, '${methods}', contents.join("\n"));
			return self;
		}

		self.buildImportClass = function(){
			let currentImports = angular.copy(infoBuilder.imports);

			//build imports from extended class
			let combinedClass = infoBuilder.extendedClasses.concat(infoBuilder.implementInterfaces);
			//console.log("combinedClass", combinedClass);
			for (let i = 0; i < combinedClass.length; i++) {
				let classInfo = combinedClass[i];
				if(classInfo.name){
					currentImports.push(classInfo.name);
				}
				if(classInfo.genericTypes != undefined ){
					for (let j = 0; j < classInfo.genericTypes.length; j++) {
						let type = classInfo.genericTypes[j];
						//console.log("genericTypes",type);
						if(type.name) {
							currentImports.push(type.name);
						}
					}
				}
			}

			for (let i = 0; i < infoBuilder.propertyInfos.length; i++) {
				let prop = infoBuilder.propertyInfos[i];
				if(prop.type.name){
					currentImports.push(prop.type.name);
				}
			}
			
			//find the type for importing
			let typeDicts = [
				{
					className: "List",
					name: "java.util.List"
				},
				{
					className: "Date",
					name: "java.util.Date"
				},
				{
					className: "ArrayList",
					name: "java.util.ArrayList"
				}, 
				{
					className: "@Entity",
					name: "javax.persistence.Entity"
				},
				{
					className: "@Table",
					name:"javax.persistence.Table"
				},
				{
					className: "@Id",
					name:"javax.persistence.Id"
				},
				{
					className: "@GenericGenerator",
					name:"org.hibernate.annotations.GenericGenerator"
				},
				{
					className: "@GeneratedValue",
					name:"javax.persistence.GeneratedValue"
				},
				{
					className: "GenerationType",
					name:"javax.persistence.GenerationType"
				},
				{
					className: "CascadeType",
					name: "javax.persistence.CascadeType"
				},
				{
					className: "@ManyToOne",
					name:"javax.persistence.ManyToOne"
				},
				{
					className: "@OneToMany",
					name:"javax.persistence.OneToMany"
				},
				{
					className: "@JoinColumn",
					name:"javax.persistence.JoinColumn"
				},
				{
					className: "@Column",
					name:"javax.persistence.Column"
				},
				{
					className: "@Autowired",
					name:"org.springframework.beans.factory.annotation.Autowired"
				},
				{
					className: "@Service",
					name: "org.springframework.stereotype.Service"
				},
				{
					className: "@RestController",
					name:"org.springframework.web.bind.annotation.RestController"
				},
				{
					className: "@RequestMapping",
					name:"org.springframework.web.bind.annotation.RequestMapping"
				},
				{
					className:"@ResponseBody",
					name:"org.springframework.web.bind.annotation.RequestMethod"
				},
				{
					className:"@RequestParam",
					name:"org.springframework.web.bind.annotation.RequestParam"
				},
				{
					className:"@RequestMethod",
					name:"org.springframework.web.bind.annotation.RequestMethod"
				},
				{
					className:"@Api",
					name:"io.swagger.annotations.Api"
				},
				{
					className:"@ApiOperation",
					name:"io.swagger.annotations.ApiOperation"
				},
				{
					className:"@ApiResponses",
					name:"io.swagger.annotations.ApiResponses"
				},
				{
					className:"@ApiResponse",
					name:"io.swagger.annotations.ApiResponse"
				},
				{
					className:"@Data",
					name: "lombok.Data"
				},
				{
					className: "@ToString",
					name: "lombok.ToString"
				},
				{
					className: "@Builder",
					name: "lombok.Builder"
				},
				{
					className: "@AllArgsConstructor",
					name: "lombok.AllArgsConstructor"
				},
				{
					className: "@RequestBody",
					name: "org.springframework.web.bind.annotation.ResponseBody"
				}
			]

			let importAdditions = [];
			for (var i = 0; i < typeDicts.length; i++) {
				let type = typeDicts[i];
				let regex = new RegExp(type.className, 'g');
				if(_contentBuilder.search(regex) > -1){
					importAdditions.push(type.name);
				}
			}

			currentImports = importAdditions.concat(currentImports);

			let groupImport = currentImports.reduce(function(group, curImport){
				let tokens = curImport.split(".");
				let keyGroup = tokens[0];
				if(group[keyGroup] == undefined){
					group[keyGroup] = [];
				}
				group[keyGroup].push(curImport);

				return group;
			}, {});
			let importContents = [];

			for(let key in groupImport){
				groupImport[key].sort(function(a,b){
					if(a < b) return -1;
					if(a > b) return 1;
					return 0;
				});

				let content = groupImport[key].map((line) => {return "import " + line + ";"});
				importContents = importContents.concat(content);
				importContents.push("\n");

			}
			_contentBuilder = StringUtils.replace(_contentBuilder, '${import}', importContents.join("\n"));
			return self;
		}
	}

	return {
		getProvider: function(){
			return BuilderProvider;
		},
		createInstance : function(){
			return new BuilderProvider('classBuilder');
		}
	};
}