
var assert = require('assert');
var fs = require('fs')
var _ = require('underscore')

var Utils = r_require('utils/utils');

var Submission = r_require('models/submission')

describe('Database Test', function(){

	// sets thest timeout to 500 ms
  	this.timeout(500);

  	beforeEach(function(done) {
  		// delete database file before each test call
  		Submission.removeAll(done);
  	});

	it('should create a database file and add one submission', function(done){

		var submission = new Submission({
			author : { 
				name : "letterbox_test",
				id : "box1"
			},
			category : {
				id: 0,
				text: "Test Category"
			},
			message : 'Test Nachricht',
			files: [ { name: "test.jpg", path: "data/images", filetype: "image" } ]
		})

		submission.save(function(err, model) {
			Utils.handleError(err);
			done();
		});
	})

	it('should add a submission and return it', function(done){

		message = require('node-uuid').v4()

		var submission = new Submission({
			message: message
		});

		submission.save(function(err, model) {
			Utils.handleError(err);
			objectId = model._id;

			// check if model exists
			Submission.find({ _id: objectId} , function(err, models) {
	        	assert.equal(message,models[0].message)
	        	done();
			});

		});
	})

	it('should match the correct submission count', function(done) {

		// insert some models
		
		var size = Math.floor(2 + Math.random() * 10)
		array = _.map(_.range(size), function(i) {
			return {
				message: 'model'+i,
			}
		});

		Submission.create(array, function(err,models) {
			Submission.count({}, function(err, count) {
				assert.equal(count,size) // check correct size
				done();
			});
		});
	})

	it('should be able to remove an item', function(done) {

		var size = Math.floor(2 + Math.random() * 10)
		array = _.map(_.range(size), function(i) {
			return {
				message: 'model'+i,
			}
		});

		Submission.create(array, function(err,models) {
			Submission.remove({ _id: models[0]._id} , function(err) {
				Submission.count({}, function(err,count) {
					assert.equal(count,size-1) // check if one item was removed
					done();
				});
			});
		});
	})

	it('should list all models', function(done) {

		var size = Math.floor(2 + Math.random() * 10)
		array = _.map(_.range(size), function(i) {
			return {
				message: 'model'+i,
			}
		});

		Submission.create(array, function(err) {
			Submission.find({}, function(err,models) {
				assert.equal(models.length,size)
				done();
			})
			
		});
	})

	it.skip("should reflect inserts in the changes db", function(done) {

		/*var uuid = require('node-uuid');

		submissions.insert({ data: "test"}, function(err,docs) {

			var objectId = docs[0]._id;

			
		});*/
	});

	it.skip("should reflect removes in the changes db", function(done) {

		/*var uuid = require('node-uuid');

		submissions.insert({ data: "test"}, function(err,docs) {

			var objectId = docs[0]._id;

			submissions.remove(objectId, function(err) {
				
			})

			
		});*/
	});
})