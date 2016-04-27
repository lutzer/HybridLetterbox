/* CONFIG FILE */

var Config = {
	
	databaseFile : __dirname + "/data", //chmod this path 777

	baseUrl : '/api/', // with trailing /
	servePublicDir : true,
	hostname : false, // 127.0.0.1 = private, false = public
	port : '8081'

};

module.exports = Config;