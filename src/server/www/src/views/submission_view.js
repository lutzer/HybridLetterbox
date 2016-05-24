'use strict';

/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-10 15:17:01
*/

import Backbone from 'backbone';
import Marionette from 'marionette';
import _ from 'underscore'
import Moment from 'moment';
import Config from 'config';
import SubmissionModel from 'models/submission_model';
import CommentModel from 'models/comment_model';

import template from 'text!templates/submission_tmpl.html';

class SubmissionView extends Marionette.ItemView {

	/* properties */
   	get template() { return _.template(template) }

    get className() { return 'singleview' }

    get templateHelpers() {
		return {
			filesUrl : Config.files_url + this.model.get('_id') + '/',
            isAdmin : false,
           	formatDate: function(date) {
           		return Moment(date).format('LLL');
           	},
           	fromNow: function(date) {
           		return Moment(date).fromNow(); 
           	}
		}
    }


    /* methods */
    initialize(options) {
        this.model = new SubmissionModel({ _id: options.id });
        this.model.fetch();
        
        //listen to model events
        this.listenTo(this.model,'change',this.render);

        //listen to socket events
        this.listenTo(Backbone,'submission:changed', this.onSubmissionChanged);
    }

    events() {
    	return {
    		'click #new-comment-button' : 'onNewCommentButtonClick',
    		'click #delete-comment-button' : 'onDeleteCommentButtonClick',
    	}
    }

  	onNewCommentButtonClick() {

    	var comment = new CommentModel({
    		text : this.$('#new-comment-text').val(),
    		author : this.$('#new-comment-author').val(),
    		submission: this.model.get('_id')
    	})
    	comment.save(null,{
            error: (model, res) => {
                Backbone.trigger('error','http',res.responseJSON);
            }
        });
    }

    onDeleteCommentButtonClick(event) {
    	var commentId = $(event.target).attr('data-id')
    	var comment = new CommentModel({
    		_id : commentId
    	});
    	comment.destroy();
    }

    onSubmissionChanged(data) {
    	if (data.model._id == this.model.get('_id'))
    		this.model.fetch();
    }
    
}

export default SubmissionView