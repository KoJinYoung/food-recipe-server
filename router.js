function route(handle, pathname, response, postData){
	console.log("About to route a request for " + pathname);
	if(typeof handle[pathname]=== 'function'){
		handle[pathname](response, postData);
	}else{
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type" : "text/plain"});
		response.write("404 Not found!");
		response.end();
	}
}

// export 통해서 다른곳에 있는 함수 사용 가능(injection)
exports.route = route;
