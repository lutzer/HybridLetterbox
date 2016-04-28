
var assert = require('assert');
var fs = require('fs')
var _ = require('underscore')

var submissions = r_require('models/submissions')


describe('Database Test', function(){

  	beforeEach(function(done) {
  		// delete database file before each test call
  		submissions.drop(done);
  	});

	it('should create a database file and add one submission', function(done){

		data = {
			category : 0,
			image: "test.jpg"
		}

		submissions.insert(data,function(err, docs) {
			assert(err == null);
			done();
		});
	})

	it('should add a submission and return it', function(done){

		var uuid = require('node-uuid');

		randomNumber = uuid.v1()

		data = {
			category : 2,
			image : "test.jpg",
			rand: randomNumber
		}

		submissions.insert(data,function(err, docs) {

			objectId = docs[0]._id;
			submissions.get(objectId, function(err, doc) {
	        	assert.equal(randomNumber,doc.rand)
	        	done();
			})

		});
	})

	it('should match the correct submission count', function(done) {

		// insert some models
		var size = Math.floor(2 + Math.random() * 10)
		array = _.map(_.range(size), function(i) {
			return {
				message: 'something',
				number: i
			}
		});

		submissions.insert(array, function(err,docs) {
			submissions.count(function(err,n) {
				assert.equal(n,size) // check correct size
				done();
			});
		});
	})

	it('should be able to remove an item', function(done) {

		// insert some models
		var size = Math.floor(2 + Math.random() * 10)
		array = _.map(_.range(size), function(i) {
			return {
				message: 'something',
				number: i
			}
		});

		submissions.insert(array, function(err,docs) {

			submissions.remove(docs[0]._id, function(err) {
				submissions.count(function(err,n) {
					assert.equal(n,size-1) // check if one item was removed
					done();
				});
			})
			
		});
	})

	it('should list all models', function(done) {

		// insert some models
		var size = Math.floor(2 + Math.random() * 10)
		array = _.map(_.range(size), function(i) {
			return {
				message: 'something',
				number: i
			}
		});

		submissions.insert(array, function(err,docs) {
			submissions.list({}, function(err,docs) {
				assert.equal(docs.length,size)
				done();
			})
			
		});
	})

})