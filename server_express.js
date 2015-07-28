var express = require('express')
	, http = require('http')
	, app = express()
	, server = http.createServer(app);

app.get('/', function(req, res){
	res.send('Start! / ');
});

app.get('/world.html', function(req, res){
	res.send('Hello World!');
});

server.listen(8008, function(){
	console.log('exPress server listening on port ' + server.address().port);
});

