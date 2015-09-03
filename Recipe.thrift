namespace java com.foodRecipe.core.thrift.model.recipe
namespace cocoa foodRecipe

////////////////////////////////////////////////////////////////////////
//
// define c style integer

typedef i64 long
typedef i32 int



enum Level{
	EASY = 1,
	NORMAL = 2,
	HARD = 3
}

struct IngredientInfo{
        1:      optional string name;
        2:      optional string id;
}

struct RecipeInfo{
	1: 	optional int calories;
	2: 	optional Level level;
	3:	optional int cookTime;
	4:	optional list<IngredientInfo>	ingredient;
}

struct Recipe{
	1:	optional int recipeId;
	2:	optional int writerId;
	3:	optional string writerPic;
	4:	optional string writerName;
	5:	optional string recipeName;
	6:	optional string recipePic;
	7:	optional string	recipeComment;
	8:	optional RecipeInfo	recipeInfo;
	9:	optional bool recipeLiked;
}
enum RecipeExCode{
	INVALID = 0,
	SERVER_ERROR = 1,
	NOT_FOUND = 2,
	DATA_EXIST = 3,
}

exception RecipeException{
	1:	RecipeExCode what;
	2:	string why;
}
