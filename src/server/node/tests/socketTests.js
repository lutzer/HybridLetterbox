
var assert = require('assert');
var _ = require('underscore');
var async = require('async');

var Submission = r_require('models/submission');
var Comment = r_require('models/comment');

var SOCKET_SERVER_URL = "http://localhost:"+Config.port
var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl
var MODEL_NUMBER = 10

describe('Socket Tests', function(){

    // sets thest timeout to 500 ms
    this.timeout(500);

    var randomNumber = Math.floor(Math.random() * 1000);

    before(function(done) {

        r_require('database/database').connect((err) => {
            if (err) throw err;

            // Add some Models
            var size = Math.floor(5 + Math.random() * 10)
            array = _.map(_.range(size), function(i) {
                return {
                  text: 'model'+i,
                }
            });
            Submission.create(array, function(err,models) {
                done();
            });
        });
    });

    after(function(done) {
        async.parallel([
            (callback) => { Submission.removeAll(callback) },
            (callback) => { Comment.removeAll(callback) },
        ],() => {
            r_require('database/database').disconnect();
            done();
        }); 
    });

    it("should connect to socket server", function(done) {

        var socketIoClient = require('socket.io-client')

        socket = socketIoClient.connect(SOCKET_SERVER_URL)
        socket.on('connect', function () { 
          socket.disconnect();
          done();
        });
    });

    it("should receive submission:new message", function(done) {

        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        socket = socketIoClient.connect(SOCKET_SERVER_URL)
        socket.on('submission:new', function (data) {
            assert.equal(randomNumber, data.model.text)
            socket.disconnect();
            done();
        });

        // post message
        request(BASE_URL).post('api/submissions').send({ text: randomNumber }).end(function(err, res) {
        	if (err) throw err;
        });
    });

    it("should receive submission:removed message", function(done) {

        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        request(BASE_URL).get('api/submissions/').end(function(err, res) {
            if (err) throw err;

            submissionId = res.body[0]._id;

            socket = socketIoClient.connect(SOCKET_SERVER_URL)
            socket.on('submission:removed', function (data) {
               assert.equal(data.id, submissionId)
               socket.disconnect();
               done();
            });

            // delete submission
            request(BASE_URL).delete('api/submissions/'+submissionId).auth(Config.authName, Config.authPassword).end(function(err, res) {
               if (err) throw err;
            });
        });

        
    });

    it.skip("should receive submission:changed message", function(done) {
        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        request(BASE_URL).get('api/submissions/').end(function(err, res) {
            if (err) throw err;

            submissionId = res.body[0]._id;

            socket = socketIoClient.connect(SOCKET_SERVER_URL)
            socket.on('submission:changed', function (data) {
                console.log(data);
                assert.equal(data.model._id, submissionId)
                done();
                socket.disconnect();
            });

            // add comment
            request(BASE_URL).post('api/comment/'+submissionId).send({ text: 'sockettest' }).end(function(err, res) {
               if (err) throw err;
            });
        });
    });

    it.skip("should receive submission:new message in namespace /tablet", function(done) {

        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        socket = socketIoClient.connect(SOCKET_SERVER_URL+"/tablet")
        socket.on('submission:new', function (data) {
            assert.equal(randomNumber, data.model.message)
            socket.disconnect();
            done();
        });

        // post message
        request(BASE_URL).post('api/submissions').send({ message: randomNumber }).end(function(err, res) {
           if (err) throw err;
        });
    });

    it.skip("should receive feedback:scanning message in tablet namespace", function(done) {

        var socketIoClient = require('socket.io-client')
        var request = require('supertest');

        var PROGRESS_VALUE = Math.floor(Math.random() * 100)

        socket = socketIoClient.connect(SOCKET_SERVER_URL);

        socket.on('feedback:scanning', function (data) {
           assert.equal(data.progress, PROGRESS_VALUE);
           socket.disconnect();
           done();
        });

		// send message to server
		socket.emit('feedback:scanning',PROGRESS_VALUE);
    });

    it.skip("should NOT receive feedback:scanning message in main namespace", function(done) {

    var socketIoClient = require('socket.io-client')
    var request = require('supertest');

    var PROGRESS_VALUE = Math.floor(Math.random() * 100)

    socket = socketIoClient.connect(SOCKET_SERVER_URL);

    socket.on('feedback:scanning', function (data) {
        assert(false); // fails when receiving message
        socket.disconnect();
        done();
    });

      // send message to server
      socket.emit('feedback:scanning',PROGRESS_VALUE);

      //succeed after timeout
      setTimeout(done, 250);
      
    });

})