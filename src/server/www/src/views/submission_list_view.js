/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-10 12:37:04
*/

import Marionette from 'marionette';
import _ from 'underscore';
import SubmissionView from 'views/submission_view';
import SubmissionCollection from 'models/submission_collection';

import template from 'text!templates/submission_list_tmpl.html';

class SubmissionListView extends Marionette.CompositeView {

	get template() { return _.template(template) }

	get className() { return 'page' }

	get childViewContainer() { return '#submission-list' }

	get childView() { return SubmissionView }

	initialize(options) {
		
		this.collection = new SubmissionCollection();
		this.collection.fetch();
	}
};

export default SubmissionListView