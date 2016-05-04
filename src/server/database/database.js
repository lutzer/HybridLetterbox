/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 12:55:03
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-04 16:40:28
*/


var mongoose = require('mongoose');
var Utils = r_require('/utils/utils');

module.exports = {

	connect : function() {
		if (mongoose.connection.readyState == 0) { //not yet connected
			mongoose.connect(Config.database, function(err) {
				Utils.handleError(err);
			});

		}
	}
}
// Connect to database
