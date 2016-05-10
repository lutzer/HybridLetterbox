/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-10 12:37:07
*/

import Marionette from 'marionette';
import _ from 'underscore';

import template from 'text!templates/submission_tmpl.html';

class SubmissionView extends Marionette.ItemView {

    get template() { return _.template(template) }

    get className() { return 'item' }

    initialize(options) {
        console.log(this.model);
    }
}

export default SubmissionView;