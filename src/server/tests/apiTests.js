
var assert = require('assert');
var fs = require('fs');
var _ = require('underscore');

var Utils = r_require('utils/utils');
var Submission = r_require('models/submission');

var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl;
var MODEL_ID = null;

describe('API Routes', function(){

  	beforeEach(function(done) {

  		// delete database file before each test call
  		Submission.removeAll(function() {

	  		// Add some Models
	  		var size = Math.floor(5 + Math.random() * 10)
			array = _.map(_.range(size), function(i) {
				return {
					message: 'model'+i,
				}
			});
			Submission.create(array, function(err,models) {
				MODEL_ID = models[0]._id;
				done();
	  		});
		});
  		
  	});

	it('should POST on api/submissions', function(done){

		var request = require('supertest');

		data = {
			message: "unittest_" + require('node-uuid').v4()
		}

		request(BASE_URL).post('api/submissions').send(data).end(function(err, res) {
			Utils.handleError(err);
			assert.equal(res.body.message, data.message);
			done()
        });
	})

	it('should GET on api/submissions', function(done){

		var request = require('supertest');

		request(BASE_URL).get('api/submissions').expect(200).end(function(err, res) {
			Utils.handleError(err);
			done();
        });
	})

	it('should GET on api/submissions/'+MODEL_ID, function(done){

		var request = require('supertest');

		request(BASE_URL).get('api/submissions/'+MODEL_ID).expect(200).end(function(err, res) {
			Utils.handleError(err);
			assert.equal(res.body._id,MODEL_ID)
			done();
        });
	})

	it('should DELETE on api/submissions/'+MODEL_ID, function(done){

		var request = require('supertest');

		request(BASE_URL).delete('api/submissions/'+MODEL_ID).end(function(err, res) {
			Utils.handleError(err);
			assert.equal(res.body.removed, 1);
			
			//check if model is really deleted
			request(BASE_URL).get('api/submissions/'+MODEL_ID).expect(200).end(function(err, res) {
				Utils.handleError(err);
				assert(_.isEmpty(res.body));
				done();
	        });
	    });
	});

	

})