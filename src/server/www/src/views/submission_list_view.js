'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-26 13:32:46
*/

import Marionette from 'marionette';
import _ from 'underscore';
import $ from 'jquery';
import Masonry from 'masonry';
import SubmissionItemView from 'views/submission_item_view';
import SubmissionCollection from 'models/submission_collection';
import SubmissionModel from 'models/submission_model';

import template from 'text!templates/submission_list_tmpl.html';

class SubmissionListView extends Marionette.CompositeView {

	/* properties */
	get template() { return _.template(template) }

	get className() { return 'composite-view' }

	get childViewContainer() { return '#submission-list' }

	get childView() { return SubmissionItemView }

	childEvents() {
    	return {
    		'show-details' : 'onChildShowDetails',
    	}
    }

	/* methods */
	initialize(options) {

		var fetchParams = {};

		if (options.tag != null)
			fetchParams.tag = options.tag
		
		this.collection = new SubmissionCollection();
		this.collection.fetch({ data: $.param(fetchParams) });

        this.listenTo(Backbone,'submission:changed', this.onSubmissionChanged);
        this.listenTo(Backbone,'submission:new', this.onSubmissionAdded);
        this.listenTo(Backbone,'submission:removed', this.onSubmissionRemoved);
	}

    onShow() {
        /*new Masonry('#submission-list', {
            itemSelector : '.item-view',
            percentPosition: true
        })*/
    }

	// update model on data change
    onSubmissionChanged(data) {
    	var model = this.collection.get(data.model._id);
    	if (model)
    		model.fetch();
    }

    onSubmissionAdded(data) {
        //console.log(data);
    	var submission = new SubmissionModel(data.model);
    	submission.fetch();
    	 // add to front of collection
		this.collection.add(submission, { at: 0});
    }

    onSubmissionRemoved(data) {
        //console.log(data);
        this.collection.remove(data);
    }

    onChildShowDetails() {
    	console.log(this);
    }


};

export default SubmissionListView