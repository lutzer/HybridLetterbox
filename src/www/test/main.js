/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-04-27 11:49:42
* @Last Modified by:   lutzer
* @Last Modified time: 2016-04-27 18:12:24
*/

/* use absolute paths for require */
global.r_require = function(name) {
    return require(__dirname + "/../" + name);
}


// change to test database
var config = r_require('config.js')
config.databaseSubmissions = "submissions_test.db"

r_require("/test/modelTests.js")
r_require("/test/apiTests.js")
r_require("/test/socketTests.js")