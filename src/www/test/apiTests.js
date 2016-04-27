
var assert = require('assert');
var fs = require('fs')
var _ = require('underscore')

var submissions = r_require('models/submissions')
var config = r_require('/config.js')

var BASE_URL = "http://localhost:"+config.port+config.baseUrl
var MODEL_ID = 2

describe('API Routes', function(){

	var randomNumber = Math.floor(Math.random() * 1000);

	// change to test database
  	var config = r_require('config.js')
  	config.databaseSubmissions = "submissions_test.db"

  	beforeEach(function(done) {

  		// delete database file before each test call
  		submissions.drop(function() {

  			// insert some models
			var size = 10
			array = _.map(_.range(size), function(i) {
				return {
					message: randomNumber,
					number: i
				}
			});

			submissions.insert(array, function(err,docs) {
				done();
			});
  		});
  		
  	});

	it('should POST on api/submissions', function(done){

		var request = require('supertest');

		data = {
			message: "unittest"
		}
		request(BASE_URL).post('api/submissions').send(data).end(function(err, res) {
			if (err) {
				assert(false)
				done();
				throw err;
			}
			assert.equal(res.body.message, data.message);
			done()
        });
	})

	it('should GET on api/submissions', function(done){

		var request = require('supertest');

		request(BASE_URL).get('api/submissions').expect(200).end(function(err, res) {
			if (err) {
				assert(false)
				done();
				throw err;
			}
			assert.equal(res.body[0].message,randomNumber)
			done();
        });
	})

	it('should GET on api/submissions/'+MODEL_ID, function(done){

		var request = require('supertest');

		request(BASE_URL).get('api/submissions/'+MODEL_ID).expect(200).end(function(err, res) {
			if (err) {
				assert(false)
				done();
				throw err;
			}
			assert.equal(res.body._id,2)
			done();
        });
	})

	it('should DELETE on api/submissions/'+MODEL_ID, function(done){

		var request = require('supertest');

		request(BASE_URL).delete('api/submissions/'+MODEL_ID).end(function(err, res) {
			if (err) {
				assert(false)
				done();
				throw err;
			}
			
			//check if model is really deleted
			request(BASE_URL).get('api/submissions/'+MODEL_ID).expect(200).end(function(err, res) {
				if (err) {
					assert(false)
					done();
					throw err;
				}
				assert(_.isEmpty(res.body));
				done()
	        });
	    });
	});

	

})