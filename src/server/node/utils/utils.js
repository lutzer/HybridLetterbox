var fs = require('fs');
var _ = require('underscore');

module.exports = {

	//handle errors in express routers
	handleError: function(err,res) {
		if(err) {
	        print(err,'ERROR');

	        //if res defined, also give server answer
	        if (res)
	        	res.status(500).send(err);

	        return true;
	    }
	    return false;
	},

	//escape paths in mongoose pre save middleware
	escapePath: function(doc, path) {
        elements = doc.get(path);
        if (_.isArray(elements))
            doc.set(path, _.map(elements,_.escape))
        else    
            doc.set(path, _.escape(elements));
    }
}