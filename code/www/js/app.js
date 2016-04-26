define([
	'jquery',
	'underscore',
	'backbone',
	'views/BlogView',
	'views/ProjectionView',
	'views/AdminView',
], function($, _, Backbone, BlogView, ProjectionView, AdminView){

	var AppRouter = Backbone.Router.extend({
		routes: {
			"blog": "showBlog",
			"projection": "showProjection",
			'admin' : "showAdmin",
			'' : "showBlog"
		},
	});
	
	// adds all views to #container and removes unused views
	var AppView = {
			showView: function(view) {
				if (this.currentView){
					this.currentView.close();
				}
				this.currentView = view;
				this.currentView.render();
				$("#container").append(this.currentView.el);
			}
	};

	var initialize = function(){
		
		//setup routes
		var app_router = new AppRouter;
		app_router.on('route:showBlog', function(id){
			AppView.showView(new BlogView());
	    });  
		app_router.on('route:showProjection', function(){
			AppView.showView(new ProjectionView());
		});
		
		app_router.on('route:showAdmin', function(id){
			AppView.showView(new AdminView());
		});
		
		Backbone.history.start();
	};

	return {
		initialize: initialize
	};
});