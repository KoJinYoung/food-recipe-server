include 'Recipe.thrift'


namespace java com.foodRecipe.core.thrift.service
namespace cocoa makcipeAPI

service RecipeAPI{

	//search
	string getAll(1: string table);

	//insert
	//remove



	//Recipe.RECIPE makeRecipe_list();

}
