var exec = require('child_process').exec;
var _ = require('underscore')

var Database = r_require('/models/mongoDatabase');
var utils = r_require('/utils/utils');

var Submissions = {

	insert : function(data,callback) {
		var db = new Database();
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
		db.submissions.length(callback);
	},

	remove : function(id,callback) {
		var db = new Database();
		db.submissions.removeOne(id,callback);
	},

	drop: function(callback) {
		var db = new Database();
		db.drop(callback);
	}
}

module.exports = Submissions;