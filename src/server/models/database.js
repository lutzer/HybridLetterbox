var Tingodb = require('tingodb')();
var uuid = require('node-uuid');
var _ = require('underscore')

var Utils = r_require('/utils/utils.js')

var Database = function() {
	var self = this;

	//initialise Databases
	var db = new Tingodb.Db(Config.databaseDirectory, {});

	this.databases = {
		submissions : db.collection(Config.databaseSubmissions), //saves the submissions
		changes : db.collection(Config.databaseChanges) //saves changes done to the databases
	};

	this.submissions = {
		insert: function(data,callback) {

			//add uuid
			if (!Array.isArray(data))
				data = [ data ]
			data = _.map(data, function(item) {
				item.uuid = uuid.v4()
				return item
			});

			self.databases.submissions.insert(data,function(err, docs) {
				if (err)
					callback(err)
				else
					self.addChange(docs, 'submissions', 'insert', function(err) {
						callback(err,docs);
					});
					
			});
		},

		findOne: function(query,callback) {
			self.databases.submissions.findOne(query,callback)
		},

		find: function(query,callback) {
			self.databases.submissions.find(query,callback)
		},

		remove: function(query,callback) {
			self.databases.submissions.remove(query, function(err, docs) {
				if (!err)
					self.addChange(docs, 'submissions', 'remove', Utils.handleError);
				callback(err,docs);
			});
		},

		length: function(callback) {
			self.databases.submissions.find({}).count(callback);
		}
	};

	this.changes = this.databases.changes
}

Database.prototype.addChange = function(docs,database,action,callback) {

	data = _.map(docs, function(doc) {
		return {
			uuid : doc.uuid,
			database: database,
			action: action
		}
	});

	this.databases.changes.insert(data, function(err) {
		callback(err)
	});
};

Database.prototype.sync = function(server_address) {
	//TODO: write function that syncs data to/from main server
};

Database.prototype.drop = function(callback) {
	// delete database files
	Utils.deleteFile(Config.databaseDirectory + Config.databaseSubmissions)
	Utils.deleteFile(Config.databaseDirectory + Config.databaseChanges)
	callback();
}


module.exports = Database;