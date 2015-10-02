Settings
--------------------------------------------
[ Platform ]
ios 	->	thrift/gen-cocoa
android ->	thrift/gen-java
nodejs 	-> 	thrift/gen-nodejs

[ Server Settings ]
API Server HOST : dev.makcipe.com
API Server PORT : 9090

[ thrift ]
 - socket 통신 (not HTTP/HTTPS)
 - Protocol : multiplexed with TBinaryProtocol

[ API service name ]
[   API   ]	: [  name  ]
 UserAPI 	:  UserAPI
 RecipeAPI 	:  RecipeAPI

=============================================


업데이트 내역 : thrift/README.md



gcloud command
--------------------------------------------
[ 서버로 파일 복사 ]
gcloud compute --project "makcipe-server" copy-files ./* [본인계정]@vm1:/server/ --zone asia-east1-a

[ 서버 ssh 연결 ]
gcloud compute --project "makcipe-server" ssh --zone "asia-east1-a" "[본인계정]@vm1"

=============================================