export default EntityBuilder;
function EntityBuilder($q, $http, $resource, StringUtils, Pluralize, CodeGenConfig, PropertyBuilder, MethodBuilder, ClassBuilder, EmbeddableClassBuilder){
	"ngInject";

	const SQL_COL_DATATYPE_DICT = [
    { code: -7, type: { sql: "BIT", java: "Boolean" } },
    { code: -6, type: { sql: "TINYINT", java: "Boolean" } },
    { code: -5, type: { sql: "BIGINT", java: "Long" } },
    { code: -4, type: { sql: "LONGVARBINARY", java: "byte[]" } },
    { code: -3, type: { sql: "VARBINARY", java: "byte[]" } },
    { code: -2, type: { sql: "BINARY", java: "byte[]" } },
    { code: -1, type: { sql: "LONGVARCHAR", java: "String" } },
    { code: 0, type: { sql: "NULL" } },
    { code: 1, type: { sql: "CHAR", java: "String" } },
    { code: 2, type: { sql: "NUMERIC", java: "BigDecimal" } },
    { code: 3, type: { sql: "DECIMAL", java: "BigDecimal" } },
    { code: 4, type: { sql: "INTEGER", java: "Integer" } },
    { code: 5, type: { sql: "SMALLINT", java: "Integer" } },
    { code: 6, type: { sql: "FLOAT", java: "Double" } },
    { code: 7, type: { sql: "REAL", java: "Float" } },
    { code: 8, type: { sql: "DOUBLE", java: "Double" } },
    { code: 12, type: { sql: "VARCHAR", java: "String" } },
    { code: 91, type: { sql: "DATE", java: "Date" } },
    { code: 92, type: { sql: "TIME", java: "Date" } },
    { code: 93, type: { sql: "TIMESTAMP", java: "Date" } },
    { code: 1111, type: { sql: "OTHER", java: "String" } }
	];

	//build serializable property
	let serialProp = {
		accessModifier:"private static final",
		type: {className: "long"},
		name: "serialVersionUID",
		defaultValue:"1L"

	}

	function getDataType(sqlDataTypeCode){
		for (var i = SQL_COL_DATATYPE_DICT.length - 1; i >= 0; i--) {
			if (SQL_COL_DATATYPE_DICT[i].code == sqlDataTypeCode){
				return SQL_COL_DATATYPE_DICT[i];
			}
		}
	}

	function createClassNameFromTableName(tableName){
		return StringUtils.pascalCase(StringUtils.camelCase(tableName));
	}

	let self;
	function BuilderProvider(name){
		self = this;
		self.primaryKeyPropInfos = [];
		ClassBuilder.getProvider().call(this, name);
	}
	BuilderProvider.prototype =  Object.create(ClassBuilder.getProvider().prototype);

	
	BuilderProvider.prototype.buildInfo = function(infoContainer){
		self.infoContainer = infoContainer;

		self.tableInfo = angular.copy(infoContainer.table);
		let entityInfo = {
			implementInterfaces: [
				{
					abstractType: "interface",
					packageName: "java.io",
					name: "java.io.Serializable", 
					className: "Serializable",
				}
			],
			annotations :[
				'@Data',
				'@Entity',
				'@Table(name="'+self.tableInfo.name+'")'
			],
			className: createClassNameFromTableName(self.tableInfo.name),
			relationshipPropertyInfos:[],
			isThirdTable: false
		}	
		self.buildPropertyInfos(entityInfo);
		self.setInfo(entityInfo);

		return self;
	}
	
	function checkPrimaryKey(colInfo){
		for (var i = 0; i < self.tableInfo.primaryKeys.length; i++) {
			let colKey = self.tableInfo.primaryKeys[i];
			if(colInfo.name == colKey.columnName){
				return true;
			}
		}
		return false;
	}

	function checkDuplicateProperty(propInfo, propInfoList){
		for (var i = propInfoList.length - 1; i >= 0; i--) {
			if(propInfo.name === propInfoList[i].name){
				return true;
			}
		}
		return false;
	}

	BuilderProvider.prototype.buildPropertyInfos = function(entityInfo){
		let primaryKeyPropInfos = [];
		let propertyInfos = [];
		let columnPropertyInfos = [];
		let importedKeys	= self.tableInfo.importedKeys;
		let exportedKeys = self.tableInfo.exportedKeys;

		let importedColumns = importedKeys.map(function(k){
			return k.keyMany.columnName;
		});
		propertyInfos.push(angular.copy(serialProp));

		//build properties from columns
		for (let i = 0; i < self.tableInfo.columnInfos.length; i++) {

			let colInfo = self.tableInfo.columnInfos[i];

			if(importedColumns.indexOf(colInfo.name)> -1){
				continue;
			}
			let dataTypeObj = getDataType(colInfo.dataType);
			let propInfo = {
				annotations:[],
				type: {className: dataTypeObj.type.java},
				name: colInfo.name,
				isRelationshipProperty: false
			}

			let isPrimaryKey = checkPrimaryKey(colInfo);
			
			propInfo.annotations.push('@Column(name = "'+colInfo.name+'")');

			if(isPrimaryKey){
				primaryKeyPropInfos.push(propInfo);
			} else {
				if(!checkDuplicateProperty(propInfo, columnPropertyInfos)){
					columnPropertyInfos.push(propInfo);
				} else {
					console.warn("Duplication propInfo", propInfo);
				}	
			}
		}

		// the table can be a Third table in the ManyToMany relationship
		if(columnPropertyInfos.length == 0
			&& self.tableInfo.primaryKeys.length == self.tableInfo.columnInfos.length
			&& self.tableInfo.primaryKeys.length == importedKeys.length){
			entityInfo.isThirdTable = true;
			self.logs.push({message: self.tableInfo.name + " is the third table.", level: "warn"});
		}


		if(primaryKeyPropInfos.length > 0){
			if(primaryKeyPropInfos.length == 1){
				updateIdAnnotation(primaryKeyPropInfos[0]);
				entityInfo.primaryKey = primaryKeyPropInfos[0];
				propertyInfos = propertyInfos.concat(primaryKeyPropInfos);
			} else if(primaryKeyPropInfos.length > 1) {
				let embeddedIdClassBuilder = createEmbeddedIdClassBuilder(self, entityInfo, primaryKeyPropInfos);
				let embeddedKeyPropInfo = {
					name: StringUtils.camelCase(embeddedIdClassBuilder.getInfo().className),
					type: angular.copy(embeddedIdClassBuilder.getInfo()),
					annotations:['@EmbeddedId']
				}
				propertyInfos.push(embeddedKeyPropInfo);
				entityInfo.primaryKey = embeddedKeyPropInfo;
			}
		} else {
			self.logs.push({message: "There is no keys found.", level: "warn"});
		}
		

		propertyInfos = propertyInfos.concat(columnPropertyInfos);
		
		//build from relationship
		let relationshipPropertyInfos = [];

		//OneToMany
		for (let i = 0; i < exportedKeys.length; i++) {
			let refEntityName = createClassNameFromTableName(exportedKeys[i].keyMany.tableName);
			let propInfo = {
				annotations:[
					'@OneToMany(mappedBy = "'+StringUtils.camelCase(exportedKeys[i].keyOne.tableName)+'", cascade = CascadeType.ALL)'
				],
				type: {className: "List<"+refEntityName+">"},
				name: StringUtils.camelCase(Pluralize(refEntityName)),
				isRelationshipProperty: true
			}

			if(!checkDuplicateProperty(propInfo, relationshipPropertyInfos)){
				relationshipPropertyInfos.push(propInfo);
			} else {
				console.warn("duplication propInfo", propInfo);
			}

		}

		//ManyToOne relationship
		for (var i = 0; i < importedKeys.length; i++) {
			let refEntityName = createClassNameFromTableName(importedKeys[i].keyOne.tableName);
			let propInfo = {
				annotations:[
					'@ManyToOne',
					'@JoinColumn(name = "'+importedKeys[i].keyMany.columnName+'")'
				],
				type:{className: refEntityName},
				name: StringUtils.camelCase(refEntityName),
				isRelationshipProperty: true
			}

			if(!checkDuplicateProperty(propInfo, relationshipPropertyInfos)){
				relationshipPropertyInfos.push(propInfo);
			} else {
				self.logs.push({message: "Duplication propInfo", level: "warn", data: angular.copy(propInfo)});
				console.warn("duplication propInfo", propInfo);
			}
		}

		propertyInfos = propertyInfos.concat(relationshipPropertyInfos);
		self.setPropertyInfos(propertyInfos);
		return self;
	}

	function updateIdAnnotation(propInfo){
		propInfo.annotations.push("@Id");
		if(propInfo.type.className == "Integer" || propInfo.type.className == "Long"){
			propInfo.annotations.push('@GeneratedValue(strategy = GenerationType.IDENTITY)');
		} else if(propInfo.type.className == "String"){
			propInfo.annotations.push('@GenericGenerator(name = "uuid-gen", strategy = "uuid2")');
			propInfo.annotations.push('@GeneratedValue(generator = "uuid-gen", strategy = GenerationType.IDENTITY)');
		}
	}

	function createEmbeddedIdClassBuilder(entityClassBuilder, entityInfo, primaryKeyPropInfos){
		let embeddableBuilder = EmbeddableClassBuilder.createInstance(),
			embeddedInfo = {
				annotations :['@Data', '@AllArgsConstructor', '@Embeddable'],
				implementInterfaces: angular.copy(entityInfo.implementInterfaces),
				className: entityInfo.className+"Id",
				propertyInfos: [angular.copy(serialProp)].concat(primaryKeyPropInfos)

			}
		embeddableBuilder.buildInfo(embeddedInfo);
		self.nestedClassBuilderMap[embeddableBuilder.name] = embeddableBuilder;
		return embeddableBuilder;
	}

	return {
		getProvider: function(){
			return BuilderProvider;
		},
		createInstance : function(){
			return new BuilderProvider("entityBuilder");
		}
	};

}

