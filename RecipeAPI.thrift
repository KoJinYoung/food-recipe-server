include 'Recipe.thrift'


namespace java com.foodRecipe.core.thrift.service
namespace cocoa makcipeAPI

service RecipeAPI{


	//void setMysql();
	//void closeMysql();

	//search
	string getAll(1: string table);

	//insert
	//remove


	// make list func
	Recipe.Recipe make_All_Recipe_list();
	list<Recipe.Recipe> make_Recc_Recipe_list();
	list<Recipe.Recipe>	make_Subc_Recipe_list();
	list<Recipe.Recipe>	make_norm_Recipe_list(1: string r_id);

}
