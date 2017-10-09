export default MethodBuilder;
/**
 * [MethodBuilder description]
 * @param {[type]} StringUtils [description]
 * argument object:
 *  {
 *  	annotations: Array,
 *  	type: ClassObject,
 *  	name: String
 *  }
 */
function MethodBuilder(StringUtils) {
	"ngInject";

	return {
		createInstance: createInstance,
		createGetter: createGetter,
		createSetter: createSetter

	}

	//---- public services ------
	function createInstance(){
		return new BuilderProvider();
	}
	function createGetter(propertyInfo) {
		let builder = new GetterMethodBuilder(propertyInfo);
		return builder.buildInfo().build();
	}

	function createSetter(propertyInfo) {
		let builder = new SetterMethodBuilder(propertyInfo);
		return builder.buildInfo().build();
	}

	//---- internal builders ------
	function BuilderProvider(methodInfo){
		let self = this;

		let defaultInfo = {
			annotations:[],
			accessModifier : "public",
			type:{className : "void"},
			name: "methodName",
			args:[],
			body : [],
			includesAnnotation: true,
			includesBody: true
		}
		let _signature, _annotationContent;
		self.info = angular.extend({}, defaultInfo, methodInfo);
		self.content = [];

		self.getContent = function(){
			return  self.content.join("\n");
		}

		self.getSignature = function(){
			return _signature;
		}

		self.buildInfo = function(methodInfo){
			if(methodInfo !== undefined){
				self.info = angular.extend({}, self.info, methodInfo);
			}
			_annotationContent = _buildAnnotation();
			_signature =  _buildSignature();
			return self;
		}

		self.build = function(methodInfo){
			if(methodInfo !== undefined){
				self.buildInfo(methodInfo);
			}
			self.content = [];
			if(StringUtils.isNotEmpty(_annotationContent)){
				self.content.push(_annotationContent);
			}
			self.content.push("  "+_signature);
			self.buildBody();
			return  self;
		}

		function _buildSignature() {
			let argsDeclarations = [];
			for (let i = 0; i < self.info.args.length; i++) {
				let arg = self.info.args[i];
				let content = [];
				if(arg.annotations && arg.annotations.length > 0){
					content.push(arg.annotations.join(" "));
					content.push(" ");
				}
				content.push(arg.type.className);
				content.push(" ");
				content.push(arg.name);
				argsDeclarations.push(content.join(""));
				//console.log(content);
			}

			let declaration = [
				StringUtils.lowerCase(self.info.accessModifier),
				" ",
				self.info.type.className,
				" ",
				StringUtils.camelCase(self.info.name),
				"(",
				argsDeclarations.join(", "),
				")"
			];

			return declaration.join("");
		}


		function _buildAnnotation() {
			if(self.info.includesAnnotation){
				return self.info.annotations.map((item) => {return "  " + item;}).join("\n");
			}
			return "";
		}

		

		self.buildBody = function(){
			let lastIdx = self.content.length - 1;
			let contentBody = self.info.body.map((line) => {return "    " + line;}).join("\n");
			if(self.info.includesBody){
				self.content[lastIdx] += " { ";
				self.content.push(contentBody);
				self.content.push("  }");
			} else {
				self.content[lastIdx] += ";"
			}
			return self;
		}


	}

	/**
	 * @param {propertyInfo} : {type\, name}
	 */
	function GetterMethodBuilder(propertyInfo){
		let self = this;
		let info = {
			type : propertyInfo.type,
			name: "get" + StringUtils.pascalCase(propertyInfo.name),
			body: ["return this." + propertyInfo.name + ";"]
		}
		let buidler = new BuilderProvider(info);
		self.build = function(){;
			return buidler.build();
		}

	}

	/**
	 * @param {propertyInfo} : {type, name}
	 */
	function SetterMethodBuilder(propertyInfo){
		let self = this;
		let bodyContent = [
	 		"this.",
	 		propertyInfo.name,
	 		" = ",
	 		propertyInfo.name,
	 		";"
	 	].join("");

		let info = {
			name: "set" + StringUtils.pascalCase(propertyInfo.name),
			args:[{
				type:{className: propertyInfo.type.className},
				name: propertyInfo.name,
			}],
			body: [bodyContent]
		}

		let buidler = new BuilderProvider(info);
		self.build = function(){
			return buidler.build();
		}

	}
	


}