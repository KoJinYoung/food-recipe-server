var http = require('http');
var thrift = require('thrift');
var RecipeAPI = require('./gen-nodejs/RecipeAPI');
var ttypes = require('./gen-nodejs/RecipeAPI_types');

var data = [];

var mysql = require('mysql');
var connection = mysql.createConnection({
		// in lab
		host : "127.0.0.1",
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

var server = thrift.createServer(RecipeAPI, {
// make function
	setMysql: function(cb){
		connection.connect(function(err){
			if(err)	console.log('Connection error!');
			else	console.log('Connection complete!');
		});

		cb(null);
	},

	closeMysql: function(cb){
		connection.end();
		console.log('Disonnection complete!');

		cb(null);
	},

	// search
	getAll: function(table, cb){
		connection.query('SELECT * FROM ' + table, function(err, result, fields){
			if(err){
				console.log(err);
				cb(err);
			}
			console.log('in server query');
			console.log(result);
			console.log('query execution complete!!');
	//		cb(null, result);
		});
		cb(null, "fuck!");
	}
},{});

server.listen(9090);


