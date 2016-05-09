var assert = require('assert');
var fs = require('fs');
var _ = require('underscore');
var async = require('async')

var Submission = r_require('models/submission');
var Comment = r_require('models/comment')

var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl;
var MODEL_ID = null;

describe('API Routes /comments/', function(){

	var addComment = function(data,callback) {
		var request = require('supertest');

		//add comment
		request(BASE_URL).post('api/comments/').send(data).end(callback);
	}

	beforeEach(function(done) {

  		r_require('database/database').connect((err) => {
			
			// Add some Models
			var size = Math.floor(5 + Math.random() * 10)
			array = _.map(_.range(size), function(i) {
				return {
					text: 'model'+i,
				}
			});
			Submission.create(array, function(err,models) {
				MODEL_ID = models[0]._id;
				done();
			});
  		});
  	});

  	afterEach(function(done) {
  		async.parallel([
			(callback) => { Submission.removeAll(callback) },
			(callback) => { Comment.removeAll(callback) },
		],() => {
        	r_require('database/database').disconnect();
        	done();
        }); 
    });

  	it('should POST on api/comments/', function(done){

		var request = require('supertest');

		data = {
			text: "unittest_" + require('node-uuid').v4(),
			submission: MODEL_ID
		}

		request(BASE_URL).post('api/comments/').send(data).end(function(err, res) {
			if (err)
    			throw err;
			assert(res.body.comments.length > 0);
			done()
        });
	});


  	it('should GET on api/comments/:id', function(done) {

  		var request = require('supertest');

  		comment_data = {
			text: "unittest_" + require('node-uuid').v4(),
			submission: MODEL_ID
		}

		//add comment
		request(BASE_URL).post('api/comments/').send(comment_data).end(function(err, res) {
			if (err)
    			throw err;
			
			request(BASE_URL).get('api/comments/'+res.body.comments[0]).end(function(err, res) {
				assert.equal(res.body.text, comment_data.text);
				done();
			});
        });
  	});

  	it('should NOT be able to DELETE on api/comments/:id  without auth', function(done) {

  		var request = require('supertest');

  		comment_data = {
			text: "unittest_" + require('node-uuid').v4(),
			submission: MODEL_ID
		}

		//add comment
		request(BASE_URL).post('api/comments/').send(comment_data).expect(200).end(function(err, res) {
			if (err)
    			throw err;
			
			// delete comment
			request(BASE_URL).delete('api/comments/'+res.body.comments[0]).expect(200).end(function(err, res) {
				assert.notEqual(err,null);
				done();
			});
        });
  	});

  	it('should DELETE on api/comments/:id with auth', function(done) {

  		var request = require('supertest');

  		comment_data = {
			text: "unittest_" + require('node-uuid').v4(),
			submission: MODEL_ID
		}

		//add comment
		request(BASE_URL).post('api/comments/').send(comment_data).expect(200).end(function(err, res) {
			if (err)
    			throw err;
			
			// delete comment
			request(BASE_URL).delete('api/comments/'+res.body.comments[0]).auth(Config.authName, Config.authPassword).expect(200).end(function(err, res) {
				if (err)
    				throw err;

				assert.equal(res.body.removed,1);
				done();
			});
        });
  	});

  	it('should GET on api/comments', function(done){

		var request = require('supertest');

		async.series([
			(callback) => { addComment({ text: 'test1', submission: MODEL_ID },callback) },
			(callback) => { addComment({ text: 'test2', submission: MODEL_ID },callback) },
			(callback) => { addComment({ text: 'test3', submission: MODEL_ID },callback) }
		],() => {
			request(BASE_URL).get('api/comments').expect(200).end(function(err, res) {
				if (err)
    				throw err;

				assert.equal(res.body.length,3)
				done();
	        });
		});
	});

});