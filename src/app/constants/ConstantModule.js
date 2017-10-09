import {COMMON}								from './CommonConstant';
import {STATE} 								from './StateConstant';
import {COOKIE} 							from './CookieConstant';
import {EVENT} 								from './EventConstant';
import {CACHE} 								from './CacheConstant';

export default angular
	.module('app.data.constant', [])
	.constant("COMMON",COMMON)
	.constant("STATE",STATE)
	.constant("COOKIE",COOKIE)
	.constant("EVENT", EVENT)
	.constant("CACHE", CACHE)
	.run(() => {
    console.debug("Starting the 'app.data.constant' module");
  });