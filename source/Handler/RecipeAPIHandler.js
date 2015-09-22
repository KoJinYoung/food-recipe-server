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
		var data = 'test API';
		callback(null, data);
	},

	make_All_Recipe_list: function(callback) {

		var mysql = dbConnector.connect()

		if(mysql){

			//dev
			var query = "select USER.u_id, USER.u_pic, USER.name, RECIPE.r_id, RECIPE.r_name, RECIPE.r_contents, RECIPE.r_pic";		
			//localhost	
			//var query = "select student.name, book.b_name, book.day from student INNER JOIN book ON student.no = book.f_no"
			var resList = new list();

			mysql.query(query, function(err, res,row){
				if(err){
					err = new Recipe_ttypes.RecipeException(Ex_SERVER_ERROR)
					callback(err, null);
				}
				else if(res.length==0){
					err = new Recipe_ttypes.RecipeException(Ex_NOT_FOUND)
					callback(err, null);
				}
				else{
					
					var resRecipe = new Recipe_ttypes.Recipe()
					
					resRecipe.recipeId = res.r_id
					resRecipe.recipeName = res.r_name 
					resRecipe.recipePic = res.r_pic
					resRecipe.recipeComment = res.r_contents
					resRecipe.writerId = res.u_id
					resRecipe.writerName = res.name
					resRecipe.writerPic = res.u_pic			
					
					resList.add(resRecipe)
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
