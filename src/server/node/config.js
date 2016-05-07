/* CONFIG FILE */

var Config = {

	/* DATABASE */
	database: "mongodb://localhost/letterbox",
	submissionCollection: "submissions",

	/* FILE UPLOAD */
	uploadDirTmp: '_tmp/',
	fileDir: '../files/',

	/* SERVER CONFIG */
	baseUrl : '/', // with trailing /
	publicDir : '../www/',
	hostname : false, // 127.0.0.1 = private, false = public
	port : '8081',


	/* TEST CONFIG */
	testDatabase :"mongodb://localhost/letterbox_test",
	testPort: '8881'

};

module.exports = Config;