var _ = require('underscore')
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Submission = r_require('/models/submission');

// Define Model Schema
var commentSchema = mongoose.Schema({

	_id: { type: String, default: uuid.v4 }, //use uuid
	submission: { type: String, ref: 'Submission' },

    text : { type: String, default: false },
    author: String

}, { timestamps: true });

// Remove All entries
commentSchema.statics.removeAll = function(callback) {
	this.remove({}, callback);
};

module.exports = mongoose.model('Comment', commentSchema, Config.commentCollection);