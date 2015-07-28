//////////////////// created by ziny
// server.js	
var http = require('http');
var url = require('url');

// content를 server로 보내는 대신, server를 content로 보냄
// callback 함수를 이용해 처리할 수 있도록!
// handler 스스로가 요청에 대한 처리를 수행할 수 있음
function start(route, handle, postData) {
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log("Received Post data chunk '" + postDataChunk + "',.");

		});

		request.addListener("end", function() {
			route(handle, pathname, response, postData);
		});

	}
	http.createServer(onRequest).listen(8008);
	console.log("Server has started!!");
}
exports.start = start;

