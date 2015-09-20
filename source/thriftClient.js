var thrift = require('thrift');
var RecipeAPI = require('./gen-nodejs/RecipeAPI');
var UserAPI = require('./gen-nodejs/UserAPI');
var UserInfo_ttypes = require('./gen-nodejs/UserInfo_types')

var assert = require('assert');
var config = require('./config')

transport = thrift.TBufferedTransport
protocol = thrift.TBinaryProtocol

var host = 'localhost'
	// var host = config.host
var port = config.port

var connection = thrift.createConnection(host, port, {
	transport: transport,
	protocol: protocol

}).on('error', function(err) {
	assert(false, err)

}).on('connect', function() {
	var mp = new thrift.Multiplexer()
	var recipeAPIClient = mp.createClient("RecipeAPI", RecipeAPI, connection)
	var userAPIClient = mp.createClient("UserAPI", UserAPI, connection)

	// recipeAPIClient.getAll("RECIPE",  function(err,response){
	// 	console.log(response)
	// 	connection.end()
	// })

	// userAPIClient.getUserInfo('1', function(err, response) {
	// 	console.log(response)
	// 	connection.end()
	// })

	userAPIClient.signupWithFacebook('facebook2', 'name1', 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpt1/v/t1.0-1/p320x320/11870645_10205584448038267_234953234403354380_n.jpg?oh=f294b70379a7fc7d516a41d886860471&oe=56AB8318&__gda__=1449917651_85af90b73412d95b6a8f645fa5bf1311', function(err, response) {
		if (err) {
			if (err instanceof UserInfo_ttypes.UserException) {
				console.log('[UserException]')
				console.log('what: '+err.what)
				console.log('why: '+err.why)
			}
			else console.log(err)
		}
		else console.log(response)
		
		connection.end()
	})
})