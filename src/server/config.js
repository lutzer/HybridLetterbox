/* CONFIG FILE */

var Config = {
	
	databaseDirectory : __dirname + "/data/", //chmod this path 777
	databaseSubmissions : "submissions",
	databaseChanges : "changes",

	baseUrl : '/', // with trailing /
	servePublicDir : true,
	hostname : false, // 127.0.0.1 = private, false = public
	port : '8081'

};

module.exports = Config;