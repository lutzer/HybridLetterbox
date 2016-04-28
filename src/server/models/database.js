var Tingodb = require('tingodb')();
var fs = require('fs');

var Database = function() {
	//saves the data
	var db = new Tingodb.Db(Config.databaseDirectory, {});
	this.submissions = db.collection(Config.databaseSubmissions);
}

Database.prototype.submissions = function() {
	return this.submissions;
};

module.exports = Database;