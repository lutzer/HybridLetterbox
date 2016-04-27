define([
	'jquery',
	'underscore',
	'views/BaseListView',
	'models/SubmissionCollection',
	'views/SubmissionEditItemView',
	'text!templates/adminViewTemplate.html'
], function($, _, BaseListView, SubmissionCollection, SubmissionEditItemView, adminViewTemplate){
	
	var BlogView = BaseListView.extend({
		
		initialize: function() {
			this.collection = new SubmissionCollection();
			this.collection.fetch();
			//this.collection.stream({intervall : 1000});
			
			BaseListView.prototype.initialize.call(this);
		},
		
		render: function(){
			
			var compiledTemplate = _.template( adminViewTemplate, {} );
			this.$el.html( compiledTemplate );
			return this;
		},
		
		addOne: function(model) {
			this.prepend(new SubmissionEditItemView({model: model}),".admin-SubmissionList");
		}
		
	});
	// Our module now returns our view
	return BlogView;
	
});