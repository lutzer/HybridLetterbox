/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-10 17:30:03
*/

import Marionette from 'marionette';
import _ from 'underscore';
import $ from 'jquery';
import SubmissionItemView from 'views/submission_item_view';
import SubmissionCollection from 'models/submission_collection';

import template from 'text!templates/submission_list_tmpl.html';

class SubmissionListView extends Marionette.CompositeView {

	/* properties */
	get template() { return _.template(template) }

	get className() { return 'list-view' }

	get childViewContainer() { return '#submission-list' }

	get childView() { return SubmissionItemView }

	/* methods */
	initialize(options) {

		var fetchParams = {};

		if (options.tag != null)
			fetchParams.tag = options.tag
		
		this.collection = new SubmissionCollection();
		this.collection.fetch({ data: $.param(fetchParams) });

        this.listenTo(Backbone,'submission:changed', this.onDataChanged);
	}

	// update model on data change
    onDataChanged(data) {
    	var model = this.collection.get(data.model._id);
    	if (model)
    		model.fetch();
    }
};

export default SubmissionListView