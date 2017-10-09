export default PropertyBuilder;

function PropertyBuilder(StringUtils){
	"ngInject";

	let PropertyBuilders = {
		createBuilder: createBuilder
	}
	return PropertyBuilders;


	function createBuilder(options){
		return new Builder(options);
	}

	function Builder(options){
		let self = this;
		let defaultInfo = {
			accessModifier: "private",
			type : {
				className: "object"
			},
			name: "propName",
			defaultValue: "",
			annotations: [],
			includesAnnotation: true,
			isGeneratingGetter: false,
			isGeneratingSetter: false
		}

		self.info = angular.extend({}, defaultInfo, options);
		self.info.name = StringUtils.camelCase(self.info.name);
		self.content = [];

		self.getContent = function(){
			return  self.content.join("\n");
		}
		self.build = function(options){
			if(options !== undefined){
				self.info = angular.extend({}, self.info, options);
			}
			self.content = [];
			self.buildAnnotation()
					.buildSignature();
			return self;
		}

		self.getInfo = function(){
			return self.info
		}

		self.buildAnnotation = function(){
			if(self.info.includesAnnotation){
				self.content = self.info.annotations
					.map((line) => {return "  " + line;})
					.concat(self.content);
			}
			return self;
		}

		self.buildSignature = function(){
			
			let declaration = [
				"  " + self.info.accessModifier,
				self.info.type.className,
				self.info.name
			];
			if(StringUtils.isNotEmpty(self.info.defaultValue)){
				declaration.push("=");
				declaration.push(self.info.defaultValue);
			}
			self.content.push(declaration.join(" ")+";");
			return self;
		}
	}

}