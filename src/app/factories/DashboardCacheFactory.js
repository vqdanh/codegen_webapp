'use strict';
export default DashboardCacheFactory;

function DashboardCacheFactory($cacheFactory, CACHE) {
	"ngInject";

	const CACHEDICT = CACHE.GROUP.DASHBOARD;
	let cache = $cacheFactory(CACHEDICT.NAME);
	return {
		
	}
}