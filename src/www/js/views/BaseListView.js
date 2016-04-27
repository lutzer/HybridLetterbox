define([
	'jquery',
	'underscore',
	'views/BaseView'
], function($, _, BaseView){
	
	var BaseListView = BaseView.extend({
		
		initialize: function() {
			var self = this;
			
			//listen to the collections change events
			this.listenTo(this.collection, 'reset', this.afterReset);
			this.listenTo(this.collection, 'add', this.addOne);
			this.listenTo(this.collection, 'remove', this.removeOne);
			
			BaseView.prototype.initialize.call(this);
		},
		
		afterReset: function(attributes,options) {
			var self = this;
			
			// remove previously shown models
			_.each(options.previousModels, function(model) {
				self.removeOne(model);
			});
			
			this.addAll();
		},
		
		addAll: function() {
			var self = this
			this.collection.each( function(model) {
				this.addOne(model);
			});
		},
		
		addOne: function() {
			throw "BaseListView extended Class must implement addOne Method";
		},
		
		removeOne: function(model) {
			//only remove model from view, not from server
			model.trigger('destroy', model);
		}
	});
	// Our module now returns our view
	return BaseListView;
	
});