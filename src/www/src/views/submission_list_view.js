/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-04 11:40:46
*/

import Marionette from 'marionette'
import _ from 'underscore'
import SubmissionView from 'views/submission_view'
import SubmissionCollection from 'models/submission_collection'

class SubmissionListView extends Marionette.CompositeView {

	get template() { return _.template('<h1>Submissions</h2><div id="submission-list"></div') }

	get className() { return 'page' }

	get chiildViewContainer() { return '#submission-list' }

	get childView() { return SubmissionView }

	initialize(options) {
		
		this.collection = new SubmissionCollection();

		this.collection.fetch();
	}
};

export default SubmissionListView