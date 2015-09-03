function getConnection(){
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host : "173.194.106.144",
		user : "ziny",
		password : "akrTj=100",
		database : "Maksse"
	});

	connection.connect(function(err){
		if(err)	console.log("Problem with Mysql " + err);
		else	console.log("Connected with Database");
	});
}