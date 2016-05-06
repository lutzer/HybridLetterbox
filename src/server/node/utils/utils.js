var fs = require('fs');

module.exports = {

	handleError: function(err,res) {
		if(err) {
	        print('ERROR: ' + err);

	        //if res defined, also give server answer
	        if (res)
	        	res.status(500).send(err);

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
	},

	moveFile: function(srcPath,dstPath,callback) {
		callback(new Error('could not move file'));
	}
}