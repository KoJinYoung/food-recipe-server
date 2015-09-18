var thrift = require('thrift');
var config = require('./config')

/* API */
var RecipeAPI = require('./gen-nodejs/RecipeAPI');
var UserAPI = require('./gen-nodejs/UserAPI');
var RecipeAPIHandler = require('./Handler/RecipeAPIHandler');
var UserAPIHandler = require('./Handler/UserAPIHandler');

/* processor */
var processor = new thrift.MultiplexedProcessor()
processor.registerProcessor("RecipeAPI", new RecipeAPI.Processor(RecipeAPIHandler()))
processor.registerProcessor("UserAPI", new UserAPI.Processor(UserAPIHandler()))

var serverOpt = {
	protocol: thrift.TBinaryProtocol,
	transport: thrift.TBufferredTransport
}

thrift.createMultiplexServer(processor, serverOpt)
	.on('error', function(error) {
		console.log(error)
	})
	.listen(config.port);

console.log("Thrift Mux Server running on port: " + config.port)