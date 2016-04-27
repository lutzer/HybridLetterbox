module.exports = {

	handleError: function(err,res) {
		if(err) {
	        console.log('error occured: ' + err);

	        //if res defined, also give server answer
	        if (res)
	        	res.status(500).send(err);

	        throw(err);
	        
	        return true;
	    }
	    return false;
	}
}