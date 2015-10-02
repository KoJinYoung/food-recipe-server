var thrift = require('thrift')
var RecipeAPI = require('./gen-nodejs/RecipeAPI')
var UserAPI = require('./gen-nodejs/UserAPI')
var assert = require('assert')
var config = require('./config')


transport = thrift.TBufferedTransport
protocol = thrift.TBinaryProtocol

var host = 'localhost'
//var host = config.host
var port = config.port


var connection = thrift.createConnection(host, port, {
	transport : transport,
	protocol : protocol

}).on('error', function(err){
	assert(false, err)

}).on('connect', function() {
	var mp = new thrift.Multiplexer()
	var recipeAPIClient = mp.createClient("RecipeAPI", RecipeAPI, connection)
	var userAPIClient = mp.createClient("UserAPI", UserAPI, connection)
	console.log('client running....')

        recipeAPIClient.getAll("student",  function(err,response){
                console.log('in client getall')
                console.log(response)
                //connection.end()
        })

	//recipeAPIClient.make_All_Recipe_list(function(err,response){
	//	console.log('in client marl')
	//	console.log(response)	
	//	connection.end()
	//})

	
	recipeAPIClient.make_norm_Recipe_list(0, function(err, response){
		console.log('in client mnrl')
		console.log(response)
	})
	recipeAPIClient.make_norm_Recipe_list(4, function(err, response){
		console.log('in client mnrl')
		console.log(response)
	})
	recipeAPIClient.make_norm_Recipe_list(8, function(err, response){
                console.log('in client mnrl')
                console.log(response)
        })

	
	// userAPIClient.getUserInfo('1', function(err, response) {
	// 	console.log(response)
	// 	connection.end()
	// })

	//userAPIClient.signup('email', 'password', function(err, response) {
	//	console.log(response)
	//	connection.end()
	//})
})

