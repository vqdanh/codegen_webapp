export default ProjectService;
function ProjectService(ProjectResource){
	"ngInject";
	let params = {
		subPath:""
	}
	let services = {
		getAll : function(params, onSuccess, onFailure) {
			return ProjectResource.get(params, onSuccess, onFailure);
		},
		getOne : function(params, onSuccess, onFailure){
			return ProjectResource.get(params, onSuccess, onFailure);
		},
		save : function(projectInfo, onSuccess, onFailure) {
			return ProjectResource.save(projectInfo, onSuccess, onFailure);
		}
	}
	return services;
}