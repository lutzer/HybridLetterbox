define([
	'jquery',
	'underscore',
	'views/BaseListItemView',
	'models/SubmissionModel',
	'text!templates/submissionBlogItemViewTemplate.html'
], function($, _, BaseListItemView, SubmissionModel, submissionBlogItemViewTemplate){
	
	var SubmissionBlogItemView = BaseListItemView.extend({
		
		tagName: 'li',
		
		render: function() {
			var compiledTemplate = _.template( submissionBlogItemViewTemplate, { submission : this.model.toJSON()} );
			this.$el.html( compiledTemplate );
			return this;
		},
		
		hide : function() {
			this.$el.hide();
		},
		
		slideDown: function() {
			this.$el.slideDown(2000);
			/*var self = this
			setTimeout( function() {
				self.$el.slideDown(2000);
			},0);*/
		},
		
		show: function() {
			this.$el.show();
		}
		
	});
	// Our module now returns our view
	return SubmissionBlogItemView;
	
});