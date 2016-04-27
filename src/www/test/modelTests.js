
var assert = require('assert');
var submissions = r_require('models/submissions')

describe('Database creation ', function(){
  
  it('it should create a database file', function(){


  	data = {
		category : 0,
		image: "test.jpg"
  	}

	submissions.create(data,function(err, docs) {
		console.log(err)
		assert(err);
	});  	

    
  });

})