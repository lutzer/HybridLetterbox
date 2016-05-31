'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-31 14:59:37
*/

import Backbone from 'backbone';
import Marionette from 'marionette';
import _ from 'underscore';
import SubmissionCollection from 'models/submission_collection';
import AdminItemView from 'views/admin_item_view';
import template from 'text!templates/admin_tmpl.html';

class AdminView extends Marionette.CompositeView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'adminview' }

    get childViewContainer() { return '#submission-list' }

    get childView() { return AdminItemView }

    /* methods */
    initialize(options) {

    	this.collection = new SubmissionCollection();
    	this.collection.getFirstPage();

        this.listenTo(Backbone,'submission:changed', this.onSubmissionChanged);
    }

    // update model on data change
    onSubmissionChanged(data) {
        var model = this.collection.get(data.model._id);
        if (model)
            model.fetch();
    }
    
}

export default AdminView