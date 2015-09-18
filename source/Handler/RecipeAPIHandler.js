var dbConnector = require('./dbConnector.js')
require('../gen-nodejs/RecipeAPI.js')

var recipeAPIHandler = {
	// search
	getAll: function(table, callback) {

		// callback(null, "good")
		// return

		var mysql = dbConnector.connect()

		if (mysql) {
			var data = [];
			mysql.query('SELECT * FROM ' + table, function(err, result) {
				if (err) {
					console.log(err);
					callback(err, null);
				}

				console.log(result);
				console.log('query execution complete!!');

				data += JSON.stringify(result);
				callback(null, data);

				// console.log('disconnection complete');
			});

			mysql.end();
		} else {
			callback(null, null)
		}
	},

	make_All_Recipe_list: function(callback) {
		callback(null)
	},
	make_Recc_Recipe_list: function(callback) {
		callback(null)
	},
	make_Sub_Recipe_list: function(callback) {
		callback(null)
	},
	make_norm_Recipe_list: function(callback) {
		callback(null)
	}
}

module.exports = function() {
	return recipeAPIHandler
}