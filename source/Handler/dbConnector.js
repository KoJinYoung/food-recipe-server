var config = require('../config')
var mysql = require('mysql');
var extend = require('lodash').assign;

exports.connect = function (){

	if (config.dev == false) {
		return mysql.createConnection(extend({
			database: config.mysql_db
		}, config.mysql))
	}
	else {
		return mysql.createConnection(extend({
			database: config.mysql_db_localhost
		}, config.mysql_localhost))
	}
}

exports.tokenCheckQuery = function(token) {
	return 'SELECT USER_u_id as u_id FROM TOKEN WHERE token = "' + token + '";'
}