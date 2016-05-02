
var _ = require('underscore')
var mongoose = require('mongoose');
var uuid = require('node-uuid');

// Connect to database
mongoose.connect(Config.database);

// Define Model Schema
var submissionSchema = mongoose.Schema({

	_id: { type: String, default: uuid.v4 }, //use uuid

    message : { type: String, default: false },
    files : [{
    	name: String,
    	path: String,
    	filetype: String
    }],
    author: { type: {
    	name: String,
    	id: String
    }, default: false },
    category : { type: {
    	id : Number,
    	text : String
    }, default: false }

}, { timestamps: true });

// Remove All entries
submissionSchema.statics.removeAll = function(callback) {
	this.remove({}, callback);
};

module.exports = mongoose.model('Submission', submissionSchema, Config.submissionCollection);