define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){

	var CONSTANTS = {

	    // server settings
	    //SETTING_WEB_DATA_FOLDER : "data/submissions",
		SETTING_WEB_DATA_FOLDER : "data/submissions",
	    SETTING_WEB_SERVICE_URL: "api",
	    	
	    PROJECTION_INTERVALL_TIME: 5000,
	    
	    BLOG_SUBMISSIONS_PER_PAGE : 8

	};
	
	return CONSTANTS;
});