
var assert = require('assert');
var fs = require('fs');
var _ = require('underscore');
var async = require('async')

var Submission = r_require('models/submission');
var Comment = r_require('models/comment');

var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl;
var MODEL_ID = null;

describe('API Routes /submissions/', function(){

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

	it('should POST on api/submissions', function(done){

		var request = require('supertest');

		data = {
			text: "unittest_" + require('node-uuid').v4()
		}

		request(BASE_URL).post('api/submissions').send(data).end(function(err, res) {
			if (err)
    			throw err;
			assert.equal(res.body.text, data.text);
			done()
        });
	})

	it('should GET on api/submissions', function(done){

		var request = require('supertest');

		request(BASE_URL).get('api/submissions').expect(200).end(function(err, res) {
			if (err)
    			throw err;
			done();
        });
	})

	it('should GET on api/submissions/'+MODEL_ID, function(done){

		var request = require('supertest');

		request(BASE_URL).get('api/submissions/'+MODEL_ID).expect(200).end(function(err, res) {
			if (err)
    			throw err;
			assert.equal(res.body._id,MODEL_ID)
			done();
        });
	})

	it('should not DELETE on api/submissions/:id without auth', function(done){

		var request = require('supertest');

		request(BASE_URL).delete('api/submissions/'+MODEL_ID).expect(401).end(function(err, res) {
			if (err) throw err;
			done();
	    });
	});

	it('should DELETE on api/submissions/:id with auth', function(done){

		var request = require('supertest');

		request(BASE_URL).delete('api/submissions/'+MODEL_ID).auth(Config.authName, Config.authPassword).expect(200).end(function(err, res) {
			if (err)
    			throw err;
			assert.equal(res.body.removed, 1);
			
			//check if model is really deleted
			request(BASE_URL).get('api/submissions/'+MODEL_ID).expect(200).end(function(err, res) {
				if (err)
    				throw err;
				assert(_.isEmpty(res.body));
				done();
	        });
	    });
	});

	it('should PUT on api/submissions/:id with auth', function(done){

		var request = require('supertest');

		var data1 = {
			text: "text1",
			tags: ['tag1','tag2']
		}

		var data2 = {
			text: "text2",
			tags: ['tag1','tag2','tag3']
		}

		//insert submission
		request(BASE_URL).post('api/submissions').send(data1).end(function(err, res) {
			if (err)
    			throw err;

    		submissionId = res.body._id;

			assert.equal(res.body.tags.length, data1.tags.length);
			assert.equal(res.body.text, data1.text);

			//update submission
			request(BASE_URL).put('api/submissions/'+submissionId).auth(Config.authName, Config.authPassword).send(data2).expect(200).end(function(err, res) {
				if (err)
	    			throw err;
	    		
				assert.equal(res.body.tags.length, data2.tags.length);
				assert.equal(res.body.text, data2.text);
				done()
	        });
        });
	});

	it('should not PUT on api/submissions/:id without auth', function(done){

		var request = require('supertest');

		var data1 = {
			text: "text1",
			tags: ['tag1','tag2']
		}

		var data2 = {
			text: "text2",
			tags: ['tag1','tag2','tag3']
		}

		//insert submission
		request(BASE_URL).post('api/submissions').send(data1).end(function(err, res) {
			if (err)
    			throw err;

    		submissionId = res.body._id;

			//update submission, expect 401
			request(BASE_URL).put('api/submissions/'+submissionId).send(data2).expect(401).end(function(err, res) {
				if (err) throw err;
				done();
	        });
        });
	});

	it('should escape special characters on api/submissions', function(done){

		var request = require('supertest');

		data = {
			author : "<$%0921ß30></br>",
			device : "letterbox_1",
			tags : [ 'tag1<br>', 'tag2'],
			text : 'Test Nachricht<p>',
			files: [ { name: "test&<br>.jpg", path: "data/images", filetype: "image" } ],
			location : [45.3989, 34.399]
		}

		request(BASE_URL).post('api/submissions').send(data).end(function(err, res) {
			if (err)
    			throw err;
    		assert.notEqual(res.body.author, data.author);
			assert.equal(res.body.device, data.device);
			assert.notEqual(res.body.tags[0], data.tags[0]);
			assert.equal(res.body.tags[1], data.tags[1]);
			assert.notEqual(res.body.text, data.text);
			assert.notEqual(res.body.files[0].name, data.files[0].name);
			done();
        });
		
	});
});

