var fs = require('fs');
var _ = require('underscore');

module.exports = {

	//handle errors in express routers
	handleError: function(err,res) {
		if(err) {
			if (_.has(err,'message'))
				print(err.message,'ERROR');
			else
	        	print(err,'ERROR');

	        //if res defined, also give server answer
	        if (res) {
	        	res.setHeader('Content-Type','application/json');
	        	res.status(500).send({ error: err.message });
	        }

	        return true;
	    }
	    return false;
	}
}