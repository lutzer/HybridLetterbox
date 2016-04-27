define([
        'jquery',
        'underscore',
        'backbone',
        'values/constants',
        'models/SubmissionModel'
], function($, _, Backbone, CONSTANTS, SubmissionModel){

	var SubmissionCollection = Backbone.Collection.extend({

		url: CONSTANTS.SETTING_WEB_SERVICE_URL+"/submissions/",
		
		model: SubmissionModel,
		
		initialize: function(options) {
			if (typeof(options) !== 'undefined')
				this.limit = options.limit || 999999;
			this.isLoading = true;
		},

		stream: function(options) {
			// Cancel any potential previous stream
			this.unstream();
			
			var _update = _.bind(function() {
				options.data = $.param({ limit: this.limit});
				
				var self = this;
				options.success = function() {
					self.isLoading = false;
				};
				
				this.fetch(options);
				this._intervalFetch = window.setTimeout(_update, options.interval || 1000);
			}, this);

			_update();
		},

		unstream: function() {
			window.clearTimeout(this._intervalFetch);
			delete this._intervalFetch;
		},

		isStreaming: function() {
			return _.isUndefined(this._intervalFetch);   
		},
		
		setLimit: function(n) {
			this.limit = n;
			this.isLoading = true;
		}

	});

	return SubmissionCollection;
});

