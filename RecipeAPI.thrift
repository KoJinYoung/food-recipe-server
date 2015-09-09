include 'Recipe.thrift'


namespace java com.foodRecipe.core.thrift.service
namespace cocoa makcipeAPI

service RecipeAPI{

	//sql init
	void setMysql();

	//sql close
	void closeMysql();


	//search
	void getAll(1: string table) throws (1: Recipe.RecipeException uex);

	//insert

	//remove

}
