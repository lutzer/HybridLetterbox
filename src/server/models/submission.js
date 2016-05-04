var _ = require('underscore')
var mongoose = require('mongoose');
var uuid = require('node-uuid');

var Utils = r_require('/utils/utils');
r_require('/database/database').connect();

var Comment = r_require('/models/comment')

// Define Model Schema
var submissionSchema = mongoose.Schema({

	_id: { type: String, default: uuid.v4 }, //use uuid

    text : { type: String, default: false },
    author: String,
    device: String,
    tags : Array,
    files : [{
        name: String,
        path: String,
        url: String,
        filetype: String
    }],
    location : { type: [ Number ], default: [ 0 ] }, // [ longitude, latitude ]
    comments: [{ type: String, ref: 'Comment'}]

}, { timestamps: true });

submissionSchema.static.find = function(query,callback) {
    this.find(query).populate('comments').exec(callback);
};

submissionSchema.static.findOne = function(query,callback) {
    this.findOne(query).populate('comments').exec(callback);
};

// Remove All entries
submissionSchema.statics.removeAll = function(callback) {
	this.remove({}, callback);
};

submissionSchema.methods.addComment = function(comment,callback) {

    comment.submission_id = this._id;

    comment.save((err) => {
        if (err) {
            callback(err)
            return;
        }

        this.comments.push(comment);
        this.save(callback);
    })
}

submissionSchema.methods.removeComment = function(comment_id,callback) {
    var self = this;

    Comment.remove({ _id : comment_id}, function(err) {
        Utils.handleError(err);

        self.comments = _.reject(self.comments, function(comment) {
            return comment._id == comment_id;
        });

        //save model
        self.save(callback)
    });
}

module.exports = mongoose.model('Submission', submissionSchema, Config.submissionCollection);