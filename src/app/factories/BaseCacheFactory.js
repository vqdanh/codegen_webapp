export default ["$cacheFactory", "CACHE", BaseCache];

function BaseCache($cacheFactory, CACHE) {
	let cache = $cacheFactory(CACHE.NAME);
  return {
  	set : function(key, object) {
  		cache.put(key, object);
  	},
  	get : function(key) {
  		return cache.get(object);
  	}
  }
}