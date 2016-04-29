/* 
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-01-25 11:08:47
* @Last Modified by:   lutzer
* @Last Modified time: 2016-04-28 11:12:37
*/

/* use absolute paths for require */
global.r_require = function(name) {
    return require(__dirname + name);
}

/* register config as global var */
global.Config = r_require('/config.js');

/* alias for printing */
global.print = function(string) {
	console.log(string);
}

/* if startet as test server, change to test database */
if (process.argv[2] == 'test') { 
	Config.databaseDirectory = __dirname + "/tests/data/";
	Config.port = '8881'
	//print = function() {}; //turn of printing
}

/*Define dependencies.*/

var express = require('express');
var app = express();
var http = require('http').Server(app);

/* Load Sockets */

var sockets = r_require('/sockets')(http);

/* Load Router */

var router = r_require('/router')(app);

/* Error Handling */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

/* Run the server */

http.listen(Config.port,Config.hostname,function(){
    print("Node Server listening on "+Config.hostname+":"+Config.port);
});