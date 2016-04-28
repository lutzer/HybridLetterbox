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

global.Config = r_require('/config.js');

// change to test database
Config.databaseDirectory = __dirname + "/data/"
console.log(Config.databaseDirectory)

r_require("/test/databaseTests.js")
r_require("/test/apiTests.js")
r_require("/test/socketTests.js")