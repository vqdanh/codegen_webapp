'use strict';
export default DateUtilsFactory;

function DateUtilsFactory() {
  "ngInject";

	const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const DAYOFWEEK_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
      converDateTimeToUnixTime: function(datetime) {
      	return new Date(datetime).getTime(); // Unix Time
      },
      getDateTimeFromUnixTime: function(unix_timestamp) {
      	var date = new Date(parseInt(unix_timestamp));
				return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(); // 2015-12-30
      },
      getCurrentDate: function() {
      	var date = new Date();
 				return DAYOFWEEK_NAMES[date.getDay()] + ', ' + MONTH_NAMES[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear();
      },
      getExpireDate: function(expireDate) {
      	var date = new Date(parseInt(expireDate) + 3600 * 1000);
      	return DAYOFWEEK_NAMES[date.getDay()] + ', ' + MONTH_NAMES[date.getMonth()] + ' ' + date.getDate() + ' ' + date.getFullYear() + ' ' + date.getHours() + 
      	':' + date.getMinutes() + ':' + date.getSeconds();
      },
  };
}
