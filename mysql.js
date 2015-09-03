var mysql = require('mysql');
var connection = mysql.createConnection({
		host : "localhost",
		user : "root",
		password : "ziny5601!",
		database : "a"
	});

closeMysql = function(){
	console.log("Disconnecting...");
	connection.end();
	console.log("complete!");
}

getAll = function(table, cb){
	connection.query('SELECT * FROM ' + table, function(err, result, fields){
		if(err) console.log(err);
		else	cb(result);
	
	});

}

exports.setMysql = function(){
	connection.connect(function(err){
		if(err)	console.log("Problem with Mysql " + err);
		else	console.log("Connected with Database");
	});

	var table = 'student';
	getAll(table, function(data){
		console.log(data);
	})
	
	closeMysql();
}

