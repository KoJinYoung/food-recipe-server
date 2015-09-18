var dbConnector = require('./dbConnector.js')
require('../gen-nodejs/UserAPI.js')
var UserInfo_ttypes = require('../gen-nodejs/UserInfo_types')
var AUTH_METHOD = UserInfo_ttypes.AUTH_METHOD

var dummyUser = new UserInfo_ttypes.User()
dummyUser.uid = 1
dummyUser.token = '1'
dummyUser.username = 'tester'
dummyUser.auth_method = AUTH_METHOD.FACEBOOK | AUTH_METHOD.KAKAO
dummyUser.facebookId = 'facebookId'
dummyUser.kakaoId = 'kakaoId'
dummyUser.email = 'email@mail.com'
dummyUser.pic = 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpt1/v/t1.0-1/p320x320/11870645_10205584448038267_234953234403354380_n.jpg?oh=f294b70379a7fc7d516a41d886860471&oe=56AB8318&__gda__=1449917651_85af90b73412d95b6a8f645fa5bf1311'

var userAPIHandler = {

	signup: function(email, password, callback) {
		callback(null, dummyUser)
	},

	signupWithFacebook: function(fb_id, email, pic_url, callback) {
		callback(null, dummyUser)
	},

	signupWithKakao: function(ko_id, email, pic_url, callback) {
		callback(null, dummyUser)
	},

	signin: function(token, callback) {
		callback(null, dummyUser)
	},

	signout: function(token, callback) {
		callback(null)
	},

	withdraw: function(token, password, callback) {
		callback(null)
	},

	getUserInfo: function(token, callback) {

		var mysql = dbConnector.connect()

		// check token
		mysql.query(dbConnector.tokenCheckQuery(token), function(err, res) {
			if (err) {
				callback(err, null)
			} else {

				// select user info
				if (res.length > 0) {
					var u_id = res[0].u_id

					var query = 'SELECT ' +
						'	u_id as uid, ' +
						'	facebook as facebookId, ' +
						'	kakao as kakaoId, ' +
						'	email as email, ' +
						'	user_name as username, ' +
						'	user_pic as pic ' +
						'FROM USER WHERE u_id = ' + u_id

					mysql.query(query, function(err_1, res_1) {
						if (err_1) {
							callback(err, null)
						} else {
							var userData = res_1[0]
							var resUser = new UserInfo_ttypes.User()

							resUser.uid = userData.uid
							resUser.token = token
							resUser.username = userData.username
								// resUser.auth_method
							resUser.facebookId = userData.facebookId
							resUser.kakaoId = userData.kakaoId
							resUser.email = userData.email
							resUser.pic = userData.pic

							callback(null, resUser)
						}
					})
				} else {
					callback(null, null)
				}
			}

			mysql.end()
		})
	}
}

module.exports = function() {
	return userAPIHandler
}