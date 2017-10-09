import StringUtilsFactory 					from './StringUtilsFactory';
import ResourceInterceptorFactory	from './ResourceInterceptorFactory';
import DateUtilsFactory						from './DateUtilsFactory';
import SystemCacheFactory						from './SystemCacheFactory';
import GlobalCacheFactory					from './GlobalCacheFactory';
import DashboardCacheFactory			from './DashboardCacheFactory';
import Pluralize from 'pluralize';
import StringifyObject from  'stringify-object';

export default angular
	.module('app.factory', [])
	.factory('StringUtils', StringUtilsFactory)
	.factory('ResourceInterceptor', ResourceInterceptorFactory)
	.factory('DateUtils', DateUtilsFactory)
	.factory('SystemCacheFactory', SystemCacheFactory)
	.factory('GlobalCache', GlobalCacheFactory)
	.factory('DashboardCache', DashboardCacheFactory)
	.factory('Pluralize', function(){return Pluralize;})
	.factory('StringifyObject', function(){return StringifyObject;})
	
	.run(() => {
    console.debug("Starting the 'app.factory' module");
  });