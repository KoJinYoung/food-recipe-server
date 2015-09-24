var dbConnector = require('./dbConnector.js')
require('../gen-nodejs/RecipeAPI.js')
var Recipe_ttypes = require('../gen-nodejs/Recipe_types')

/* query */
var RECIPE_QUERY = 'select USER.u_id, USER.user_pic, USER.user_name, RECIPE.r_id, RECIPE.r_name, RECIPE.r_contents, RECIPE.r_pic from RECIPE INNER JOIN USER ON RECIPE.USER_u_id = USER.u_id order by RECIPE.r_id desc'
var RECIPE_COUNT = 'select COUNT(*) RECIPE'

/* DUMMY - for recommand recipe */

/* enum */
var RECIPETYPE = Recipe_ttypes.RECIPETYPE
/**
 *	@param LEVEL = { 'NONE' = 1,
 *			 'RECOMM' = 2,
 *			 'SUBSC' = 3 }
 */
var LEVEL = Recipe_ttypes.LEVEL
/**
 *	@enum LEVEL = { 'EASY' = 1,
 *			'NORMAL' = 2,
 *			'HARD' = 3 }
 */

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

			query = RECIPE_QUERY
			mysql.query(query, function(err, res){
				if(err){
					err = new Recipe_ttypes.RecipeException(Ex_SERVER_ERROR)
					callback(err, null);
				}
				else if(res.length==0){
					err = new Recipe_ttypes.RecipeException(Ex_NOT_FOUND)
					callback(err, null);
				}
				else{
					//console.log(res)
					var resList = []

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
		
		var mysql = dbConnector.connect()

                if(mysql){

			query = RECIPE_QUERY
                        mysql.query(query, function(err, res){
                                if(err){
                                        err = new Recipe_ttypes.RecipeException(Ex_SERVER_ERROR)
                                        callback(err, null);
                                }
                                else if(res.length==0){
                                        err = new Recipe_ttypes.RecipeException(Ex_NOT_FOUND)
                                        callback(err, null);
                                }
                                else{
                                        var resList = []

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
                                        })

                                        callback(null, resList)
                                }
                        })
                }else{
                        callback(null, null)

                }
	},
	make_Sub_Recipe_list: function(callback) {
		callback(null)
	},
	make_norm_Recipe_list: function(idx, callback) {

		console.log('server side make_norm_Recipe_list()')

		var mysql = dbConnector.connect()
		var PAGING_SIZE = dbConnector.PAGING_SIZE

                if(mysql){

			if(RECIPE_COUNT>idx){
			query = RECIPE_QUERY + ' LIMIT ' + idx + ', ' + PAGING_SIZE

                        mysql.query(query, function(err, res){
                                if(err){
                                        err = new Recipe_ttypes.RecipeException(Ex_SERVER_ERROR)
                                        callback(err, null);
                                }
                                else if(res.length==0){
                                        err = new Recipe_ttypes.RecipeException(Ex_NOT_FOUND)
                                        callback(err, null);
                                }
                                else{
                                        var resList = []

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
                                        })

                                        callback(null, resList)
                                }
                        })

			}else{
				callback(null, null)
			}
                }else{
                        callback(null, null)

                }
	}
}

module.exports = function() {
	return recipeAPIHandler
}
