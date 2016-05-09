var _ = require('underscore')
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var fse = require('fs-extra');
var async = require('async');

var Comment = r_require('/models/comment');

// Define Model Schema
var submissionSchema = mongoose.Schema({

	_id: { type: String, default: uuid.v4 }, //use uuid

    text : { type: String, default: false },
    author: String,
    device: String,
    tags : [ String ],
    files : [{
        name: String,
        path: String,
        filetype: String
    }],
    location : { type: [ Number ], default: [ 0 ] }, // [ longitude, latitude ]
    comments: [{ type: String, ref: 'Comment'}]

}, { timestamps: true });

/*submissionSchema.static.find = function(query,callback) {
    this.find(query).exec(callback);
};

submissionSchema.static.findOne = function(query,callback) {
    this.findOne(query).exec(callback);
};*/

submissionSchema.pre('remove', function(next) {

    // also remove all the assigned comments
    Comment.remove({ submission: this._id }, (err) => {
        if (err)
            next(err);

         //remove file directory
        var dir = Config.fileDir + '/' + this._id + '/';
        fse.remove(dir, (err) => {
            next(err);
        });
    });
});

// Remove All entries
submissionSchema.statics.removeAll = function(callback) {
    this.remove({},callback);
};

submissionSchema.statics.remove = function(query,callback) {
	this.find(query, function(err,models) {
        if (err) {
            callback(err);
            return;
        }

        async.each(models, (model,done) => {
            model.remove(done);
        }, (err) => {
            callback(err,{ result: {n: models.length }});
        });
    });
};

submissionSchema.methods.addComment = function(comment,callback) {

    comment.submission = this._id;

    //save comment
    comment.save((err,comment) => {
        if (err) {
            callback(err)
            return;
        }

        //add ref to model
        this.comments.push(comment._id);
        this.save(callback);
    })
}

submissionSchema.methods.removeComment = function(comment_id,callback) {
    var self = this;

    // first remove comment from database
    Comment.remove({ _id : comment_id}, function(err) {
        if (err) {
            callback(err)
            return;
        }

        // remove comment ref from model
        self.comments = _.reject(self.comments, function(comment) {
            return comment == comment_id;
        });

        //save model
        self.save(callback)
    });
}

submissionSchema.methods.addFile = function(file,callback) {

    var self = this;
    var dir = Config.fileDir + this._id + '/'

    //create dir
    fse.ensureDir(dir, (err) => {
        if (err) {
            callback(err)
            return;
        }

        //move file
        fse.move(file.path,dir+file.originalFilename, (err) => {
            if (err) {
                callback(err)
                return;
            }

            //add to submission
            var newfile = {
                name: file.originalFilename,
                path: dir+file.originalFilename,
                filetype: file.type
            };
            self.files.push(newfile);

            //save submission
            self.save(callback);
        });
    });
}

module.exports = mongoose.model('Submission', submissionSchema, Config.submissionCollection);