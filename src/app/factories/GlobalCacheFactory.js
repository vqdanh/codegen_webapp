'use strict';
export default GlobalCacheFactory;
function GlobalCacheFactory($cacheFactory, CACHE) {
  "ngInject";

	const CACHEDICT = CACHE.GROUP.GLOBAL;
	let cache = $cacheFactory(CACHEDICT.NAME);
  return {
  	setLoggedUser : function(loggedUser) {
  		cache.put(CACHEDICT.KEYS.LOGGED_USER, loggedUser);
  	},
  	getLoggedUser : function() {
  		return cache.get(CACHEDICT.KEYS.LOGGED_USER);
  	}
  }
}