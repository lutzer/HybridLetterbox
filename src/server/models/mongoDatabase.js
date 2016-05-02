var mongojs = require('mongojs')
var uuid = require('node-uuid');
var _ = require('underscore')

var Utils = r_require('/utils/utils.js')

var url = 'mongodb://localhost:27017/letterbox';

var Database = function() {
	var self = this;

	//connect to mongodb
	var db = mongojs(url,[Config.databaseSubmissions, Config.databaseChanges]);
		
	self.databases = {
		submissions : db.collection(Config.databaseSubmissions), //saves the submissions
		changes : db.collection(Config.databaseChanges) //saves changes done to the databases
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

			self.databases.submissions.insert(data,callback);
		},

		findOne: function(query,callback) {
			self.databases.submissions.findOne(query,callback);
		},

		find: function(query,callback) {
			self.databases.submissions.find(query,callback);
		},

		removeOne: function(id,callback) {
			self.databases.submissions.remove({ _id : id},callback);
		},

		length: function(callback) {
			self.databases.submissions.find({}).count(callback);
		}
	};

	this.changes = {

		add : function(docs,database,action,callback) {

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
		}
	};

	this.drop = function(callback) {
		self.databases.submissions.drop(function() {
			self.databases.changes.drop(callback);
		})
		//db.dropDatabase(callback);
		//callback();
	}
}


Database.prototype.sync = function(server_address) {
	//TODO: write function that syncs data to/from main server
};


module.exports = Database;