namespace java com.foodRecipe.core.thrift.model.recipe
namespace cocoa makcipeAPI

////////////////////////////////////////////////////////////////////////
//
// define c style integer

typedef i64 long
typedef i32 int

enum RECIPETYPE{
	NONE = 1,
	RECOMM = 2,
	SUBSC = 3,
}

enum LEVEL{
	EASY = 1,
	NORMAL = 2,
	HARD = 3
}

struct IngredientInfo{
        1:      optional string name;
        2:      optional string id;
	3:	optional string unit;
}

struct Recipe{
	1:	optional int recipeId;
	2:	optional int writerId;
	3:	optional string writerPic;
	4:	optional string writerName;
	5:	optional string recipeName;
	6:	optional string recipePic;
	7:	optional string	recipeComment;
	8:	optional int calories;
	9:	optional LEVEL level;
	10:	optional int cookTime;
	11:	optional bool recipeLiked;
	12:	optional int likeCount;
        13:     optional list<IngredientInfo>   ingredient;
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
