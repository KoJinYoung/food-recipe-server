var config = require('../config')
var mysql = require('mysql');
var extend = require('lodash').assign;

exports.currentUnixTimeQuery = 'ROUND(UNIX_TIMESTAMP(CURTIME(3))*1000)'

exports.connect = function() {

	if (config.dev == false) {
		return mysql.createConnection(extend(config.mysql))
	} else {
		return mysql.createConnection(extend(config.mysql_localhost))
	}
}

var PAGING_SIZE = 2
exports.PAGING_SIZE = PAGING_SIZE

var UNKOWN_TOKEN = 'Unknown Token'
exports.UNKOWN_TOKEN = UNKOWN_TOKEN
/**
 * @param connection - mysql.connect
 * @param token - given token
 * @param callback - function(error, user_id)
 * error - mysql Error OR 'Uknown Token' string
 */
exports.tokenChecker = function(connection, token, callback) {
	var query = 'SELECT USER_u_id as u_id FROM TOKEN WHERE token = "' + token + '";'

	connection.query(query, function(err, res) {

		if (err) {
			callback(err, null)
		} else if (res.length == 0) {
			err = new Error()
			err.code = UNKOWN_TOKEN
			callback(err, null)
		} else {
			// select user info
			var u_id = res[0].u_id
			callback(null, u_id)
		}
	})
}
