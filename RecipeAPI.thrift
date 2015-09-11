include 'Recipe.thrift'


namespace java com.foodRecipe.core.thrift.service
namespace cocoa makcipeAPI

service RecipeAPI{

	//sql init
	void setMysql();

	//sql close
	void closeMysql();


	//search
	string getAll(1: string table)

	//insert

	//remove

}
