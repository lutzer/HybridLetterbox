var fs = require('fs');

module.exports = {

	handleError: function(err,res) {
		if(err) {
	        print('error occured: ' + err);

	        //if res defined, also give server answer
	        if (res)
	        	res.status(500).send(err);

	        throw(err);
	        
	        return true;
	    }
	    return false;
	},

	deleteFile: function(filepath) {
		try {
			stats = fs.statSync(filepath);
			if (stats.isFile())
			fs.unlinkSync(filepath);
		} catch (e) {
			// do nothing
		}
	}
}