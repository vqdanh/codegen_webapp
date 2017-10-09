'use strict';
export default SystemCacheFactory;

function SystemCacheFactory($cacheFactory, CACHE) {
	"ngInject";

	const CACHEDICT = CACHE.GROUP.SYSTEM;
	let cache = $cacheFactory(CACHEDICT.NAME);
	return {
		
	}
}