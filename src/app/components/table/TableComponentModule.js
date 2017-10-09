import TableManageDirective					from './manage/table-manage-directive';
import TableEditDirective						from './edit/table-edit-directive';
import TableConfigDirective					from './config/table-config-directive';

import MethodDiablogController     	from './dialog/method/method-dialog-controller';
import MethodDiablogListController  from './dialog/method-list/method-list-dialog-controller';

import TableManageService						from './manage/table-manage-service';
import TableDiablogService					from './dialog/table-dialog-service';

export default angular
	.module('app.component.table', [])

	.directive('tableManage', TableManageDirective)
	.directive('tableEdit', TableEditDirective)
	.directive('tableConfig', TableConfigDirective)

	.controller('MethodDiablogController', MethodDiablogController)
	.controller('MethodDiablogListController', MethodDiablogListController)

	.service('TableManageService', TableManageService)
	.service('TableDiablogService', TableDiablogService)