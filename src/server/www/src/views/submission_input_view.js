/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-11 16:56:17
*/

import Marionette from 'marionette'
import _ from 'underscore'

import template from 'text!templates/submission_input_tmpl.html';

class SubmissionInputView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'submission-input' }

    /* methods */
    initialize(options) {
        //console.log(options)
    }
    
}

export default SubmissionInputView