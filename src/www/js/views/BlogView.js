define([
	'jquery',
	'underscore',
	'views/BaseListView',
	'values/constants',
	'models/SubmissionCollection',
	'views/SubmissionBlogItemView',
	'text!templates/blogViewTemplate.html'
], function($, _, BaseListView, CONSTANTS, SubmissionCollection, SubmissionBlogItemView, blogViewTemplate){
	
	var BlogView = BaseListView.extend({
		    
		initialize: function() {
			
			this.collection = new SubmissionCollection({limit : CONSTANTS.BLOG_SUBMISSIONS_PER_PAGE});
			this.collection.fetch({reset: true, data: $.param({ limit: this.collection.limit})});
			
			this.collection.stream({intervall : 1000});
			
			// bind scroll event to load more submissions
			var self = this;
			$(window).on('scroll',_.bind(self.checkScroll, self));
			
			BaseListView.prototype.initialize.call(this);
		},
		
		onClose: function() {
			$(window).off("scroll", this.checkScroll);
		},
		
		render: function(){
			
			var compiledTemplate = _.template( blogViewTemplate, {} );
			this.$el.html( compiledTemplate );
			return this;
		},
		
		addOne: function(model) {
			
			var view = new SubmissionBlogItemView({model: model});
			
			//append if old model
			if (model.get('isNew') == 0) {	
				this.append(view,".submissionList");
			//prepend if newly created model
			} else {
				var view = new SubmissionBlogItemView({model: model});
				this.prepend(view,".submissionList");
				view.hide();
				$(window).scrollTop(0);
				//$("html, body").animate({ scrollTop: "0px" });
				view.slideDown();
			}
		},
		
		addAll: function() {
			// add new model views
			col = this.collection;
			
			var subviews = [];
			col.each( function(model) {
				subviews.push(new SubmissionBlogItemView({model: model}));
			});
			this.appendMany(subviews,".submissionList");
		},
		
		scrollTop: function() {
			$('html, body').animate({scrollTop:0});
		},
		
		checkScroll: function(self) {
			var bottomPos = $(window).height() + $(window).scrollTop();
			var triggerPos =  $(document).height() - 800;
			if( !this.collection.isLoading && bottomPos > triggerPos ) {
				this.collection.setLimit(this.collection.limit + CONSTANTS.BLOG_SUBMISSIONS_PER_PAGE);
				console.log(this.collection.limit);
			} else if ( $(window).scrollTop() < 100) {
				this.collection.setLimit(CONSTANTS.BLOG_SUBMISSIONS_PER_PAGE);
			}
				
		}
		
	});
	// Our module now returns our view
	return BlogView;
	
});