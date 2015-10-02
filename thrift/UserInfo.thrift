namespace java com.foodRecipe.core.thrift.model.user
namespace cocoa makcipeAPI

////////////////////////////////////////////////////////////////////////
//
// define c style integer

enum SIGNUP_STATUS {
	SIGNUP = 1,
	CERTIFICATED = 2,
	WITHDREW = 3
}

enum AUTH_METHOD {
	FACEBOOK = 0x00000001,
	KAKAO = 0x00000010,
	EMAIL = 0x00000100
}


/** Basic unit of user's information
 * @param uid. unique id
 * @param name.
 * @param auth_method. The method which are certificated. This value is binary. It consists of AUTH_METHOD.
 * @param facebookId. It can be null.
 * @param kakaoId. It can be null.
 * @param email. It can be null.
 * @param pic. The url of profile image.
 * @param follower. The number of follower.
 * @param following. The number of following who.
 */
struct User{
	1:	optional i32 			uid;
	2:	optional string			token;
	3:	optional string			username;
	4:	optional i32 			auth_method;
	5:	optional string 		facebookId;
	6:	optional string 		kakaoId;
	7:	optional string 		email;
	8:	optional string			pic;
	9:	optional i32			follower;
	10:	optional i32 			following;
	11:	optional SIGNUP_STATUS	signup_status;
}	

enum UserExCode{
	INVALID = 0,
	SERVER_ERROR = 1,
	NOT_FOUND = 2,
	DATA_EXISTS = 3
}

exception UserException{
	1:	UserExCode what;
	2:	string why;
}
