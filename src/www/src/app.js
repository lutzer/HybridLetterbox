/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-04 11:41:36
*/

import $ from 'jquery';
import Backbone from 'backbone';
import Marionette from 'marionette';
import Controller from 'controller';

var App = new Backbone.Marionette.Application();

export default { 

	initialize: function() {
	
		App.addInitializer( function(options){
			  Backbone.history.start();
			  
			  // support cross origin sharing
			  $.support.cors=true;
			  
			  Marionette.Behaviors.behaviorsLookup = function() {
			      return window.Behaviors;
			  }
			  
		});
		
		// define app routes
		App.Router = new Marionette.AppRouter({
			controller: new Controller(App),
			appRoutes: {
				'scanning' : 'showScanningDialog',
				'*actions': 'showSubmissionList'
			}
		});
		App.start();
	} 
};
