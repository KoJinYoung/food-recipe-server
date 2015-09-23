var dbConnector = require('./dbConnector.js')
require('../gen-nodejs/RecipeAPI.js')
var Recipe_ttypes = require('../gen-nodejs/Recipe_types')
var list = require('list')


/* enum */
var RECIPETYPE = Recipe_ttypes.RECIPETYPE
var LEVEL = Recipe_ttypes.LEVEL

/* exception code */
var Ex_INVALID = {
	what:	Recipe_ttypes.RecipeExCode.INVALID,
	why:	'Invalid'
}
var Ex_SERVER_ERROR = {
	what:	Recipe_ttypes.RecipeExCode.SERVER_ERROR,
	why:	'Server has error'
}
var Ex_NOT_FOUND = {
	what:	Recipe_ttypes.RecipeExCode.NOT_FOUND,
	why:	'Data not exists'
}
var Ex_DATA_EXIST = {
	what:	Recipe_ttypes.RecipeExCode.DATA_EXIST,
	why:	'Data exists'
}


var recipeAPIHandler = {
	// search
	getAll: function(table, callback) {
		console.log("server side getall()")
		var data = 'test API';
		callback(null, data);
	},

	make_All_Recipe_list: function(callback) {

		console.log("server side make_all_recipe_list()")

		var mysql = dbConnector.connect()

		if(mysql){

			//dev
			var query = 'select USER.u_id, USER.user_pic, USER.user_name, RECIPE.r_id, RECIPE.r_name, RECIPE.r_contents, RECIPE.r_pic from RECIPE INNER JOIN USER ON RECIPE.USER_u_id = USER.u_id'		
			//localhost	
			//var query = "select student.name, book.b_name, book.day from student INNER JOIN book ON student.no = book.f_no"

			mysql.query(query, function(err, res, row){
				if(err){
					err = new Recipe_ttypes.RecipeException(Ex_SERVER_ERROR)
					callback(err, null);
				}
				else if(res.length==0){
					err = new Recipe_ttypes.RecipeException(Ex_NOT_FOUND)
					callback(err, null);
				}
				else{
					var resList = []// new list()

					res.forEach(function(resData){
						var resRecipe = new Recipe_ttypes.Recipe()
                                                resRecipe.recipeId = resData.r_id
                                                resRecipe.recipeName = resData.r_name
                                                resRecipe.recipePic = resData.r_pic
                                                resRecipe.recipeComment = resData.r_contents
                                                resRecipe.writerId = resData.u_id
                                                resRecipe.writerName = resData.user_name
                                                resRecipe.writerPic = resData.user_pic
                                                resList.push(resRecipe)
					});
					
					callback(null, resList)
				}
			})
		}else{
			callback(null, null)

		}
	
	},
	make_Recc_Recipe_list: function(callback) {
		callback(null)
	},
	make_Sub_Recipe_list: function(callback) {
		callback(null)
	},
	make_norm_Recipe_list: function(callback) {
		callback(null)
	}
}

module.exports = function() {
	return recipeAPIHandler
}
