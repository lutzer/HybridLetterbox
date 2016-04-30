
var assert = require('assert');
var fs = require('fs')
var _ = require('underscore')

var submissions = r_require('models/submissions')


describe('Database Test', function(){

	// sets thest timeout to 500 ms
  	this.timeout(500);

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

		randomNumber = uuid.v4()

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

	it("should reflect inserts in the changes db", function(done) {

		var uuid = require('node-uuid');
		var Database = r_require('models/database.js');

		submissions.insert({ data: "test"}, function(err,docs) {

			var objectId = docs[0]._id;

			var db = new Database();
			db.changes.findOne({ _id : objectId}, function(err,doc) {
				assert.equal(objectId,doc._id);
				assert.equal('insert',doc.action);
				done();
			});
		});
	});

	it("should reflect removes in the changes db", function(done) {

		var uuid = require('node-uuid');
		var Database = r_require('models/database.js');

		submissions.insert({ data: "test"}, function(err,docs) {

			var objectId = docs[0]._id;

			submissions.remove(objectId, function(err) {
				var db = new Database();
				db.changes.findOne({ _id: objectId}, function(err,doc) {
					assert.equal(objectId,doc._id);
					//assert.equal('remove',doc.action);
					done();
				});
			})

			
		});
	});
})