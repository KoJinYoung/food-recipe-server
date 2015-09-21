var dbConnector = require('./dbConnector.js')
require('../gen-nodejs/UserAPI.js')
var UserInfo_ttypes = require('../gen-nodejs/UserInfo_types')
var srs = require('secure-random-string')

/* enum */
var SIGNUP_STATUS = UserInfo_ttypes.SIGNUP_STATUS
var AUTH_METHOD = UserInfo_ttypes.AUTH_METHOD

/* exception code */
var Ex_INVALID = {
	what: UserInfo_ttypes.UserExCode.INVALID,
	why: 'Invalid'
}
var Ex_SERVER_ERROR = {
	what: UserInfo_ttypes.UserExCode.SERVER_ERROR,
	why: 'Server has error'
}
var Ex_NOT_FOUND = {
	what: UserInfo_ttypes.UserExCode.NOT_FOUND,
	why: 'Data not exists'
}
var Ex_DATA_EXISTS = {
	what: UserInfo_ttypes.UserExCode.DATA_EXISTS,
	why: 'Data exists'
}

/* get user info */
var selectUser = function(method, mysql, value, callback) {

	var query = "SELECT \
					u_id as uid, \
					facebook as facebookId, \
					kakao as kakaoId, \
					email as email, \
					user_name as username, \
					user_pic as pic, \
					signup_status as signup_status \
				FROM USER WHERE "

	if (method == null)
		query = query + 'u_id = ' + value
	else if (method == AUTH_METHOD.FACEBOOK)
		query = query + 'facebook = ' + mysql.escape(value)
	else if (method == AUTH_METHOD.KAKAO)
		query = query + 'kakao = ' + mysql.escape(value)
	else if (method == AUTH_METHOD.EMAIL)
		query = query + 'email = ' + mysql.escape(value[0]) + ' AND password = ' + mysql.escape(value[1])

	mysql.query(query, function(err, res) {

		if (err) {
			err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)
			callback(err, null)
		} else if (res.length == 0) {
			err = new UserInfo_ttypes.UserException(Ex_NOT_FOUND)
			callback(err, null)
		} else {

			var userData = res[0]
			var resUser = new UserInfo_ttypes.User()

			resUser.uid = userData.uid
			resUser.username = userData.username
			resUser.facebookId = userData.facebookId
			resUser.kakaoId = userData.kakaoId
			resUser.email = userData.email
			resUser.pic = userData.pic
			resUser.signup_status = userData.signup_status

			callback(null, resUser)
		}
	})
}

var func_SignIn = function(mysql, st_user, callback) {

	var token = srs({
		length: 200
	});

	var query = 'INSERT INTO TOKEN SET ? \
							ON DUPLICATE KEY UPDATE ?'
	var insert_values = {
		USER_u_id: st_user.uid,
		token: token,
		create_time: dbConnector.currentUnixTimeQuery,
		update_time: dbConnector.currentUnixTimeQuery
	}

	var update_values = {
		USER_u_id: st_user.uid,
		token: token,
		update_time: dbConnector.currentUnixTimeQuery
	}

	mysql.query(query, [insert_values, update_values], function(err, res) {
		if (err) {
			err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)
			callback(err, null)
		} else {

			st_user.token = token;
			callback(null, st_user)
		}
	})

	// end Insert Token
}


var func_SignUp = function(mysql, method, values, callback) {

	/* Insert User */
	var query = 'INSERT INTO USER SET '

	if (method == AUTH_METHOD.FACEBOOK) {
		query += " facebook = " + mysql.escape(values.facebook)
		query += ", user_name = " + mysql.escape(values.user_name)
		query += ", user_pic = " + mysql.escape(values.user_pic)
		query += ", signup_status = " + values.signup_status
	} else if (method == AUTH_METHOD.KAKAO) {
		query += " kakao " + mysql.escape(values.kakao)
		query += ", user_name = " + mysql.escape(values.user_name)
		query += ", user_pic = " + mysql.escape(values.user_pic)
		query += ", signup_status = " + values.signup_status
	} else {
		query += " email = " + mysql.escape(values.email)
		query += ", password = " + mysql.escape(values.password)
		query += ", signup_status = " + values.signup_status
	}

	query += ", create_time = " + dbConnector.currentUnixTimeQuery
	query += ", update_time = " + dbConnector.currentUnixTimeQuery

	mysql.query(query, function(err, res) {


		if (err) {

			if (err.code == 'ER_DUP_ENTRY') {

				if (method != AUTH_METHOD.EMAIL) {

					var value;
					if (method == AUTH_METHOD.FACEBOOK)
						value = values.facebook
					else if (method == AUTH_METHOD.KAKAO)
						value = values.kakao

					// get UserInfo
					selectUser(method, mysql, value, function(err, resUser) {
						if (err) {
							callback(err, null)
						} else {
							func_SignIn(mysql, resUser, callback)
						}
					})
					return
				}

				err = new UserInfo_ttypes.UserException(Ex_DATA_EXISTS)
			} else
				err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)

			callback(err, null)
		} else {

			/* Insert Token */
			var st_user = new UserInfo_ttypes.User()
			st_user.uid = res.insertId
			st_user.username = values.user_name
			st_user.facebookId = values.facebook
			st_user.kakaoId = values.kakao
			st_user.email = values.email
			st_user.pic = values.user_pic
			st_user.signup_status = values.signup_status

			// login
			func_SignIn(mysql, st_user, callback)

		}
	})

	// end Insert Token
}

