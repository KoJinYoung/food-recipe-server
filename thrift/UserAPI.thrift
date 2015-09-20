include 'UserInfo.thrift'

namespace java com.foodRecipe.core.thrift.service
namespace cocoa makcipeAPI

service UserAPI{

	/** sign up
	 * @param string email - 
	 * @param string password - 
	 * @return UserInfo.User = return an User Information
	 */
	UserInfo.User signup(1: string email, 2: string password) throws (1: UserInfo.UserException uex);

	/** sign up with facebook
	 * @param string fb_id - facebook user id
	 * @param string email - facebook account email
	 * @param string name - facebook user name
	 * @param string pic_url - facebook profile image url
	 * @return UserInfo.User = return an User Information
	 */
	UserInfo.User signupWithFacebook(1: string fb_id, 2:string name, 3: string pic_url) throws (1: UserInfo.UserException uex);

	/** sign up with kakao
	 * @param string ko_id - kakao user id
	 * @param string email - kakao account email
	 * @param string name - facebook user name
	 * @param string pic_url - facebook profile image url
	 * @return UserInfo.User = return an User Information
	 */
	UserInfo.User signupWithKakao(1: string ko_id, 2:string name, 3: string pic_url) throws (1: UserInfo.UserException uex);

	/** sign in
	 * @param string email -
	 * @param string password -
	 * @return UserInfo.User - return an User Information
	 */
	 UserInfo.User signin(1: string email, 2: string password) throws (1: UserInfo.UserException uex);

	 /** sign out
	 * @param string token -
	 */
	 void signout(1: string token) throws (1: UserInfo.UserException uex);

	/** withdraw
	 * @param string token -
	 * @param string password - If you want to withdraw, make password
	 */
	 void withdraw(1: string token, 2: string password) throws (1: UserInfo.UserException uex);	 

	/** get user information
	 * @param string token - 
	 * @return UserInfo.User - return an User Information
	 */
	UserInfo.User getUserInfo(1: string token) throws (1: UserInfo.UserException uex);



}
