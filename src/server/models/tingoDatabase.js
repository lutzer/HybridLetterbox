var Tingodb = require('tingodb')();
var uuid = require('node-uuid');
var _ = require('underscore')

var Utils = r_require('/utils/utils.js')

var Database = function() {
	var self = this;

	//initialise Databases
	var db = new Tingodb.Db(Config.databaseDirectory, {});

	this.databases = {
		submissions : db.collection(Config.databaseSubmissions+".db"), //saves the submissions
		changes : db.collection(Config.databaseChanges+".db") //saves changes done to the databases
	};

	this.submissions = {
		insert: function(data,callback) {

			//add uuid
			if (!Array.isArray(data))
				data = [ data ]
			data = _.map(data, function(item) {
				item._id = uuid.v4()
				return item
			});

			self.databases.submissions.insert(data,function(err, docs) {
				Utils.handleError(err);
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

		removeOne: function(id,callback) {
			self.databases.submissions.remove({ _id : id}, function(err, docs) {

				ids = [ { _id : id} ];

				Utils.handleError(err);
				self.addChange(ids, 'submissions', 'remove', function(err) {
					callback(err,ids);
				});
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
			_id : doc._id,
			database: database,
			action: action
		}
	});


	this.databases.changes.insert( data, function(err) {
		callback(err,docs);
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