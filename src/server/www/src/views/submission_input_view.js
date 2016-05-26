'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-26 10:51:47
*/

import $ from 'jquery';
import 'iframeTransport';
import Marionette from 'marionette'
import Backbone from 'backbone';
import _ from 'underscore'
import SubmissionModel from 'models/submission_model';
import Config from 'config';

import template from 'text!templates/submission_input_tmpl.html';

class SubmissionInputView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'submission-input' }

    events() {
    	return {
            'focus #new-submission-text' : 'focus',
            'click #new-submission-text' : 'focus',
            'keypress #new-submission-text' : 'focus',
            'mouseleave .input-box' : 'unfocus',
            'click #submit-button' : 'onSubmitButtonClick'
    	}
    }

    /* methods */
    initialize(options) {
        //console.log(options)
    }

    focus() {
    	this.$el.addClass('expand');
    }

    unfocus() {
    	if (!this.$('#new-submission-text').val() && !this.$('#new-submission-author').val())
    		this.$el.removeClass('expand');
    }

    onMouseLeave() {
        if (!this.$('#new-submission-text').val() && !this.$('#new-submission-author').val())
            this.$el.removeClass('expand');
    }

    clear() {
        this.$('#new-submission-text').val('');
        this.$('#new-submission-author').val('');
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

            this.clear();
            this.unfocus();
            }
        });
    }
    
}

export default SubmissionInputView