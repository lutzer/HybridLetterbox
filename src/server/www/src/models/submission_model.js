'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-10 17:15:27
*/

import Backbone from 'backbone';
import Config from 'config';

class SubmissionModel extends Backbone.Model {

	get urlRoot() { return Config['web_service_url']+"submissions" }

	get idAttribute() { return '_id' }

	get defaults() { 
		return {
	    	files: [],
	    	comments: [],
	    	text: '',
	    	tags: [],
	    	author: '',
	    	createdAt: 0
		}
	}
}

export default SubmissionModel