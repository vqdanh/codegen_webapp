export default ObjectDataService;
function ObjectDataService(ObjectDataResource){
	"ngInject";
	const OBJECT_TYPE = {
		PROJECT: "PROJECT",
		USER: "USER",
		POM: "POM",
		UISETTING: "UISETTING"
	}
	let params = {
		subPath:""
	}
	let services = {
		getAll : function(params, onSuccess, onFailure) {
			return ObjectDataResource.get(params, onSuccess, onFailure);
		},
		getOne : function(params, onSuccess, onFailure){
			return ObjectDataResource.get(params, onSuccess, onFailure);
		},
		save : function(objectData, onSuccess, onFailure) {
			return ObjectDataResource.save(objectData, onSuccess, onFailure);
		},
		/**
		 * [getProjectConfig description]
		 * @param  {[Object]} params    [{projectId: number}]
		 * @param  {[function]} onSuccess 
		 * @param  {[fuction]} onFailure 
		 * @return {[ObjectData]}
		 */
		getProjectConfig : function(params, onSuccess, onFailure){
			let customParams = {
				action: "search",
				objectType: OBJECT_TYPE.PROJECT,
				objectSubType: OBJECT_TYPE.POM,
				objectId: params.projectId
			}
			return ObjectDataResource.get(customParams, onSuccess, onFailure);
		},
		saveProjectConfig : function(params, onSuccess, onFailure){
			let customParams = {
				objectType: OBJECT_TYPE.PROJECT,
				objectSubType: OBJECT_TYPE.POM,
				objectId: params.projectId,
				data: params.data
			}
			return ObjectDataResource.post(customParams, onSuccess, onFailure);
		},
		getUISetting : function(params, onSuccess, onFailure){
			let customParams = {
				action: "search",
				objectType: OBJECT_TYPE.PROJECT,
				objectSubType: OBJECT_TYPE.UISETTING,
				objectId: params.projectId
			}
			return ObjectDataResource.get(customParams, onSuccess, onFailure);
		},
		saveUISetting : function(params, onSuccess, onFailure){
			let customParams = {
				objectType: OBJECT_TYPE.PROJECT,
				objectSubType: OBJECT_TYPE.UISETTING,
				objectId: params.projectId,
				data: params.data
			}
			return ObjectDataResource.post(customParams, onSuccess, onFailure);
		}

	}
	return services;
}