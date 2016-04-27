define([
  'jquery',
  'underscore',
  'backbone',
  'values/constants'
], function($, _, Backbone, CONSTANTS){
	 
	var SubmissionModel = Backbone.Model.extend({    
	    
	    urlRoot : CONSTANTS.SETTING_WEB_SERVICE_URL+'/submissions/',
	    
	    defaults: {
	    	data_folder: CONSTANTS.SETTING_WEB_DATA_FOLDER,
	    	isNew : 0
	    },
	    
	    /*initialize: function() {
	    	console.log('init model');
	    }*/
	
	});
	
	return SubmissionModel;
	
});