// 모듈을 추출
var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

// Mysql과 연결
var client = mysql.createConnection ({
    host : "173.194.106.144"
	,user : "ziny"
	,password : "akrTj=100"
	,database : "Maksse"
});

//client.connect();

// 서버 생성
var app = express();

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// 서버 실행
http.createServer(app).listen(3000, function() {
    console.log('server running at http://localhost:3000');
});

// router를 수행해서 페이지 분기
// 리스트 조회
app.route('/')
    .get(function(req, res, next) {
        getList(req,res,next);
    })
    .post(function(req, res, next) {
        getList(req,res,next);
    });

// 레시피 리스트를 불러오는 부분
function getList(req, res, next) {
    // list.html을 읽음
    fs.readFile('./list_recipe.html', 'utf-8', function(error, data){
    	if(error) console.log(error);
        // mysql 에서 데이터 query
        client.query('SELECT * FROM RECIPE', function (error, results) {
            if(error) console.log(error);

            // 결과 리턴
            res.send(ejs.render(data, {
                data : results
            }));
        });
    });
};

app.route('/edit/:r_id')
    .get(function(req, res, next) {
        console.log('r_id : %s', req.params.r_id);
        fs.readFile('./edit_recipe.html', 'utf-8', function(error, data){
        	if(error)	console.log("in edit_recipe / " + error);

            client.query('SELECT * FROM RECIPE WHERE r_id = ?', req.params.r_id, function (error, result) {
                if(error) console.log(error);

                // 응답
                res.send(ejs.render(data, {
                	data : result[0]
                }));
            });
        });
    })
    .post(urlencodedParser, function(req, res, next) {
    	console.log('edit post');
        var body = req.body;
        // body.id is undefined. Then use req.param('id')
        console.log('r_id : %s, %s', body.r_id, req.params.r_id);

        client.query('UPDATE RECIPE SET r_name = ?, r_contents = ?, WHERE r_id = ?', 
            [body.r_name, body.r_contents, req.params.r_id], function() {
            res.redirect('/');
        });
    });

// 레시피를 추가하는 부분
app.route('/insert')
    .get(function(req, res, next) {
        fs.readFile('./insert_recipe.html', 'utf-8', function(error, data) {	// 폼이 저장되어있는 insert_recipe.html 를 불러옴
        	if(error)	console.log("in insert_recipe / " + error)
            res.send(data);
        })
    })
    .post(urlencodedParser, function(req, res, next) {							// 폼으로부터 값을 전달받음
        console.log('insert post');
        var body = req.body;
        console.log('body : ' + req.body.r_name + '/' + req.body.r_contents);	// 들어온 값이 정상적인지 출력해서 확인
        client.query('INSERT INTO RECIPE (r_name, r_contents, USER_u_id) VALUES (?, ?, ?)', [	// 쿼리문을 통해 html문서에서 name 속성을 지닌 폼의 값을 RECIPE 테이블의 해당 column에 저장
            body.r_name, body.r_contents, 1], function() {
                res.redirect('/');
            });
    });