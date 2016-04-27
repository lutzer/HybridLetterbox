define([
	'jquery',
	'underscore',
	'values/constants',
	'views/BaseView',
	'models/SubmissionCollection',
	'views/SubmissionBlogItemView',
	'text!templates/projectionViewTemplate.html'
], function($, _, CONSTANTS, BaseView, SubmissionCollection, SubmissionBlogItemView, projectionViewTemplate){
	
	var ProjectionView = BaseView.extend({
		
		initialize: function() {
			var self = this;
			
			this.timer = null;
			this.currentModel = 0;
			this.submissionView = null;
			
			this.collection = new SubmissionCollection();
			this.collection.stream({intervall : 1000});
			
			this.listenTo(this.collection, 'add', function(model) {
				self.showSubmission(model);
			});
			this.listenTo(this.collection, 'change', function(model) {
				self.showSubmission(model);
			});
			
			BaseView.prototype.initialize.call(this);
		},
		
		render: function(){
			
			var compiledTemplate = _.template( projectionViewTemplate, {} );
			this.$el.html( compiledTemplate );
			
			return this;
		},
		
		renderSubview: function(model) {
			if (this.submissionView != null)
				this.submissionView.close();
			
			this.submissionView = new SubmissionBlogItemView({model: model})
			this.assign(this.submissionView,".submissionList");
		},
		
		showSubmission: function(model) {

			var self = this;
			
			this.renderSubview(model);
			
			// after timeout show the next submission
			clearTimeout(this.timer);
			this.timer = setTimeout(function() {
				self.currentModel = (self.currentModel + 1) % self.collection.length;
				self.showSubmission(self.collection.at(self.currentModel));
			},CONSTANTS.PROJECTION_INTERVALL_TIME);
		}
		
		
	});
	// Our module now returns our view
	return ProjectionView;
	
});