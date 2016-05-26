/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-24 12:12:52
*/

import Marionette from 'marionette'
import Backbone from 'backbone';
import _ from 'underscore'
import SubmissionModel from 'models/submission_model';
import iframeTransport from 'iframeTransport';
import Config from 'config';

import template from 'text!templates/submission_input_tmpl.html';

class SubmissionInputView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'submission-input' }

    events() {
    	return {
            'focus #new-submission-text' : 'onTextareaFocus',
            'click #new-submission-text' : 'onTextareaFocus',
            'mouseleave .input-box' : 'onMouseLeave',
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
    	if (!this.$('#new-submission-text').val() && !this.$('#new-submission-author').val())
    		this.$el.removeClass('expand');
    }

    onMouseLeave() {
        if (!this.$('#new-submission-text').val() && !this.$('#new-submission-author').val())
            this.$el.removeClass('expand');
    }

    onSubmitButtonClick() {

        var handleError = function(model, res) {
            console.log(res);
            Backbone.trigger('error','http',res.responseJSON);
        };

        // upload file
        var uploadFile = function(file, model) {

            $.ajax({
                method: 'POST',
                url: Config.web_service_url+'file/attach/'+model.get('_id'),
                iframe: true,
                file: file,
                error: handleError
            });
        };

    	var submission = new SubmissionModel({
    		text : this.$('#new-submission-text').val(),
    		author : this.$('#new-submission-author').val()
    	})
    	submission.save(null,{
            error: handleError,
            success: (model, res) => {
                if (this.$('#new-submission-file').val())
                    uploadFile(this.$('#new-submission-file'),model);

            this.render();
            this.$el.removeClass('expand');
            }
        });

    }
    
}

export default SubmissionInputView