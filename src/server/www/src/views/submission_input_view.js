/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-12 16:14:50
*/

import Marionette from 'marionette'
import Backbone from 'backbone';
import _ from 'underscore'
import SubmissionModel from 'models/submission_model';

import template from 'text!templates/submission_input_tmpl.html';

class SubmissionInputView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'submission-input' }

    events() {
    	return {
            'focus #new-submission-text' : 'onTextareaFocus',
            'blur #new-submission-text' : 'onTextareaBlur',
            'click #submit-button' : 'onSubmitButtonClick'
    	}
    }

    /* methods */
    initialize(options) {
        //console.log(options)
    }

    onTextareaFocus() {
    	this.$el.addClass('expand');
    }

    onTextareaBlur() {
    	if (!this.$('#new-submission-text').val())
    		this.$el.removeClass('expand');
    }

    onSubmitButtonClick() {

    	var submission = new SubmissionModel({
    		text : this.$('#new-submission-text').val(),
    		author : this.$('#new-submission-author').val()
    	})
    	submission.save(null,{
            error: (model, res) => {
                Backbone.trigger('error','http',res.responseJSON);
            }
        });

        this.render();
        this.$el.removeClass('expand');
    }
    
}

export default SubmissionInputView