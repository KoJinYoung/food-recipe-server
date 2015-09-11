

/*
function create(data, cb){
	var connection = getConnection();
	var value = "";
	connection.query('INSERT INTO `USER` SET ?', data, function(err, res){
		if(err) return cb(err);
		read(res.insertId, cb);
	});
	connection.end();
}

function update(data, cb){
	var connection = getConnection();
	var value = "";
	conneciton.query('UPDATE `book` SET ? WHERE `id` = ?', [data, id], function(err){
		if(err)	return cb(err);
	});
	connection.end();
}

function list(limit, token, cb){
	token = token ? parseInt(token, 10) : 0;
	var connection = getConnection();
	connection.query("SELECT * FROM `books` LIMIT ? OFFSET ? ", [limit, token], function(err, results){
		if(err)	return cb(err);
		cb(null, results, results.length === limit ? token + results.length : false);
	});
	connection.end();
}
*/

function recomm_recipe(data, cb){
	var connection = getConnection();
}

function subscribe_recipe(data,cb){
	var connection = getConnection();
}

function recent_recipe(data, cb){
	var connection = getConnection();
}