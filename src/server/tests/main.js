/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-04-27 11:49:42
* @Last Modified by:   lutzer
* @Last Modified time: 2016-04-28 11:11:43
*/

/* use absolute paths for require */
global.r_require = function(name) {
    return require(__dirname + "/../" + name);
}

global.print = function(string) {
	console.log(string);
}

global.Config = r_require('/config.js');

// change to test database
Config.databaseDirectory = __dirname + "/data/"
Config.port = '8881'

r_require("/tests/databaseTests.js")
//r_require("/tests/apiTests.js")
//r_require("/tests/socketTests.js")