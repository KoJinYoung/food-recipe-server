include 'RECIPE.thrift'


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
	RECIPE.Recipe make_All_Recipe_list();
	list<RECIPE.Recipe> make_Recc_Recipe_list();
	list<RECIPE.Recipe>	make_Subc_Recipe_list();
	list<RECIPE.Recipe>	make_norm_Recipe_list(1: string r_id);

}
