var assert = require('assert');
var fs = require('fs');
var _ = require('underscore');

var Utils = r_require('utils/utils');

var BASE_URL = "http://localhost:"+Config.port+Config.baseUrl
var TEST_FILES = ['tests/files/img1.jpg','tests/files/img2.png']
var DST_PATH = 'tests/files/dst.jpg'

describe('File upload', function() {

	beforeEach(function(done) {
		r_require('database/database').connect(done);
  	});

  	afterEach(function() {
        r_require('database/database').disconnect();
    });

    it('Utils.moveFile should move a file', function(done) {
    	Utils.moveFile(TEST_FILES[0],DST_PATH, (err) => {
    		if (err)
    			throw err;

    		done();
    	});
    });

	it('should POST a file on api/file/attach/:submissionId', function(done) {

		var request = require('supertest');

		data = {
			text: "unittest_" + require('node-uuid').v4()
		}

		//create submission
		request(BASE_URL).post('api/submissions').send(data).end(function(err, res) {
			if (err)
    			throw err;
			submissionId = res.body._id;

			//attach file
			request(BASE_URL).post('api/file/attach/'+submissionId).attach('file', TEST_FILES[0]).end(function(err, res) {
				console.log(res.body);
				done();
			});

			
        });

	});

});