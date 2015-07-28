// post 데이터를 받아 넘겨주는 부분 작성

function start(response, postData){
	console.log("Request handler 'start' was called.");

	var body = '<html>' +
		'<head>' +
		'<meta http-equiv = "Content-Type" content="text/html; ' +
		'charset=UTF-8" />' +
		'</html>' +
		'<body>' +
		'<form action="/upload" method="post"> ' +
		'<textarea name="text" rows="20" cols="60"></textarea>' +
		'<input type="submit" value="Submit text" />' +
		'</form>' +
		'</body>' +
		'</html>';
	
		response.writeHead(200, {"Content-Type" : "text/plain"});
		response.write(stdout);
		response.end();
}

function upload(response, postData){
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type" : "text/plain"});
	response.write("you've sent : " + postData);
	querystring.parse(postData).text;
	response.end();
}

//export 통해서 다른 곳에 있는 함수 사용 가능(injection)

exports.start = start;
exports.upload = upload;
