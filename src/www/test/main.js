/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-04-27 11:49:42
* @Last Modified by:   lutzer
* @Last Modified time: 2016-04-27 12:04:06
*/

/* use absolute paths for require */
global.r_require = function(name) {
    return require(__dirname + "/../" + name);
}

r_require("/test/modelTests.js")