define([
	'jquery',
	'underscore',
	'views/BaseListItemView',
	'models/SubmissionModel',
	'text!templates/submissionEditItemViewTemplate.html'
], function($, _, BaseListItemView, SubmissionModel, submissionEditItemViewTemplate){
	
	var SubmissionBlogItemView = BaseListItemView.extend({
		
		tagName: 'li',
		
		events: {
			'click .visibleCheckbox': 'setVisibility',
			'click .deleteButton': 'onDeleteButtonPress'
		},
		
		render: function() {
			var compiledTemplate = _.template( submissionEditItemViewTemplate, { submission : this.model.toJSON()} );
			this.$el.html( compiledTemplate );
			this.$('.visibleCheckbox').prop('checked', this.model.get('visible'));
			
			return this;
		},
		
		setVisibility: function() {
			if ($('.visibleCheckbox').prop("checked"))
				this.model.set({ visible: 0});
			else
				this.model.set({ visible: 1});
			this.model.save();
		},


		onDeleteButtonPress: function() {
			this.model.destroy();
		}
		
		
	});
	// Our module now returns our view
	return SubmissionBlogItemView;
	
});