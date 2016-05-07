var fs = require('fs');

module.exports = {

	handleError: function(err,res) {
		if(err) {
	        print(err,'ERROR');

	        //if res defined, also give server answer
	        if (res)
	        	res.status(500).send(err);

	        return true;
	    }
	    return false;
	}
}