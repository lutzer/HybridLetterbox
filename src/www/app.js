/* 
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-01-25 11:08:47
* @Last Modified by:   lutzer
* @Last Modified time: 2016-04-27 16:26:29
*/

/* use absolute paths for require */
global.r_require = function(name) {
    return require(__dirname + name);
}

/*Define dependencies.*/

var express = require('express');
var app = express();
var http = require('http').Server(app);

var config = r_require('/config.js');

/* start Test server */
if (process.argv[2] == 'test') {
	config.databaseSubmissions = "submissions_test.db"
}

/* Load Sockets */

var sockets = r_require('/sockets')(http);

/* Load Router */

var router = r_require('/router')(app);

/* Error Handling */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

/* Run the server */

http.listen(config.port,config.hostname,function(){
    console.log("Node Server listening on "+config.hostname+":"+config.port);
});