var checkSignupMethod = function(st_user) {
	st_user.auth_method = 0
	if (st_user.facebookId) st_user.auth_method |= AUTH_METHOD.FACEBOOK
	if (st_user.kakaoId) st_user.auth_method |= AUTH_METHOD.KAKAO
	if (st_user.email) st_user.auth_method |= AUTH_METHOD.EMAIL

	return st_user
}


var userAPIHandler = {

	signup: function(email_, password_, callback) {

		var mysql = dbConnector.connect()

		var values = {
			email: email_,
			password: password_,
			signup_status: SIGNUP_STATUS.SIGNUP
		}

		mysql.beginTransaction(function(err) {
			if (err) {
				err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)
				callback(err, null)
				mysql.end()
			} else {
				func_SignUp(mysql, AUTH_METHOD.EMAIL, values, function(err, st_user) {
					if (err) {
						callback(err, null)
						mysql.rollback()
						mysql.end()
					} else {
						mysql.commit(function(err) {
							if (err) {
								err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)
								callback(err, null)
								mysql.rollback()
								mysql.end()
							} else {
								checkSignupMethod(st_user)
								callback(null, st_user)
								mysql.end()
							}
						})
					}
				})
			}
		})
	},

	signupWithFacebook: function(fb_id, name, pic_url, callback) {

		var mysql = dbConnector.connect()

		var values = {
			facebook: fb_id,
			user_name: name,
			user_pic: pic_url,
			signup_status: SIGNUP_STATUS.FACEBOOK
		}

		mysql.beginTransaction(function(err) {
			if (err) {
				err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)
				callback(err, null)
				mysql.end()
			} else {
				func_SignUp(mysql, AUTH_METHOD.FACEBOOK, values, function(err, st_user) {
					if (err) {
						callback(err, null)
						mysql.rollback()
						mysql.end()
					} else {
						mysql.commit(function(err) {
							if (err) {
								err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)
								callback(err, null)
								mysql.rollback()
								mysql.end()
							} else {
								checkSignupMethod(st_user)
								callback(null, st_user)
								mysql.end()
							}
						})
					}
				})
			}
		})
	},

	signupWithKakao: function(ko_id, name, pic_url, callback) {

		var mysql = dbConnector.connect()

		var values = {
			kakao: ko_id,
			user_name: name,
			user_pic: pic_url,
			signup_status: SIGNUP_STATUS.KAKAO
		}

		mysql.beginTransaction(function(err) {
			if (err) {
				err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)
				callback(err, null)
				mysql.end()
			} else {
				func_SignUp(mysql, AUTH_METHOD.KAKAO, values, function(err, st_user) {
					if (err) {
						callback(err, null)
						mysql.rollback()
						mysql.end()
					} else {
						mysql.commit(function(err) {
							if (err) {
								err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)
								callback(err, null)
								mysql.rollback()
								mysql.end()
							} else {
								callback(null, st_user)
								mysql.end()
							}
						})
					}
				})
			}
		})
	},

	signin: function(email, password, callback) {

		var mysql = dbConnector.connect()

		selectUser(AUTH_METHOD.EMAIL, mysql, [email, password], function(err, st_user) {

			if (err) {
				callback(err, null)
				mysql.end()
			} else {

				mysql.beginTransaction(function(err) {
					if (err) {
						err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)
						callback(err, null)
						mysql.end()
					} else {
						// get TOKEN
						func_SignIn(mysql, st_user, function(err, st_user) {
							if (err) {
								callback(err, null)
								mysql.rollback()
								mysql.end()
							} else {
								mysql.commit(function(err) {
									if (err) {
										err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)
										callback(err, null)
										mysql.rollback()
										mysql.end()
									} else {
										callback(null, st_user)
										mysql.end()
									}
								})
							}
						})
					}
				})
			}
		})
	},

	signout: function(token, callback) {

		var mysql = dbConnector.connect()

		var query = 'DELETE FROM TOKEN WHERE token = ' + mysql.escape(token)

		mysql.query(query, function(err, res) {
			callback(null)
		})
		mysql.end()
	},

	withdraw: function(token, password, callback) {
		var mysql = dbConnector.connect()

		dbConnector.tokenChecker(mysql, token, function(err, uid) {
			if (err) {
				if (err.code == dbConnector.UNKOWN_TOKEN)
					err = new UserInfo_ttypes.UserException(Ex_INVALID)
				else
					err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)

				callback(err, null)
			} else {
				var query = 'DELETE FROM USER WHERE u_id = ' + uid
				mysql.query(query, function(err, res) {

					query = 'DELETE FROM TOKEN WHERE USER_u_id = ' + uid

					mysql.query(query, function(err, res) {
						callback(null)

						mysql.end()
					})

				})
			}
		})
	},

	getUserInfo: function(token, callback) {

		var mysql = dbConnector.connect()

		// check token
		dbConnector.tokenChecker(mysql, token, function(err, uid) {
			if (err) {
				if (err.code == dbConnector.UNKOWN_TOKEN)
					err = new UserInfo_ttypes.UserException(Ex_INVALID)
				else
					err = new UserInfo_ttypes.UserException(Ex_SERVER_ERROR)

				callback(err, null)
			} else {
				selectUser(null, mysql, uid, function(err, resUser) {
					resUser.token = token
					callback(err, res)
				})
			}
			mysql.end()
		})
	}
}

module.exports = function() {
	return userAPIHandler
}