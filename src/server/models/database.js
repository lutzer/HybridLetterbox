var Tingodb = require('tingodb')();
var fs = require('fs');

var config = r_require('/config');

var Database = function() {
	//saves the data
	var db = new Tingodb.Db(config.databaseDirectory, {});
	this.submissions = db.collection(config.databaseSubmissions);
}

Database.prototype.submissions = function() {
	return this.submissions;
};

module.exports = Database;