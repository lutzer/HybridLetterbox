
var assert = require('assert');
var _ = require('underscore')

var submissions = r_require('models/submissions')

var SOCKET_SERVER_URL = "http://localhost:"+Config.port
var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl
var MODEL_NUMBER = 10
var MODEL_ID = 2

describe('Socket Tests', function(){

	var randomNumber = Math.floor(Math.random() * 1000);

  	beforeEach(function(done) {

  		// delete database file before each test call
  		submissions.drop(function() {

  			// insert some models
			var size = MODEL_NUMBER
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

  	it("should connect to socket server", function(done) {

		var socketIoClient = require('socket.io-client')

  		socket = socketIoClient.connect(SOCKET_SERVER_URL)
  		socket.on('connect', function () { 
  			done();
  		});
  	});

  	it("should receive submission:new message", function(done) {

		var socketIoClient = require('socket.io-client')
		var request = require('supertest');

  		socket = socketIoClient.connect(SOCKET_SERVER_URL)
  		socket.on('submission:new', function (data) {
  			assert.equal(randomNumber, data.model.message)
  			done();
  		});

		// post message
		request(BASE_URL).post('api/submissions').send({ message: randomNumber }).end(function(err, res) {
			if (err) {
				assert(false)
				done();
				throw err;
			}
        });
  	});

  	it("should receive submission:removed message", function(done) {

		var socketIoClient = require('socket.io-client')
		var request = require('supertest');

  		socket = socketIoClient.connect(SOCKET_SERVER_URL)
  		socket.on('submission:removed', function (data) {
  			assert.equal(data.id, MODEL_ID)
  			done();
  		});

  		// delete submission
		request(BASE_URL).delete('api/submissions/'+MODEL_ID).end(function(err, res) {
			if (err) {
				assert(False)
				done();
				throw err;
			}
		});
  	});

  	it("should receive feedback:scanning message", function(done) {

  		var socketIoClient = require('socket.io-client')
		var request = require('supertest');

		var PROGRESS_VALUE = Math.floor(Math.random() * 100)

  		socket = socketIoClient.connect(SOCKET_SERVER_URL)
  		socket.on('feedback:scanning', function (data) {
  			assert.equal(data.progress, PROGRESS_VALUE)
  			done();
  		});

  		// send 10% progress on scanning
		request(BASE_URL).get('api/feedback/scanning/'+PROGRESS_VALUE).end(function(err, res) {
			if (err) {
				assert(False)
				done();
				throw err;
			}
		});

  	});

})