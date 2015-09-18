2015.9.18 02:16
--------------------------------------------
UserInfo.thrift 구성 완료
UserAPI.thrift 구성 완료

getUserInfo의 token = 1 으로 테스트하시면 됩니다.
그외 나머지 service들은 더미 사용자 정보가 반환됩니다.

* Server Settings *
API Server HOST : dev.makcipe.com
API Server PORT : 9090

각 플랫폼에 맞게
ios 	->	gen-cocoa
android ->	gen-java
nodejs 	-> 	gen-nodejs
폴더를 작업중이 소스에 추가하시면 됩니다.

nodejs에서의 사용법은
../source/thriftClient.js
를 참고하시면 됩니다.

=============================================