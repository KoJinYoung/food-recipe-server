var mysql = require('mysql');
var connection = mysql.createConnection({
		// in lab
		host : "localhost",
		user : "root",
		password : "ziny5601!",
		database : "a"

		// in home
		/*
		host : "173.194.106.144",
		user : "ziny",
		password : "akrTj=100",
		database : ""
		*/
	});

exports.closeMysql = function(){
	console.log("Disconnecting...");
	connection.end();
	console.log("Disconnecting complete!");
}

exports.setMysql = function(){
	connection.connect(function(err){
		if(err)	console.log("Problem with Mysql " + err);
		else	console.log("Connected with Database");
	});
}


// search
exports.getAll = function(table, cb){
	connection.query('SELECT * FROM ' + table, function(err, result, fields){
		if(err){
			console.log(err);
			cb(err);
		}
		
		console.log('query execution complete!!');
		cb(result);
	});

	console.log('callback database comeplete!!')
}




// insert

// remove
