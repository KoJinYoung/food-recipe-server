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


2015.9.21 05:06
--------------------------------------------
thriftClient 사용 예시 수정
 - exception read

"secure-random-string" npm package 추가

config 수정
- mysql / mysql_localhost에 database 속성값 삽입

dbConnecor 수정
 - tokenChecker 추가
 - tokenChecker (connection, token, callback)

UserInfo 수정
UserAPI 수정
UserAPIHandler 구현 95% 완료
 - 처음 가입인지 로그인인지 구분해는 부분 필요
 - 회원 탈퇴 구체화 (디비 구조가 완성되고 수정해야됨)
 - Exception 처리 (@Ziny 참고하세요)
 - signup_method는 bit연산으로 체크하세요.
 =============================================