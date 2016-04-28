var fs = require('fs');
var exec = require('child_process').exec;
var uuid = require('node-uuid');
var _ = require('underscore')

var Database = r_require('/models/database');
var utils = r_require('/utils/utils');

var Submissions = {

	insert : function(data,callback) {
		var db = new Database();

		//add uuid
		if (!Array.isArray(data))
			data = [ data ]
		data = _.map(data, function(item) {
			item.uuid = uuid.v1()
			return item
		});

		db.submissions.insert(data,callback)
	},

	get : function(id,callback) {

		var db = new Database();
		db.submissions.findOne({ _id : id }, callback);
	},

	list : function(options,callback) {

		var db = new Database();
		db.submissions.find({}, function(err, cursor) {
			
			if (err) {
				callback(err);
				return;
			}

			//apply options
			if (options.sort)
				cursor = cursor.sort(options.sort);
			if (options.skip)
				cursor = cursor.skip(options.skip);
			if (options.limit)
				cursor = cursor.limit(options.limit);

			//send data and count
			cursor.toArray(function(err,docs) {
				callback(err,docs,0);
			});
		});
	},

	count : function(callback) {
		var db = new Database();
		db.submissions.find({}).count(callback);
	},

	remove : function(id,callback) {
		var db = new Database();
		db.submissions.remove({_id: id},callback);
	},

	drop: function(callback) {
		// delete database file
		var filepath = Config.databaseDirectory + Config.databaseSubmissions;
		try {
  			stats = fs.statSync(filepath);
  			if (stats.isFile())
				fs.unlinkSync(filepath);
  		} catch (e) {
  			// do nothing
  		}
  		callback();
	}
}

module.exports = Submissions;